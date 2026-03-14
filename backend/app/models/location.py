from sqlalchemy import Column, Integer, String, Boolean, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base import Base

class Location(Base):
    __tablename__ = "locations"

    id = Column(Integer, primary_key=True, index=True)
    warehouse_id = Column(Integer, ForeignKey("warehouses.id"), nullable=False, index=True)
    name = Column(String(255), nullable=False) # e.g. "A1-Bin2"
    zone = Column(String(100), nullable=True)  # e.g. "Cold Storage", "Aisles"
    is_active = Column(Boolean, default=True)
    
    # Capacity for this specific location
    max_capacity_m3 = Column(Float, default=0.0)
    max_weight_kg = Column(Float, default=0.0)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # relationship
    warehouse = relationship("Warehouse", back_populates="locations")
