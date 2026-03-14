# CoreInventory: Warehouse Management System

CoreInventory is a sophisticated, high-performance Warehouse Management System (WMS) designed to provide operational clarity through a curated, modern interface. It handles everything from stock levels and internal transfers to comprehensive audit trails with editorial precision.

## ✨ Features

- **Inventory Tracking**: Real-time monitoring of stock levels across multiple warehouses.
- **Full Audit Trail**: Detailed history of all stock movements and adjustments.
- **Internal Transfers**: Streamlined movement of products between warehouse locations.
- **Receipts & Delivery**: Efficient management of incoming stock and outgoing orders.
- **Advanced Security**: Role-based access control (Admin/Staff) using secure JWT authentication.
- **Premium UI**: Modern, glassmorphism-inspired design with a focus on usability and aesthetics.

---

## 🛠️ Technology Stack

### Backend (Python/FastAPI)
- **FastAPI**: Modern, high-performance web framework for building APIs.
- **SQLAlchemy**: Powerful SQL toolkit and Object-Relational Mapper (ORM).
- **Alembic**: Database migrations management.
- **MySQL**: Reliable relational database for persistent storage.
- **Bcrypt**: Industrial-strength password hashing.
- **JOSE (JWT)**: Secure token-based authentication.
- **Uvicorn**: Lightning-fast ASGI server.

### Frontend (React/Vite)
- **React 18**: Component-based UI library.
- **Vite**: Ultra-fast frontend build tool.
- **Tailwind CSS**: Utility-first CSS framework for modern styling.
- **Axios**: Promise-based HTTP client for API requests.
- **React Router**: Declarative routing for single-page applications.
- **Material Symbols**: High-quality icons for visual clarity.

---

## 🚀 Getting Started

### Prerequisites
- Python 3.10+
- Node.js & npm
- MySQL Server

### Backend Setup
1. Navigate to the `backend` directory.
2. Install dependencies:
   ```powershell
   pip install -r requirements.txt
   ```
3. Configure your [`.env`](backend/.env) file with your database credentials.
4. Run database migrations:
   ```powershell
   alembic upgrade head
   ```
5. Start the server:
   ```powershell
   uvicorn app.main:app --reload
   ```

### Frontend Setup
1. Navigate to the `inventory-app` directory.
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Start the development server:
   ```powershell
   npm run dev
   ```

---

## 👤 Demo Access
The system includes pre-seeded demo accounts for easy exploration:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@example.com` | `admin123` |
| **Warehouse Staff** | `staff@example.com` | `staff123` |

---

## 📂 Project Structure
```text
coreinventory/
├── backend/            # FastAPI Backend API
│   ├── app/            # Application logic
│   ├── alembic/        # DB Migrations
│   └── ...
├── inventory-app/      # React Frontend
│   ├── src/            # Components, Pages, State
│   └── ...
└── README.md           # Project Documentation
```
