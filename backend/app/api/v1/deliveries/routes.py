from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.delivery import DeliveryOrder, DeliveryLine
from app.schemas.stock import DeliveryCreate, DeliveryResponse
from app.core.dependencies import require_staff, require_manager
from app.services.delivery_service import validate_delivery
from app.core.exceptions import InvalidStateError
from datetime import datetime
import uuid

router = APIRouter(prefix="/deliveries", tags=["Deliveries"])

@router.get("", response_model=list[DeliveryResponse])
def get_deliveries(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(DeliveryOrder).offset(skip).limit(limit).all()

@router.post("", response_model=DeliveryResponse, status_code=status.HTTP_201_CREATED)
def create_delivery(payload: DeliveryCreate, db: Session = Depends(get_db), current_user = Depends(require_staff)):
    delivery_number = f"DEL-{datetime.utcnow().strftime('%Y%m%d')}-{uuid.uuid4().hex[:6].upper()}"
    
    delivery = DeliveryOrder(
        delivery_number=delivery_number,
        source_warehouse_id=payload.source_warehouse_id,
        customer_name=payload.customer_name,
        shipping_address=payload.shipping_address,
        reference_doc=payload.reference_doc,
        created_by=current_user.id
    )
    db.add(delivery)
    db.flush()
    
    for line in payload.lines:
        db_line = DeliveryLine(
            delivery_id=delivery.id,
            product_id=line.product_id,
            qty_ordered=line.qty_ordered
        )
        db.add(db_line)
        
    db.commit()
    db.refresh(delivery)
    return delivery

@router.get("/{id}", response_model=DeliveryResponse)
def get_delivery(id: int, db: Session = Depends(get_db)):
    delivery = db.query(DeliveryOrder).filter(DeliveryOrder.id == id).first()
    if not delivery:
        raise HTTPException(status_code=404, detail="Delivery order not found")
    return delivery

@router.post("/{id}/validate", response_model=DeliveryResponse)
def validate_delivery_endpoint(id: int, db: Session = Depends(get_db), current_user = Depends(require_manager)):
    try:
        delivery = validate_delivery(id, current_user.id, db)
        return delivery
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except InvalidStateError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/{id}/cancel", response_model=DeliveryResponse)
def cancel_delivery(id: int, db: Session = Depends(get_db), current_user = Depends(require_manager)):
    delivery = db.query(DeliveryOrder).filter(DeliveryOrder.id == id).first()
    if not delivery:
        raise HTTPException(status_code=404, detail="Delivery order not found")
    if delivery.status != "draft":
        raise HTTPException(status_code=400, detail="Only draft deliveries can be cancelled")
        
    delivery.status = "cancelled"
    db.commit()
    db.refresh(delivery)
    return delivery
