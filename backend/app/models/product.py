from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime
from sqlalchemy.sql import func
from app.db.base import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    sku = Column(String(100), unique=True, index=True, nullable=False)
    name = Column(String(255), index=True, nullable=False)
    description = Column(String(1000), nullable=True)
    category = Column(String(100), index=True, nullable=True)
    unit_of_measure = Column(String(50), default="pcs", nullable=False)
    
    # Pricing & Cost
    unit_cost = Column(Float, default=0.0)
    unit_price = Column(Float, default=0.0)
    
    # Stock thresholds
    reorder_min = Column(Float, default=10.0)
    reorder_qty = Column(Float, default=50.0)
    
    # Dimensions (e.g. for capacity)
    weight_kg = Column(Float, default=0.0)
    volume_m3 = Column(Float, default=0.0)
    
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
