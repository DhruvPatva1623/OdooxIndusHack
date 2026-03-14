from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from app.core.config import settings
from app.api.v1.router import api_router
from app.models import location as _location
from app.models import warehouse as _warehouse
from app.models import user as _user
from fastapi import Request
from fastapi.responses import JSONResponse

class InvalidStateError(Exception):
    pass

async def global_exception_handler(request: Request, exc: Exception):
    import traceback
    err = ''.join(traceback.format_exception(type(exc), exc, exc.__traceback__))
    with open('error.log', 'a', encoding='utf-8') as f:
        f.write(err + '\n' + '='*80 + '\n')
    return JSONResponse(
        status_code=500,
        content={"error": {"code": "INTERNAL_ERROR", "message": "An unexpected error occurred."}}
    )

limiter = Limiter(key_func=get_remote_address)

app = FastAPI(
    title="CoreInventory API",
    version="1.0.0",
    description="Warehouse Management System API",
    docs_url="/api/docs" if settings.DEBUG else None,
    redoc_url="/api/redoc" if settings.DEBUG else None,
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_exception_handler(Exception, global_exception_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if settings.ALLOWED_ORIGINS == "*" else settings.ALLOWED_ORIGINS.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(GZipMiddleware, minimum_size=1000)

app.include_router(api_router, prefix="/api/v1")
