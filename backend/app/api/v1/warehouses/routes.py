from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.warehouse import Warehouse
from app.schemas.warehouse import WarehouseCreate, WarehouseUpdate, WarehouseResponse, WarehouseWithLocationsResponse
from app.core.dependencies import get_current_user, require_admin

router = APIRouter(prefix="/warehouses", tags=["Warehouses"])

@router.get("", response_model=list[WarehouseResponse])
def get_warehouses(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    warehouses = db.query(Warehouse).offset(skip).limit(limit).all()
    return warehouses

@router.post("", response_model=WarehouseResponse, status_code=status.HTTP_201_CREATED)
def create_warehouse(warehouse: WarehouseCreate, db: Session = Depends(get_db), current_user = Depends(require_admin)):
    db_warehouse = db.query(Warehouse).filter((Warehouse.code == warehouse.code) | (Warehouse.name == warehouse.name)).first()
    if db_warehouse:
        raise HTTPException(status_code=400, detail="Warehouse with this code or name already exists")
    db_warehouse = Warehouse(**warehouse.model_dump())
    db.add(db_warehouse)
    db.commit()
    db.refresh(db_warehouse)
    return db_warehouse

@router.get("/{warehouse_id}", response_model=WarehouseWithLocationsResponse)
def get_warehouse(warehouse_id: int, db: Session = Depends(get_db)):
    warehouse = db.query(Warehouse).filter(Warehouse.id == warehouse_id).first()
    if not warehouse:
        raise HTTPException(status_code=404, detail="Warehouse not found")
    return warehouse

@router.put("/{warehouse_id}", response_model=WarehouseResponse)
def update_warehouse(warehouse_id: int, warehouse: WarehouseUpdate, db: Session = Depends(get_db), current_user = Depends(require_admin)):
    db_warehouse = db.query(Warehouse).filter(Warehouse.id == warehouse_id).first()
    if not db_warehouse:
        raise HTTPException(status_code=404, detail="Warehouse not found")
        
    update_data = warehouse.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_warehouse, key, value)
        
    db.commit()
    db.refresh(db_warehouse)
    return db_warehouse
