from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base import Base

class AuditSession(Base):
    """A physical inventory counting session"""
    __tablename__ = "audit_sessions"

    id = Column(Integer, primary_key=True, index=True)
    session_number = Column(String(100), unique=True, index=True, nullable=False) # e.g. AUD-2024-001
    warehouse_id = Column(Integer, ForeignKey("warehouses.id"), nullable=False)
    status = Column(String(50), default="in_progress") # in_progress, confirming, completed, cancelled
    
    created_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    finished_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    finished_at = Column(DateTime(timezone=True), nullable=True)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # relationships
    items = relationship("AuditItem", back_populates="audit_session", cascade="all, delete-orphan")
    warehouse = relationship("Warehouse")


class AuditItem(Base):
    """Individual product counts during an audit"""
    __tablename__ = "audit_items"

    id = Column(Integer, primary_key=True, index=True)
    audit_session_id = Column(Integer, ForeignKey("audit_sessions.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    location_id = Column(Integer, ForeignKey("locations.id"), nullable=True)
    
    system_qty = Column(Float, nullable=False) # What the system expected
    counted_qty = Column(Float, nullable=True) # What was actually counted physically
    
    # Relationships
    audit_session = relationship("AuditSession", back_populates="items")
    product = relationship("Product")
