from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class ProductBase(BaseModel):
    sku: str
    name: str
    description: Optional[str] = None
    category: Optional[str] = None
    unit_of_measure: str = "pcs"
    unit_cost: float = 0.0
    unit_price: float = 0.0
    reorder_min: float = 10.0
    reorder_qty: float = 50.0
    weight_kg: float = 0.0
    volume_m3: float = 0.0

class ProductCreate(ProductBase):
    pass

class ProductUpdate(ProductBase):
    sku: Optional[str] = None
    name: Optional[str] = None

class ProductResponse(ProductBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True
