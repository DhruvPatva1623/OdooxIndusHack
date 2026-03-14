from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.core import otp as otp_core, security
from app.core.email import send_otp_email
from app.core.config import settings
from app.db.session import get_db
from app.models.user import User
from app.schemas.auth import OTPSendRequest, OTPVerifyRequest, OTPVerifyResponse
from datetime import timedelta

router = APIRouter(prefix="/auth/otp", tags=["OTP"])


@router.post("/send")
def send_otp(payload: OTPSendRequest, db: Session = Depends(get_db)):
    """
    Generate OTP, hash it, store in Redis, send via email.
    Security: Always returns 200 even if email not found (prevents enumeration).
    Rate limit: 1 send per OTP_RATE_LIMIT_SECONDS.
    """
    user = db.query(User).filter(User.email == payload.email.lower()).first()

    if user:
        # Rate limiting check
        if not otp_core.can_resend_otp(payload.email, payload.purpose):
            ttl = otp_core.get_otp_ttl(payload.email, payload.purpose)
            wait = ttl - (settings.OTP_EXPIRE_SECONDS - settings.OTP_RATE_LIMIT_SECONDS)
            raise HTTPException(429, f"Please wait {wait} seconds before requesting a new code.")

        code = otp_core.generate_otp()
        otp_core.store_otp(payload.email, code, payload.purpose)
        send_otp_email(payload.email, code, payload.purpose)

    # Always return same message (security: no email enumeration)
    return {
        "message": "If this email is registered, an OTP has been sent.",
        "expires_in": settings.OTP_EXPIRE_SECONDS
    }


@router.post("/verify", response_model=OTPVerifyResponse)
def verify_otp(payload: OTPVerifyRequest):
    """
    Verify OTP. On success, returns a short-lived reset_token scoped for password reset.
    On failure, returns reason and attempts_remaining.
    """
    result = otp_core.verify_otp(payload.email, payload.otp, payload.purpose)

    if not result["valid"]:
        status_map = {
            "expired": (400, "OTP has expired. Please request a new one."),
            "max_attempts": (429, "Too many incorrect attempts. Please request a new OTP."),
            "invalid": (400, f"Incorrect OTP. {result.get('attempts_remaining', 0)} attempt(s) remaining."),
        }
        status_code, message = status_map.get(result["reason"], (400, "OTP verification failed."))
        raise HTTPException(status_code=status_code, detail=message)

    # Create a scoped token valid for password reset only
    reset_token = security.create_access_token(
        {"sub": payload.email, "scope": "password_reset"},
        expires_delta=timedelta(minutes=15)
    )
    return {"valid": True, "reset_token": reset_token}


@router.post("/resend")
def resend_otp(payload: OTPSendRequest, db: Session = Depends(get_db)):
    """Invalidate current OTP and issue a new one."""
    otp_core.invalidate_otp(payload.email, payload.purpose)
    return send_otp(payload, db)
