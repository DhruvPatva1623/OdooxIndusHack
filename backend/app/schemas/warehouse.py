from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class LocationBase(BaseModel):
    name: str
    zone: Optional[str] = None
    max_capacity_m3: float = 0.0
    max_weight_kg: float = 0.0

class LocationCreate(LocationBase):
    warehouse_id: int

class LocationUpdate(LocationBase):
    name: Optional[str] = None

class LocationResponse(LocationBase):
    id: int
    warehouse_id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True

class WarehouseBase(BaseModel):
    name: str
    code: str
    address: Optional[str] = None
    total_capacity_m3: float = 0.0

class WarehouseCreate(WarehouseBase):
    pass

class WarehouseUpdate(WarehouseBase):
    name: Optional[str] = None
    code: Optional[str] = None

class WarehouseResponse(WarehouseBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True

class WarehouseWithLocationsResponse(WarehouseResponse):
    locations: list[LocationResponse] = []
