<p align="center">
  <h1 align="center">📦 CoreInventory</h1>
  <p align="center">
    <strong>A Precision Warehouse Management System</strong>
  </p>
  <p align="center">
    <em>Real-time tracking · Quick Inbound · Inventory Audit · Rupee Analytics</em>
  </p>
</p>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [New Release Features](#-new-release-features)
- [Core Features](#-core-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Demo Accounts](#-demo-accounts)
- [The Team](#-the-team)
- [License](#-license)

---

## 🧭 Overview

**CoreInventory** is a high-performance Warehouse Management System (WMS) designed to transform raw logistics data into operational art. Built for the **IndusHack** hackathon, it provides a curated, editorial-style interface for managing complex stock levels, auditing inventory accuracy, and streamlining the receiving process with surgical precision.

---

## 🚀 New Release Features (v4.0)

We have recently enhanced the platform with powerful new modules to improve warehouse efficiency:

- **⚡ Quick Inbound**: A one-click receiving system that allows staff to scan and shelf stock instantly, reducing inbound processing time by up to 70%.
- **🔍 Inventory Audit**: An intelligent auditing module to reconcile physical stock with digital records, featuring auto-adjustment ledgers.
- **₹ Rupee-First Analytics**: Full localization for the Indian market, displaying all asset valuations and financial reports in Rupees (₹).
- **📉 Live Metrics Slider**: A redesigned, minimal landing page with interactive sliding details highlighting key system capabilities.
- **🔐 Streamlined Auth**: Integrated demo credentials on the Sign-Up page for instant platform exploration.

---

## ✨ Core Features

| Category | Feature | Description |
| :--- | :--- | :--- |
| **Inventory** | Live Stock Levels | Real-time monitoring across all warehouse zones in ₹ |
| **Logistics** | Quick Inbound | High-speed receipt processing and zone mapping |
| **Control** | Inventory Audit | discrepancy identification and resolution tools |
| **Operations** | Internal Transfers | Seamless stock movement with chain-of-custody tracking |
| **History** | Move Ledger | Full, chronological audit trail of every stock movement |
| **Security** | Role-Based Access | Secure Admin and Staff roles with JWT authentication |
| **UX** | Minimal Design | Glassmorphism UI with smooth ambient animations |

---

## 🛠️ Technology Stack

### Backend — Python / FastAPI
- **FastAPI**: Async web framework for high-concurrency operations.
- **SQLAlchemy 2.0**: Modern ORM for robust database integrity.
- **MySQL & Redis**: High-performance primary storage and caching.
- **JOSE (JWT)**: Secure token-based session management.

### Frontend — React / Vite
- **React 19**: Modern component-based architecture.
- **Vite 6**: Ultra-fast build and development environment.
- **Tailwind CSS 4**: Utility-first styling for a custom, premium aesthetic.
- **Material Symbols**: Precision iconography for a clean UX.

---

## 📂 Project Structure

```text
CoreInventory/
│
├── backend/                        # ⚙️ FastAPI Python API
│   ├── app/
│   │   ├── main.py                 # App entry & middleware
│   │   ├── api/v1/                 # Versioned API routes
│   │   ├── models/                 # SQLAlchemy DB models
│   │   ├── schemas/                # Pydantic data validation
│   │   └── services/               # Core business logic
│   └── seed_users.py               # Demo credential generator
│
├── inventory-app/                  # 🎨 React + Vite Frontend
│   ├── src/
│   │   ├── components/             # Layout & UI components
│   │   ├── context/                # Auth & Global state
│   │   └── pages/                  
│   │       ├── QuickInbound.jsx    # NEW: Rapid receiving module
│   │       ├── InventoryAudit.jsx  # NEW: Stock reconciliation
│   │       ├── Landing.jsx         # REDESIGN: Minimal slider landing
│   │       └── ...                 # System management pages
│   └── index.css                   # Global design tokens
│
└── README.md                       # Project documentation
```

---

## 🚀 Getting Started

### 1. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
alembic upgrade head
python seed_users.py
uvicorn app.main:app --reload
```

### 2. Frontend Setup
```bash
cd inventory-app
npm install
npm run dev
```

---

## 👤 Demo Accounts

Explore the system instantly using the **Demo Credentials** buttons on the Sign Up/Sign In pages:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@example.com` | `admin123` |
| **Warehouse Staff** | `staff@example.com` | `staff123` |

---

## 👥 The Team

Created and Developed with ❤️ by:

- **Dhruv Patva**
- **Yash Sharma**
- **Sanidhya Roy**
- **Vishwa Singh**

---

## 📄 License

This project was developed for **IndusHack**. All rights reserved by the development team.

---

<p align="center">
  <strong>Built with FastAPI + React + Tailwind CSS</strong>
</p>
