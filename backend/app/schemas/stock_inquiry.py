from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class StockBase(BaseModel):
    product_id: int
    warehouse_id: int
    location_id: Optional[int] = None
    qty_on_hand: float

class StockResponse(StockBase):
    id: int
    updated_at: datetime

    class Config:
        from_attributes = True

class LedgerResponse(BaseModel):
    id: int
    product_id: int
    warehouse_id: int
    location_id: Optional[int] = None
    operation_type: str
    qty_change: float
    qty_before: float
    qty_after: float
    reference_id: Optional[int] = None
    reference_type: Optional[str] = None
    performed_by: int
    notes: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

class AlertResponse(BaseModel):
    id: int
    product_id: int
    warehouse_id: int
    alert_type: str
    message: str
    is_resolved: bool
    resolved_by: Optional[int] = None
    resolved_at: Optional[datetime] = None
    created_at: datetime

    class Config:
        from_attributes = True
