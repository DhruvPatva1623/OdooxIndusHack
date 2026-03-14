from app.db.session import SessionLocal
from app.models.user import User

def check_users():
    db = SessionLocal()
    try:
        users = db.query(User).all()
        print(f"Total users: {len(users)}")
        for user in users:
            print(f"ID: {user.id}, Name: {user.full_name}, Email: {user.email}, Role: {user.role}, Active: {user.is_active}")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    check_users()
