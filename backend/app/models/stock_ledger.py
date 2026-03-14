from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base import Base

class StockInventory(Base):
    """Current stock levels per product/warehouse/location"""
    __tablename__ = "stock_inventory"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False, index=True)
    warehouse_id = Column(Integer, ForeignKey("warehouses.id"), nullable=False, index=True)
    location_id = Column(Integer, ForeignKey("locations.id"), nullable=True, index=True)
    
    qty_on_hand = Column(Float, default=0.0, nullable=False)
    
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), server_default=func.now())

    # relationships
    product = relationship("Product")
    warehouse = relationship("Warehouse")


class StockLedger(Base):
    """Immutable log of all stock movements"""
    __tablename__ = "stock_ledger"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False, index=True)
    warehouse_id = Column(Integer, ForeignKey("warehouses.id"), nullable=False, index=True)
    location_id = Column(Integer, ForeignKey("locations.id"), nullable=True, index=True)
    
    operation_type = Column(String(50), nullable=False) # receipt, delivery, transfer_in, transfer_out, adjustment, audit
    
    qty_change = Column(Float, nullable=False)
    qty_before = Column(Float, nullable=False)
    qty_after = Column(Float, nullable=False)
    
    reference_id = Column(Integer, nullable=True)
    reference_type = Column(String(50), nullable=True) # "receipt", "delivery", "internal_transfer", "adjustment", "audit"
    
    performed_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    notes = Column(String(500), nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now(), index=True)

    # relationships
    product = relationship("Product")
    warehouse = relationship("Warehouse")
    user = relationship("User")


class StockAlert(Base):
    """System generated alerts for low stock"""
    __tablename__ = "stock_alerts"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False, index=True)
    warehouse_id = Column(Integer, ForeignKey("warehouses.id"), nullable=False, index=True)
    
    alert_type = Column(String(50), nullable=False) # "low_stock", "out_of_stock"
    message = Column(String(500), nullable=False)
    
    is_resolved = Column(Boolean, default=False, index=True)
    resolved_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    resolved_at = Column(DateTime(timezone=True), nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # relationships
    product = relationship("Product")
    warehouse = relationship("Warehouse")
