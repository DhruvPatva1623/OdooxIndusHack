from sqlalchemy.orm import Session
from sqlalchemy import select
from app.models.stock_ledger import StockLedger, StockInventory, StockAlert
from app.models.product import Product

def get_total_stock_for_warehouse(product_id: int, warehouse_id: int, db: Session) -> float:
    total = db.query(StockInventory.qty_on_hand).filter(
        StockInventory.product_id == product_id,
        StockInventory.warehouse_id == warehouse_id
    ).scalar()
    return total or 0.0

def get_free_to_use(product_id: int, warehouse_id: int, db: Session) -> float:
    # In a real app this might subtract reserved quantities setup by pending deliveries
    return get_total_stock_for_warehouse(product_id, warehouse_id, db)

def check_and_create_low_stock_alert(product_id: int, warehouse_id: int, db: Session):
    product = db.query(Product).get(product_id)
    total = get_total_stock_for_warehouse(product_id, warehouse_id, db)

    if total <= float(product.reorder_min):
        # Only create if no unresolved alert exists
        existing = db.query(StockAlert).filter(
            StockAlert.product_id == product_id,
            StockAlert.warehouse_id == warehouse_id,
            StockAlert.alert_type == "low_stock",
            StockAlert.is_resolved == False
        ).first()

        if not existing:
            alert = StockAlert(
                product_id=product_id,
                warehouse_id=warehouse_id,
                alert_type="low_stock" if total > 0 else "out_of_stock",
                message=f"{product.name} is {'low' if total > 0 else 'out of'} stock. Current: {total} {product.unit_of_measure}."
            )
            db.add(alert)
            db.flush()

def update_stock(
    product_id: int,
    warehouse_id: int,
    qty_change: float,
    operation_type: str,
    reference_id: int,
    reference_type: str,
    user_id: int,
    db: Session,
    location_id: int = None,
    notes: str = None
) -> StockInventory:
    """
    Atomically update stock and write a ledger entry.
    Raises ValueError if qty would go negative.
    Uses SELECT FOR UPDATE to prevent race conditions.
    """
    # Lock the stock row
    stmt = (
        select(StockInventory)
        .where(
            StockInventory.product_id == product_id,
            StockInventory.warehouse_id == warehouse_id,
            StockInventory.location_id == location_id
        )
        .with_for_update()
    )
    stock = db.execute(stmt).scalar_one_or_none()

    if not stock:
        # First-time: create the stock record
        stock = StockInventory(
            product_id=product_id,
            warehouse_id=warehouse_id,
            location_id=location_id,
            qty_on_hand=0.0
        )
        db.add(stock)
        db.flush()

    qty_before = float(stock.qty_on_hand)
    qty_after = qty_before + qty_change

    if qty_after < 0:
        raise ValueError(
            f"Insufficient stock: {qty_before} available, {abs(qty_change)} required."
        )

    stock.qty_on_hand = qty_after

    # Write immutable ledger entry
    ledger_entry = StockLedger(
        product_id=product_id,
        warehouse_id=warehouse_id,
        location_id=location_id,
        operation_type=operation_type,
        qty_change=qty_change,
        qty_before=qty_before,
        qty_after=qty_after,
        reference_id=reference_id,
        reference_type=reference_type,
        performed_by=user_id,
        notes=notes
    )
    db.add(ledger_entry)
    db.flush()
    
    check_and_create_low_stock_alert(product_id, warehouse_id, db)

    return stock
