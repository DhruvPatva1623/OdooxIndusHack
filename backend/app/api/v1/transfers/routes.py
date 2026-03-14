from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.transfer import InternalTransfer, TransferLine
from app.schemas.stock import TransferCreate, TransferResponse
from app.core.dependencies import require_staff, require_manager
from app.services.transfer_service import confirm_transfer
from app.core.exceptions import InvalidStateError
from datetime import datetime
import uuid

router = APIRouter(prefix="/transfers", tags=["Internal Transfers"])

@router.get("", response_model=list[TransferResponse])
def get_transfers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(InternalTransfer).offset(skip).limit(limit).all()

@router.post("", response_model=TransferResponse, status_code=status.HTTP_201_CREATED)
def create_transfer(payload: TransferCreate, db: Session = Depends(get_db), current_user = Depends(require_staff)):
    transfer_number = f"TR-{datetime.utcnow().strftime('%Y%m%d')}-{uuid.uuid4().hex[:6].upper()}"
    
    transfer = InternalTransfer(
        transfer_number=transfer_number,
        source_warehouse_id=payload.source_warehouse_id,
        source_location_id=payload.source_location_id,
        destination_warehouse_id=payload.destination_warehouse_id,
        destination_location_id=payload.destination_location_id,
        scheduled_date=payload.scheduled_date,
        created_by=current_user.id
    )
    db.add(transfer)
    db.flush()
    
    for line in payload.lines:
        db_line = TransferLine(
            transfer_id=transfer.id,
            product_id=line.product_id,
            qty=line.qty
        )
        db.add(db_line)
        
    db.commit()
    db.refresh(transfer)
    return transfer

@router.get("/{id}", response_model=TransferResponse)
def get_transfer(id: int, db: Session = Depends(get_db)):
    transfer = db.query(InternalTransfer).filter(InternalTransfer.id == id).first()
    if not transfer:
        raise HTTPException(status_code=404, detail="Transfer not found")
    return transfer

@router.post("/{id}/confirm", response_model=TransferResponse)
def confirm_transfer_endpoint(id: int, db: Session = Depends(get_db), current_user = Depends(require_manager)):
    try:
        transfer = confirm_transfer(id, current_user.id, db)
        return transfer
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except InvalidStateError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/{id}/cancel", response_model=TransferResponse)
def cancel_transfer(id: int, db: Session = Depends(get_db), current_user = Depends(require_manager)):
    transfer = db.query(InternalTransfer).filter(InternalTransfer.id == id).first()
    if not transfer:
        raise HTTPException(status_code=404, detail="Transfer not found")
    if transfer.status != "draft":
        raise HTTPException(status_code=400, detail="Only draft transfers can be cancelled")
        
    transfer.status = "cancelled"
    db.commit()
    db.refresh(transfer)
    return transfer
