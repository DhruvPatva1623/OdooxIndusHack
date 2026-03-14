from fastapi import HTTPException, Request
from fastapi.responses import JSONResponse

class InvalidStateError(Exception):
    pass

async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"error": {"code": "INTERNAL_ERROR", "message": "An unexpected error occurred."}}
    )
