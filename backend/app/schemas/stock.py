from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.schemas.product import ProductResponse
from app.schemas.warehouse import WarehouseResponse

# --- Receipts ---

class ReceiptLineBase(BaseModel):
    product_id: int
    qty_ordered: float

class ReceiptLineCreate(ReceiptLineBase):
    pass

class ReceiptLineResponse(ReceiptLineBase):
    id: int
    qty_received: float

    class Config:
        from_attributes = True

class ReceiptBase(BaseModel):
    destination_warehouse_id: int
    destination_location_id: Optional[int] = None
    supplier_name: Optional[str] = None
    reference_doc: Optional[str] = None

class ReceiptCreate(ReceiptBase):
    lines: list[ReceiptLineCreate]

class ReceiptResponse(ReceiptBase):
    id: int
    receipt_number: str
    status: str
    created_by: int
    validated_by: Optional[int]
    created_at: datetime
    validated_at: Optional[datetime]
    lines: list[ReceiptLineResponse]

    class Config:
        from_attributes = True

# --- Deliveries ---

class DeliveryLineBase(BaseModel):
    product_id: int
    qty_ordered: float

class DeliveryLineCreate(DeliveryLineBase):
    pass

class DeliveryLineResponse(DeliveryLineBase):
    id: int

    class Config:
        from_attributes = True

class DeliveryBase(BaseModel):
    source_warehouse_id: int
    customer_name: Optional[str] = None
    shipping_address: Optional[str] = None
    reference_doc: Optional[str] = None

class DeliveryCreate(DeliveryBase):
    lines: list[DeliveryLineCreate]

class DeliveryResponse(DeliveryBase):
    id: int
    delivery_number: str
    status: str
    created_by: int
    validated_by: Optional[int]
    created_at: datetime
    validated_at: Optional[datetime]
    lines: list[DeliveryLineResponse]

    class Config:
        from_attributes = True

# --- Transfers ---

class TransferLineBase(BaseModel):
    product_id: int
    qty: float

class TransferLineCreate(TransferLineBase):
    pass

class TransferLineResponse(TransferLineBase):
    id: int

    class Config:
        from_attributes = True

class TransferBase(BaseModel):
    source_warehouse_id: int
    source_location_id: Optional[int] = None
    destination_warehouse_id: int
    destination_location_id: Optional[int] = None
    scheduled_date: Optional[datetime] = None

class TransferCreate(TransferBase):
    lines: list[TransferLineCreate]

class TransferResponse(TransferBase):
    id: int
    transfer_number: str
    status: str
    created_by: int
    confirmed_by: Optional[int]
    created_at: datetime
    confirmed_at: Optional[datetime]
    lines: list[TransferLineResponse]

    class Config:
        from_attributes = True
