from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.security import hash_password
from app.models.user import User
from app.models.warehouse import Warehouse
from app.models.location import Location
from app.models.product import Product
from app.models.stock_ledger import StockInventory, StockLedger
from app.models.receipt import Receipt, ReceiptLine
from app.models.delivery import DeliveryOrder, DeliveryLine

router = APIRouter(prefix="/dev", tags=["Dev"])

@router.post("/dummy-data", status_code=status.HTTP_201_CREATED)
def create_dummy_data(db: Session = Depends(get_db)):
    existing = db.query(User).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Database already has data. Delete existing records first.")

    try:
        admin = User(
            full_name="Admin User",
            email="admin@example.com",
            password_hash=hash_password("Password123"),
            role="admin",
            is_active=True,
        )
        warehouse_staff = User(
            full_name="Warehouse Staff",
            email="staff@example.com",
            password_hash=hash_password("Password123"),
            role="warehouse_staff",
            is_active=True,
        )
        db.add_all([admin, warehouse_staff])
        db.commit()
        db.refresh(admin)
        db.refresh(warehouse_staff)

        warehouses = [
            Warehouse(name="Main Warehouse", code="WH-001", address="100 Warehouse Lane, City"),
            Warehouse(name="Regional Warehouse", code="WH-002", address="200 Distribution Way, City"),
        ]
        db.add_all(warehouses)
        db.commit()
        for w in warehouses:
            db.refresh(w)

        location_a = Location(warehouse_id=warehouses[0].id, name="A1", zone="Receiving")
        location_b = Location(warehouse_id=warehouses[0].id, name="A2", zone="Pick")
        location_c = Location(warehouse_id=warehouses[1].id, name="B1", zone="Cold Storage")
        db.add_all([location_a, location_b, location_c])
        db.commit()
        for loc in [location_a, location_b, location_c]:
            db.refresh(loc)

        products = [
            Product(sku="PRD-1000", name="Blue Widget", description="Standard blue widget", category="Widgets", unit_cost=5.0, unit_price=8.0, reorder_min=15, reorder_qty=75, weight_kg=0.3, volume_m3=0.002),
            Product(sku="PRD-1001", name="Red Widget", description="Premium red widget", category="Widgets", unit_cost=8.5, unit_price=12.0, reorder_min=10, reorder_qty=60, weight_kg=0.35, volume_m3=0.0025),
            Product(sku="PRD-1002", name="Green Gadget", description="Multi-use green gadget", category="Gadgets", unit_cost=12.0, unit_price=18.0, reorder_min=8, reorder_qty=40, weight_kg=0.5, volume_m3=0.003),
        ]
        db.add_all(products)
        db.commit()
        for p in products:
            db.refresh(p)

        # Initial stock levels in Main warehouse
        inventories = [
            StockInventory(product_id=products[0].id, warehouse_id=warehouses[0].id, location_id=location_a.id, qty_on_hand=120),
            StockInventory(product_id=products[1].id, warehouse_id=warehouses[0].id, location_id=location_b.id, qty_on_hand=90),
            StockInventory(product_id=products[2].id, warehouse_id=warehouses[1].id, location_id=location_c.id, qty_on_hand=45),
        ]
        db.add_all(inventories)
        db.commit()

        ledgers = [
            StockLedger(product_id=products[0].id, warehouse_id=warehouses[0].id, location_id=location_a.id, operation_type="receipt", qty_change=120, qty_before=0, qty_after=120, reference_id=None, reference_type="initial", performed_by=admin.id, notes="Initial seed stock"),
            StockLedger(product_id=products[1].id, warehouse_id=warehouses[0].id, location_id=location_b.id, operation_type="receipt", qty_change=90, qty_before=0, qty_after=90, reference_id=None, reference_type="initial", performed_by=admin.id, notes="Initial seed stock"),
            StockLedger(product_id=products[2].id, warehouse_id=warehouses[1].id, location_id=location_c.id, operation_type="receipt", qty_change=45, qty_before=0, qty_after=45, reference_id=None, reference_type="initial", performed_by=admin.id, notes="Initial seed stock"),
        ]
        db.add_all(ledgers)

        receipt = Receipt(
            receipt_number="RCP-1001",
            status="done",
            destination_warehouse_id=warehouses[0].id,
            destination_location_id=location_a.id,
            supplier_name="Acme Supplies",
            reference_doc="PO-3456",
            created_by=admin.id,
            validated_by=admin.id,
        )
        db.add(receipt)
        db.commit()
        db.refresh(receipt)

        receipt_lines = [
            ReceiptLine(receipt_id=receipt.id, product_id=products[0].id, qty_ordered=50, qty_received=50),
            ReceiptLine(receipt_id=receipt.id, product_id=products[1].id, qty_ordered=40, qty_received=40),
        ]
        db.add_all(receipt_lines)

        delivery = DeliveryOrder(
            delivery_number="DEL-1001",
            status="done",
            source_warehouse_id=warehouses[0].id,
            customer_name="Enterprise Corp",
            shipping_address="250 Commerce Blvd",
            reference_doc="SO-9987",
            created_by=admin.id,
            validated_by=admin.id,
        )
        db.add(delivery)
        db.commit()
        db.refresh(delivery)

        delivery_lines = [
            DeliveryLine(delivery_id=delivery.id, product_id=products[0].id, qty_ordered=20),
            DeliveryLine(delivery_id=delivery.id, product_id=products[1].id, qty_ordered=10),
        ]
        db.add_all(delivery_lines)
        db.commit()

        return {
            "message": "Dummy data created successfully",
            "users": [admin.email, warehouse_staff.email],
            "warehouses": [w.name for w in warehouses],
            "products": [p.sku for p in products],
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to create dummy data: {str(e)}")
