import secrets
import hashlib
import json
import time
from datetime import datetime
from typing import Optional
from app.core.config import settings

# In-memory store replacing Redis for development
otp_store = {}


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
    key = _make_key(email, purpose)
    # Store expiration time (now + TTL)
    expire_at = time.time() + settings.OTP_EXPIRE_SECONDS
    data = {"hashed_otp": hash_otp(otp), "attempts": 0, "created_at": datetime.utcnow().isoformat(), "expire_at": expire_at}
    otp_store[key] = data


# ─── Verification ─────────────────────────────────────────────────────────────

def verify_otp(email: str, otp: str, purpose: str = "password_reset") -> dict:
    key = _make_key(email, purpose)
    data = otp_store.get(key)

    if not data or time.time() > data['expire_at']:
        if key in otp_store:
            del otp_store[key]
        return {"valid": False, "reason": "expired"}

    # Block after max attempts
    if data["attempts"] >= settings.OTP_MAX_ATTEMPTS:
        del otp_store[key]
        return {"valid": False, "reason": "max_attempts"}

    # Wrong code → increment counter
    if data["hashed_otp"] != hash_otp(otp):
        data["attempts"] += 1
        remaining = settings.OTP_MAX_ATTEMPTS - data["attempts"]
        return {"valid": False, "reason": "invalid", "attempts_remaining": remaining}

    # Correct → delete immediately (one-time use)
    del otp_store[key]
    return {"valid": True, "reason": "ok"}


# ─── Helpers ──────────────────────────────────────────────────────────────────

def invalidate_otp(email: str, purpose: str = "password_reset") -> None:
    key = _make_key(email, purpose)
    if key in otp_store:
        del otp_store[key]


def get_otp_ttl(email: str, purpose: str = "password_reset") -> int:
    key = _make_key(email, purpose)
    if key not in otp_store:
        return -1
    ttl = int(otp_store[key]['expire_at'] - time.time())
    if ttl <= 0:
        del otp_store[key]
        return -1
    return ttl


def can_resend_otp(email: str, purpose: str = "password_reset") -> bool:
    ttl = get_otp_ttl(email, purpose)
    if ttl == -1:
        return True
    threshold = settings.OTP_EXPIRE_SECONDS - settings.OTP_RATE_LIMIT_SECONDS
    return ttl <= threshold
