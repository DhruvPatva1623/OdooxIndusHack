from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.core import security
from app.db.session import get_db
from app.models.user import User
from app.schemas.auth import PasswordResetRequest
from app.core.dependencies import get_current_user

router = APIRouter(prefix="/auth/password", tags=["Password"])


@router.post("/forgot")
def forgot_password(email: str, db: Session = Depends(get_db)):
    """Alias: triggers OTP send for password_reset purpose."""
    # Handled by /auth/otp/send with purpose="password_reset"
    return {"message": "If this email is registered, reset instructions have been sent."}


@router.post("/reset")
def reset_password(payload: PasswordResetRequest, db: Session = Depends(get_db)):
    """
    Reset password using scoped reset_token (obtained after OTP verification).
    Invalidates all active sessions by bumping token_version.
    """
    token_payload = security.decode_token(payload.reset_token)

    if not token_payload or token_payload.get("scope") != "password_reset":
        raise HTTPException(401, "Invalid or expired reset token.")

    user = db.query(User).filter(User.email == token_payload["sub"]).first()
    if not user:
        raise HTTPException(404, "User not found.")

    user.password_hash = security.hash_password(payload.new_password)
    user.token_version += 1   # invalidates all existing sessions
    db.commit()

    return {"message": "Password reset successfully. All active sessions have been signed out."}


@router.put("/change")
def change_password(
    old_password: str,
    new_password: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Change password for authenticated user (requires old password confirmation)."""
    if not security.verify_password(old_password, current_user.password_hash):
        raise HTTPException(400, "Current password is incorrect.")
    current_user.password_hash = security.hash_password(new_password)
    current_user.token_version += 1
    db.commit()
    return {"message": "Password changed. Please log in again."}
