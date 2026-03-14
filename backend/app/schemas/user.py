from datetime import datetime
from pydantic import BaseModel, EmailStr, field_validator
import re

class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str

    @field_validator("password")
    def password_length(cls, v):
        if len(v) < 6:
            raise ValueError("Password must be at least 6 characters.")
        return v

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserUpdate(BaseModel):
    full_name: str
    email: EmailStr

class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    role: str
    is_active: bool
    token_version: int
    last_login_at: datetime | None = None
    created_at: datetime | None = None
    updated_at: datetime | None = None

    class Config:
        orm_mode = True

class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
