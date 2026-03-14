import secrets
import hashlib
import json
from datetime import datetime
from typing import Optional
import redis as redis_lib
from app.core.config import settings

redis_client = redis_lib.from_url(settings.REDIS_URL, decode_responses=True)


# ─── Generation ───────────────────────────────────────────────────────────────

def generate_otp(length: Optional[int] = None) -> str:
    """
    Generate a cryptographically secure numeric OTP.
    Uses secrets.randbelow(10) for uniform distribution across 0–9.
    """
    length = length or settings.OTP_LENGTH
    return ''.join(str(secrets.randbelow(10)) for _ in range(length))


# ─── Hashing ──────────────────────────────────────────────────────────────────

def hash_otp(otp: str) -> str:
    """
    Hash OTP with SHA-256 before storing in Redis.
    Raw OTP is NEVER persisted — only the hash.
    """
    return hashlib.sha256(otp.encode('utf-8')).hexdigest()


# ─── Storage ──────────────────────────────────────────────────────────────────

def _make_key(email: str, purpose: str) -> str:
    return f"otp:{purpose}:{email}"


def store_otp(email: str, otp: str, purpose: str = "password_reset") -> None:
    """
    Hash the OTP and store it in Redis with a TTL.

    Redis key:   otp:{purpose}:{email}
    Redis value: JSON { hashed_otp, attempts, created_at }
    TTL:         OTP_EXPIRE_SECONDS (default 600 = 10 minutes)
    """
    key = _make_key(email, purpose)
    data = {"hashed_otp": hash_otp(otp), "attempts": 0, "created_at": datetime.utcnow().isoformat()}
    redis_client.setex(key, settings.OTP_EXPIRE_SECONDS, json.dumps(data))


# ─── Verification ─────────────────────────────────────────────────────────────

def verify_otp(email: str, otp: str, purpose: str = "password_reset") -> dict:
    """
    Verify a submitted OTP against the stored hash.

    Returns:
        { valid: True, reason: "ok" }                          on success
        { valid: False, reason: "expired" }                    when Redis key gone
        { valid: False, reason: "invalid", attempts_remaining} on wrong code
        { valid: False, reason: "max_attempts" }               after N failures
    """
    key = _make_key(email, purpose)
    raw = redis_client.get(key)

    if not raw:
        return {"valid": False, "reason": "expired"}

    data = json.loads(raw)

    # Block after max attempts
    if data["attempts"] >= settings.OTP_MAX_ATTEMPTS:
        redis_client.delete(key)
        return {"valid": False, "reason": "max_attempts"}

    # Wrong code → increment counter, re-save with remaining TTL
    if data["hashed_otp"] != hash_otp(otp):
        data["attempts"] += 1
        ttl = redis_client.ttl(key)
        if ttl > 0:
            redis_client.setex(key, ttl, json.dumps(data))
        remaining = settings.OTP_MAX_ATTEMPTS - data["attempts"]
        return {"valid": False, "reason": "invalid", "attempts_remaining": remaining}

    # Correct → delete immediately (one-time use)
    redis_client.delete(key)
    return {"valid": True, "reason": "ok"}


# ─── Helpers ──────────────────────────────────────────────────────────────────

def invalidate_otp(email: str, purpose: str = "password_reset") -> None:
    """Manually delete an OTP (e.g. on resend or user cancellation)."""
    redis_client.delete(_make_key(email, purpose))


def get_otp_ttl(email: str, purpose: str = "password_reset") -> int:
    """
    Return seconds remaining before OTP expires.
    Returns -1 if key not found (expired or never sent).
    """
    ttl = redis_client.ttl(_make_key(email, purpose))
    return ttl if ttl > 0 else -1


def can_resend_otp(email: str, purpose: str = "password_reset") -> bool:
    """
    True if enough time has passed to allow a resend.
    Resend blocked if TTL > (OTP_EXPIRE_SECONDS - OTP_RATE_LIMIT_SECONDS).
    """
    ttl = get_otp_ttl(email, purpose)
    if ttl == -1:
        return True
    threshold = settings.OTP_EXPIRE_SECONDS - settings.OTP_RATE_LIMIT_SECONDS
    return ttl <= threshold
