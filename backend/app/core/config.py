from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "CoreInventory"
    APP_ENV: str = "development"
    DEBUG: bool = True
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    DATABASE_URL: str
    REDIS_URL: str = "redis://localhost:6379/0"

    OTP_EXPIRE_SECONDS: int = 600
    OTP_LENGTH: int = 6
    OTP_MAX_ATTEMPTS: int = 5
    OTP_RATE_LIMIT_SECONDS: int = 60

    SMTP_HOST: str
    SMTP_PORT: int = 587
    SMTP_USER: str
    SMTP_PASSWORD: str
    EMAIL_FROM: str

    FRONTEND_URL: str
    ALLOWED_ORIGINS: str

    class Config:
        env_file = ".env"

settings = Settings()
