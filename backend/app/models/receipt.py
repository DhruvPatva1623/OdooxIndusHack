from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base import Base

class Receipt(Base):
    """Incoming stock from suppliers"""
    __tablename__ = "receipts"

    id = Column(Integer, primary_key=True, index=True)
    receipt_number = Column(String(100), unique=True, index=True, nullable=False) # e.g. RCP-2024-0001
    status = Column(String(50), default="draft") # draft, ready, done, cancelled
    
    destination_warehouse_id = Column(Integer, ForeignKey("warehouses.id"), nullable=False)
    destination_location_id = Column(Integer, ForeignKey("locations.id"), nullable=True)
    
    supplier_name = Column(String(255), nullable=True)
    reference_doc = Column(String(255), nullable=True) # e.g. PO number
    
    created_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    validated_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    validated_at = Column(DateTime(timezone=True), nullable=True)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # relationships
    lines = relationship("ReceiptLine", back_populates="receipt", cascade="all, delete-orphan")
    warehouse = relationship("Warehouse", foreign_keys=[destination_warehouse_id])


class ReceiptLine(Base):
    __tablename__ = "receipt_lines"

    id = Column(Integer, primary_key=True, index=True)
    receipt_id = Column(Integer, ForeignKey("receipts.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    
    qty_ordered = Column(Float, default=0.0)
    qty_received = Column(Float, default=0.0)

    # relationships
    receipt = relationship("Receipt", back_populates="lines")
    product = relationship("Product")
