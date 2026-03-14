from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.stock_ledger import StockInventory, StockLedger, StockAlert
from app.schemas.stock_inquiry import StockResponse, LedgerResponse, AlertResponse
from app.core.dependencies import get_current_user

router = APIRouter(prefix="/stock", tags=["Stock Management"])

@router.get("", response_model=list[StockResponse])
def get_all_stock(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return db.query(StockInventory).offset(skip).limit(limit).all()

@router.get("/low-alerts", response_model=list[AlertResponse])
def get_low_stock_alerts(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return db.query(StockAlert).filter(StockAlert.is_resolved == False).order_by(StockAlert.created_at.desc()).all()

@router.get("/ledger", response_model=list[LedgerResponse])
def get_full_ledger(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return db.query(StockLedger).order_by(StockLedger.created_at.desc()).offset(skip).limit(limit).all()

@router.get("/ledger/{product_id}", response_model=list[LedgerResponse])
def get_ledger_for_product(product_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return db.query(StockLedger).filter(StockLedger.product_id == product_id).order_by(StockLedger.created_at.desc()).all()

@router.get("/{product_id}", response_model=list[StockResponse])
def get_stock_by_product(product_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return db.query(StockInventory).filter(StockInventory.product_id == product_id).all()
