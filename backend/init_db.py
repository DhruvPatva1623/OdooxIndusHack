import pymysql
import os
from dotenv import load_dotenv
from urllib.parse import urlparse, unquote

load_dotenv()

def create_db():
    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        print("Error: DATABASE_URL not found in .env")
        return

    try:
        # Use urlparse for robust parsing
        result = urlparse(db_url)
        
        user = result.username
        password = unquote(result.password) if result.password else ""
        host = result.hostname or "localhost"
        port = result.port or 3306
        # Remove leading slash from path to get db name
        dbname = result.path.lstrip('/')

        print(f"Connecting to MySQL at {host}:{port} as {user}...")

        connection = pymysql.connect(
            host=host,
            user=user,
            password=password,
            port=port
        )
        
        with connection.cursor() as cursor:
            cursor.execute(f"CREATE DATABASE IF NOT EXISTS {dbname}")
            print(f"Successfully created or found database: '{dbname}'")
        
        connection.close()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    create_db()
