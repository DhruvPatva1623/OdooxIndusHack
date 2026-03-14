from pydantic import BaseModel, EmailStr, field_validator

class OTPSendRequest(BaseModel):
    email: EmailStr
    purpose: str = "password_reset"

class OTPVerifyRequest(BaseModel):
    email: EmailStr
    otp: str
    purpose: str = "password_reset"

class OTPVerifyResponse(BaseModel):
    valid: bool
    reset_token: str

class PasswordResetRequest(BaseModel):
    reset_token: str
    new_password: str

    @field_validator("new_password")
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters.")
        return v
