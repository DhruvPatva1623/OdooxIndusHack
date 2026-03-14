from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base import Base

class StockAdjustment(Base):
    """Manual adjustments to stock levels (e.g. damages, corrections)"""
    __tablename__ = "stock_adjustments"

    id = Column(Integer, primary_key=True, index=True)
    adjustment_number = Column(String(100), unique=True, index=True, nullable=False) # e.g. ADJ-2024-0001
    status = Column(String(50), default="draft") # draft, applied, cancelled
    
    warehouse_id = Column(Integer, ForeignKey("warehouses.id"), nullable=False)
    location_id = Column(Integer, ForeignKey("locations.id"), nullable=True)
    
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    
    qty_change = Column(Float, nullable=False) # positive (add) or negative (remove)
    reason = Column(String(500), nullable=True) # e.g. "Damaged goods", "Found extra stock"
    
    created_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    applied_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    applied_at = Column(DateTime(timezone=True), nullable=True)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # relationships
    warehouse = relationship("Warehouse")
    product = relationship("Product")
