from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base import Base

class InternalTransfer(Base):
    """Stock movement between warehouses or locations"""
    __tablename__ = "internal_transfers"

    id = Column(Integer, primary_key=True, index=True)
    transfer_number = Column(String(100), unique=True, index=True, nullable=False) # e.g. TR-2024-0001
    status = Column(String(50), default="draft") # draft, done, cancelled
    
    source_warehouse_id = Column(Integer, ForeignKey("warehouses.id"), nullable=False)
    source_location_id = Column(Integer, ForeignKey("locations.id"), nullable=True)
    
    destination_warehouse_id = Column(Integer, ForeignKey("warehouses.id"), nullable=False)
    destination_location_id = Column(Integer, ForeignKey("locations.id"), nullable=True)
    
    scheduled_date = Column(DateTime(timezone=True), nullable=True)
    
    created_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    confirmed_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    confirmed_at = Column(DateTime(timezone=True), nullable=True)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # relationships
    lines = relationship("TransferLine", back_populates="transfer", cascade="all, delete-orphan")
    source_warehouse = relationship("Warehouse", foreign_keys=[source_warehouse_id])
    destination_warehouse = relationship("Warehouse", foreign_keys=[destination_warehouse_id])


class TransferLine(Base):
    __tablename__ = "transfer_lines"

    id = Column(Integer, primary_key=True, index=True)
    transfer_id = Column(Integer, ForeignKey("internal_transfers.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    
    qty = Column(Float, default=0.0, nullable=False)

    # relationships
    transfer = relationship("InternalTransfer", back_populates="lines")
    product = relationship("Product")
