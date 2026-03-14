from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.receipt import Receipt, ReceiptLine
from app.schemas.stock import ReceiptCreate, ReceiptResponse
from app.core.dependencies import require_staff, require_manager
from app.services.receipt_service import validate_receipt
from app.core.exceptions import InvalidStateError
import uuid

router = APIRouter(prefix="/receipts", tags=["Receipts"])

@router.get("", response_model=list[ReceiptResponse])
def get_receipts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(Receipt).offset(skip).limit(limit).all()

@router.post("", response_model=ReceiptResponse, status_code=status.HTTP_201_CREATED)
def create_receipt(payload: ReceiptCreate, db: Session = Depends(get_db), current_user = Depends(require_staff)):
    receipt_number = f"RCP-{datetime.utcnow().strftime('%Y%m%d')}-{uuid.uuid4().hex[:6].upper()}"
    
    receipt = Receipt(
        receipt_number=receipt_number,
        destination_warehouse_id=payload.destination_warehouse_id,
        destination_location_id=payload.destination_location_id,
        supplier_name=payload.supplier_name,
        reference_doc=payload.reference_doc,
        created_by=current_user.id
    )
    db.add(receipt)
    db.flush()
    
    for line in payload.lines:
        db_line = ReceiptLine(
            receipt_id=receipt.id,
            product_id=line.product_id,
            qty_ordered=line.qty_ordered,
            qty_received=line.qty_ordered # typically defaults to ordered
        )
        db.add(db_line)
        
    db.commit()
    db.refresh(receipt)
    return receipt

@router.get("/{id}", response_model=ReceiptResponse)
def get_receipt(id: int, db: Session = Depends(get_db)):
    receipt = db.query(Receipt).filter(Receipt.id == id).first()
    if not receipt:
        raise HTTPException(status_code=404, detail="Receipt not found")
    return receipt

@router.post("/{id}/validate", response_model=ReceiptResponse)
def validate_receipt_endpoint(id: int, db: Session = Depends(get_db), current_user = Depends(require_manager)):
    try:
        receipt = validate_receipt(id, current_user.id, db)
        return receipt
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except InvalidStateError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/{id}/cancel", response_model=ReceiptResponse)
def cancel_receipt(id: int, db: Session = Depends(get_db), current_user = Depends(require_manager)):
    receipt = db.query(Receipt).filter(Receipt.id == id).first()
    if not receipt:
        raise HTTPException(status_code=404, detail="Receipt not found")
    if receipt.status != "draft":
        raise HTTPException(status_code=400, detail="Only draft receipts can be cancelled")
        
    receipt.status = "cancelled"
    db.commit()
    db.refresh(receipt)
    return receipt
