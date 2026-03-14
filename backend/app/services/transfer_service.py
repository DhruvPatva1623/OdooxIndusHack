from sqlalchemy.orm import Session
from app.models.transfer import InternalTransfer
from app.services.stock_service import update_stock
from app.core.exceptions import InvalidStateError
from datetime import datetime

def confirm_transfer(transfer_id: int, user_id: int, db: Session) -> InternalTransfer:
    """
    Confirm internal transfer: deduct from source, add to destination atomically.
    Total org stock remains unchanged.
    """
    transfer = db.query(InternalTransfer).filter(InternalTransfer.id == transfer_id).first()
    if not transfer:
        raise ValueError("Transfer not found.")
    if transfer.status != "draft":
        raise InvalidStateError(f"Cannot confirm transfer in '{transfer.status}' state.")

    for line in transfer.lines:
        # Deduct from source
        update_stock(
            product_id=line.product_id,
            warehouse_id=transfer.source_warehouse_id,
            location_id=transfer.source_location_id,
            qty_change=-float(line.qty),
            operation_type="transfer_out",
            reference_id=transfer.id,
            reference_type="internal_transfer",
            user_id=user_id,
            db=db
        )
        # Add to destination
        update_stock(
            product_id=line.product_id,
            warehouse_id=transfer.destination_warehouse_id,
            location_id=transfer.destination_location_id,
            qty_change=+float(line.qty),
            operation_type="transfer_in",
            reference_id=transfer.id,
            reference_type="internal_transfer",
            user_id=user_id,
            db=db
        )

    transfer.status = "done"
    transfer.confirmed_by = user_id
    transfer.confirmed_at = datetime.utcnow()
    db.commit()
    return transfer
