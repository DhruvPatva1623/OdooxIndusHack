from sqlalchemy.orm import Session
from app.models.receipt import Receipt
from app.services.stock_service import update_stock
from app.core.exceptions import InvalidStateError
from datetime import datetime

def validate_receipt(receipt_id: int, user_id: int, db: Session) -> Receipt:
    """
    Validate a receipt: increases stock for each line item.
    Receipt must be in READY state.
    All stock updates happen in a single transaction.
    """
    receipt = db.query(Receipt).filter(Receipt.id == receipt_id).first()
    if not receipt:
        raise ValueError(f"Receipt {receipt_id} not found.")
    if receipt.status != "ready":
        raise InvalidStateError(f"Cannot validate receipt in '{receipt.status}' state.")

    for line in receipt.lines:
        update_stock(
            product_id=line.product_id,
            warehouse_id=receipt.destination_warehouse_id,
            location_id=receipt.destination_location_id,
            qty_change=+float(line.qty_received),
            operation_type="receipt",
            reference_id=receipt.id,
            reference_type="receipt",
            user_id=user_id,
            db=db,
            notes=f"Receipt #{receipt.receipt_number}"
        )

    receipt.status = "done"
    receipt.validated_by = user_id
    receipt.validated_at = datetime.utcnow()
    db.commit()
    return receipt
