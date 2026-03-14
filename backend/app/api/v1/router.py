from fastapi import APIRouter
from app.api.v1.auth import routes as auth_routes
from app.api.v1.auth import otp_routes
from app.api.v1.auth import password_routes
from app.api.v1.products import routes as product_routes
from app.api.v1.warehouses import routes as warehouse_routes
from app.api.v1.receipts import routes as receipt_routes
from app.api.v1.deliveries import routes as delivery_routes
from app.api.v1.transfers import routes as transfer_routes
from app.api.v1.stock import routes as stock_routes

api_router = APIRouter()

api_router.include_router(auth_routes.router)
api_router.include_router(otp_routes.router)
api_router.include_router(password_routes.router)
api_router.include_router(product_routes.router)
api_router.include_router(warehouse_routes.router)
api_router.include_router(receipt_routes.router)
api_router.include_router(delivery_routes.router)
api_router.include_router(transfer_routes.router)
api_router.include_router(stock_routes.router)
