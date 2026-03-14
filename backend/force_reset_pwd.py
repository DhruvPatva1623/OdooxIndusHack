from app.db.session import SessionLocal
from app.models.user import User
from app.core.security import hash_password

def reset():
    db = SessionLocal()
    try:
        users = [
            ("admin@example.com", "admin123", "admin"),
            ("staff@example.com", "staff123", "warehouse_staff")
        ]
        for email, pwd, role in users:
            user = db.query(User).filter(User.email == email).first()
            if user:
                print(f"Updating user: {email}")
                user.password_hash = hash_password(pwd)
                user.role = role
                user.is_active = True
            else:
                print(f"Creating user: {email}")
                user = User(
                    full_name=email.split('@')[0].capitalize(),
                    email=email,
                    password_hash=hash_password(pwd),
                    role=role,
                    is_active=True
                )
                db.add(user)
        db.commit()
        print("Reset complete.")
    finally:
        db.close()

if __name__ == "__main__":
    reset()
