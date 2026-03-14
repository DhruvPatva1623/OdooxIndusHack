from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base import Base

class DeliveryOrder(Base):
    """Outgoing stock to customers"""
    __tablename__ = "delivery_orders"

    id = Column(Integer, primary_key=True, index=True)
    delivery_number = Column(String(100), unique=True, index=True, nullable=False) # e.g. DEL-2024-0001
    status = Column(String(50), default="draft") # draft, ready, done, cancelled
    
    source_warehouse_id = Column(Integer, ForeignKey("warehouses.id"), nullable=False)
    
    customer_name = Column(String(255), nullable=True)
    shipping_address = Column(String(500), nullable=True)
    reference_doc = Column(String(255), nullable=True) # e.g. Sales Order number
    
    created_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    validated_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    validated_at = Column(DateTime(timezone=True), nullable=True)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # relationships
    lines = relationship("DeliveryLine", back_populates="delivery", cascade="all, delete-orphan")
    warehouse = relationship("Warehouse", foreign_keys=[source_warehouse_id])


class DeliveryLine(Base):
    __tablename__ = "delivery_lines"

    id = Column(Integer, primary_key=True, index=True)
    delivery_id = Column(Integer, ForeignKey("delivery_orders.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    
    qty_ordered = Column(Float, default=0.0, nullable=False)

    # relationships
    delivery = relationship("DeliveryOrder", back_populates="lines")
    product = relationship("Product")
