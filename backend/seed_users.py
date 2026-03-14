import sys
import os
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.user import User
from app.core.security import hash_password

def seed_users():
    db = SessionLocal()
    try:
        users_to_add = [
            {
                "full_name": "Admin User",
                "email": "admin@example.com",
                "password": "admin123",
                "role": "admin"
            },
            {
                "full_name": "Staff User",
                "email": "staff@example.com",
                "password": "staff123",
                "role": "warehouse_staff"
            }
        ]

        for user_data in users_to_add:
            existing_user = db.query(User).filter(User.email == user_data["email"]).first()
            if not existing_user:
                print(f"Adding user: {user_data['email']}")
                new_user = User(
                    full_name=user_data["full_name"],
                    email=user_data["email"],
                    password_hash=hash_password(user_data["password"]),
                    role=user_data["role"],
                    is_active=True,
                    token_version=0
                )
                db.add(new_user)
            else:
                print(f"User already exists: {user_data['email']}")
                # Update password just in case
                existing_user.password_hash = hash_password(user_data["password"])
                existing_user.role = user_data["role"]
                db.add(existing_user)
        
        db.commit()
        print("Seeding completed successfully.")
    except Exception as e:
        print(f"Error during seeding: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    # Add project root to sys.path
    project_root = os.path.dirname(os.path.abspath(__file__))
    sys.path.append(project_root)
    seed_users()
