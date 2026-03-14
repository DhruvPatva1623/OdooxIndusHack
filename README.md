<p align="center">
  <h1 align="center">📦 CoreInventory</h1>
  <p align="center">
    <strong>A Precision Warehouse Management System</strong>
  </p>
  <p align="center">
    <em>Real-time inventory tracking · Internal transfers · Full audit trails · Role-based access</em>
  </p>
</p>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#1-backend-setup)
  - [Frontend Setup](#2-frontend-setup)
  - [Docker Setup (Optional)](#3-docker-setup-optional)
- [API Documentation](#-api-documentation)
- [Environment Variables](#-environment-variables)
- [Demo Accounts](#-demo-accounts)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🧭 Overview

**CoreInventory** is a full-stack Warehouse Management System (WMS) that provides operational clarity through a modern, premium interface. It handles stock monitoring, warehouse operations, internal transfers, receipts, delivery orders, and comprehensive audit trails — all secured behind role-based authentication.

---

## ✨ Features

| Category | Feature | Description |
| :--- | :--- | :--- |
| **Inventory** | Real-Time Stock Levels | Monitor stock quantities across all warehouses |
| **Inventory** | Stock Adjustments | Record corrections and reconcile inventory discrepancies |
| **Operations** | Receipts | Manage incoming shipments and update stock on arrival |
| **Operations** | Delivery Orders | Track and fulfill outgoing customer orders |
| **Operations** | Internal Transfers | Move products between warehouse locations seamlessly |
| **Reporting** | Move History | Full, chronological audit trail of every stock movement |
| **Reporting** | Dashboard | Visual overview with key metrics and activity summaries |
| **Security** | JWT Authentication | Secure token-based login with access & refresh tokens |
| **Security** | Role-Based Access | Admin and Staff roles with appropriate permissions |
| **Security** | OTP & Password Reset | Email-based OTP verification and password recovery flow |
| **UI/UX** | Premium Design | Glassmorphism-inspired interface with modern aesthetics |

---

## 🛠️ Technology Stack

### Backend — Python / FastAPI

| Technology | Purpose |
| :--- | :--- |
| **FastAPI** | High-performance async web framework |
| **SQLAlchemy 2.0** | ORM for database modeling and queries |
| **Alembic** | Database schema migration management |
| **MySQL 8.0** | Primary relational database |
| **Redis 7.0** | Caching and OTP token storage |
| **Passlib + Bcrypt** | Secure password hashing |
| **python-jose (JWT)** | Token-based authentication |
| **SlowAPI** | API rate limiting |
| **Uvicorn** | ASGI server for production deployment |
| **Docker** | Containerized deployment support |

### Frontend — React / Vite

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Component-based UI library |
| **Vite 6** | Lightning-fast build tool and dev server |
| **Tailwind CSS 4** | Utility-first CSS framework |
| **React Router 7** | Client-side routing and navigation |
| **Axios** | HTTP client for API communication |
| **Material Symbols** | Icon system for UI elements |

---

## 📂 Project Structure

```text
OdooxIndusHack/
│
├── backend/                        # ⚙️ FastAPI Backend
│   ├── app/
│   │   ├── main.py                 # Application entry point, middleware setup
│   │   ├── api/v1/                 # API route handlers (versioned)
│   │   │   ├── router.py           # Central API router
│   │   │   ├── auth/               # Authentication endpoints
│   │   │   ├── products/           # Product CRUD operations
│   │   │   ├── warehouses/         # Warehouse management
│   │   │   ├── stock/              # Stock levels & adjustments
│   │   │   ├── receipts/           # Incoming shipment handling
│   │   │   ├── deliveries/         # Outgoing order management
│   │   │   └── transfers/          # Internal transfer operations
│   │   ├── core/                   # Core utilities
│   │   │   ├── config.py           # App settings & environment config
│   │   │   ├── security.py         # JWT token generation & validation
│   │   │   ├── dependencies.py     # FastAPI dependency injection
│   │   │   ├── email.py            # Email service integration
│   │   │   ├── otp.py              # OTP generation & verification
│   │   │   └── exceptions.py       # Custom exception classes
│   │   ├── models/                 # SQLAlchemy ORM models
│   │   │   ├── user.py             # User & role models
│   │   │   ├── product.py          # Product model
│   │   │   ├── warehouse.py        # Warehouse model
│   │   │   ├── location.py         # Warehouse location model
│   │   │   ├── stock_ledger.py     # Stock ledger & tracking
│   │   │   ├── receipt.py          # Receipt model
│   │   │   ├── delivery.py         # Delivery order model
│   │   │   ├── transfer.py         # Internal transfer model
│   │   │   ├── adjustment.py       # Stock adjustment model
│   │   │   └── audit.py            # Audit trail model
│   │   ├── schemas/                # Pydantic request/response schemas
│   │   ├── services/               # Business logic layer
│   │   └── db/                     # Database session & connection
│   ├── alembic/                    # Database migrations
│   ├── Dockerfile                  # Backend container definition
│   ├── docker-compose.yml          # MySQL + Redis services
│   ├── requirements.txt            # Python dependencies
│   ├── seed_users.py               # Demo user seeding script
│   └── init_db.py                  # Database initialization
│
├── inventory-app/                  # 🎨 React Frontend
│   ├── src/
│   │   ├── main.jsx                # React DOM entry point
│   │   ├── App.jsx                 # Root component & routing
│   │   ├── api.js                  # Axios API client configuration
│   │   ├── index.css               # Global styles & design tokens
│   │   ├── App.css                 # Application-level styles
│   │   ├── context/                # React Context providers
│   │   │   └── AuthContext.jsx     # Authentication state management
│   │   ├── components/             # Shared components
│   │   │   ├── Layout.jsx          # Main app layout with sidebar
│   │   │   ├── ProtectedRoute.jsx  # Route guard for auth
│   │   │   └── Toast.jsx           # Notification toast component
│   │   └── pages/                  # Page components
│   │       ├── Landing.jsx         # Public landing page
│   │       ├── SignIn.jsx          # Login page
│   │       ├── SignUp.jsx          # Registration page
│   │       ├── ForgotPassword.jsx  # Password recovery
│   │       ├── Otp.jsx             # OTP verification
│   │       ├── ResetPassword.jsx   # Password reset
│   │       ├── Dashboard.jsx       # Main dashboard
│   │       ├── Products.jsx        # Product management
│   │       ├── Warehouse.jsx       # Warehouse management
│   │       ├── StockLevels.jsx     # Stock level monitoring
│   │       ├── StockAdjustments.jsx# Stock corrections
│   │       ├── Receipts.jsx        # Receipt management
│   │       ├── DeliveryOrders.jsx  # Delivery order tracking
│   │       ├── InternalTransfers.jsx # Transfer operations
│   │       ├── MoveHistory.jsx     # Audit trail viewer
│   │       └── UserProfile.jsx     # User settings
│   ├── package.json                # Node.js dependencies
│   └── vite.config.js              # Vite build configuration
│
└── README.md                       # 📄 This file
```

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version |
| :--- | :--- |
| **Python** | 3.10+ |
| **Node.js** | 18+ |
| **npm** | 9+ |
| **MySQL** | 8.0+ |
| **Redis** | 7.0+ (or use Docker) |

### 1. Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Create and activate a virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

# Install Python dependencies
pip install -r requirements.txt

# Configure environment variables (see section below)
# Create a .env file in the backend/ directory

# Run database migrations
alembic upgrade head

# Seed demo users (optional)
python seed_users.py

# Start the development server
uvicorn app.main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`  
Interactive docs at `http://localhost:8000/api/docs` (debug mode only)

### 2. Frontend Setup

```bash
# Navigate to the frontend directory
cd inventory-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

### 3. Docker Setup (Optional)

Spin up MySQL and Redis quickly with Docker Compose:

```bash
cd backend

# Start database and cache services
docker-compose up -d

# Verify services are running
docker-compose ps
```

This starts:
- **MySQL 8.0** on port `3306`
- **Redis 7.0** on port `6379`

---

## 📡 API Documentation

All API routes are prefixed with `/api/v1`. Below is a summary of the available endpoints:

| Module | Endpoint Prefix | Description |
| :--- | :--- | :--- |
| **Auth** | `/api/v1/auth` | Login, register, OTP, password reset |
| **Products** | `/api/v1/products` | CRUD operations for products |
| **Warehouses** | `/api/v1/warehouses` | Warehouse & location management |
| **Stock** | `/api/v1/stock` | Stock levels, ledger & adjustments |
| **Receipts** | `/api/v1/receipts` | Incoming shipment management |
| **Deliveries** | `/api/v1/deliveries` | Outgoing delivery orders |
| **Transfers** | `/api/v1/transfers` | Internal stock transfers |

> 💡 **Tip:** When running in debug mode, visit `http://localhost:8000/api/docs` for the full interactive Swagger UI.

---

## 🔐 Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
# Database
DATABASE_URL=mysql+pymysql://root:password@localhost:3306/coreinventory

# Security
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS
ALLOWED_ORIGINS=http://localhost:5173

# Debug
DEBUG=true

# Email (for OTP / Password Reset)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Redis
REDIS_URL=redis://localhost:6379
```

---

## 👤 Demo Accounts

The system includes pre-seeded demo accounts (run `python seed_users.py` to create them):

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@example.com` | `admin123` |
| **Warehouse Staff** | `staff@example.com` | `staff123` |

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature`
3. **Commit** your changes: `git commit -m "Add your feature"`
4. **Push** to the branch: `git push origin feature/your-feature`
5. **Open** a Pull Request

---

## 📄 License

This project is developed for **IndusHack** — a hackathon project by the team.

---

<p align="center">
  Built with using <strong>FastAPI</strong> + <strong>React</strong>
</p>
