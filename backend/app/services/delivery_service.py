from sqlalchemy.orm import Session
from app.models.delivery import DeliveryOrder
from app.services.stock_service import update_stock, get_free_to_use
from app.core.exceptions import InvalidStateError
from datetime import datetime

def validate_delivery(delivery_id: int, user_id: int, db: Session) -> DeliveryOrder:
    """
    Validate delivery: decreases stock for each line item.
    Pre-checks all lines have sufficient free-to-use stock before any deduction.
    """
    delivery = db.query(DeliveryOrder).filter(DeliveryOrder.id == delivery_id).first()
    if not delivery:
        raise ValueError("Delivery order not found.")
    if delivery.status != "ready":
        raise InvalidStateError(f"Cannot validate delivery in '{delivery.status}' state.")

    # Pre-flight: verify all lines have stock BEFORE making any changes
    for line in delivery.lines:
        available = get_free_to_use(line.product_id, delivery.source_warehouse_id, db)
        if available < float(line.qty_ordered):
            product_name = line.product.name
            raise ValueError(
                f"Insufficient stock for '{product_name}': "
                f"{available} available, {line.qty_ordered} required."
            )

    # All checks passed → deduct stock
    for line in delivery.lines:
        update_stock(
            product_id=line.product_id,
            warehouse_id=delivery.source_warehouse_id,
            qty_change=-float(line.qty_ordered),
            operation_type="delivery",
            reference_id=delivery.id,
            reference_type="delivery",
            user_id=user_id,
            db=db,
            notes=f"Delivery #{delivery.delivery_number}"
        )

    delivery.status = "done"
    delivery.validated_by = user_id
    delivery.validated_at = datetime.utcnow()
    db.commit()
    return delivery
