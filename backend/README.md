# Backend - Crypto Dashboard API

FastAPI backend with WebSocket support for real-time cryptocurrency data.

## Tech Stack

- **Framework:** FastAPI
- **Language:** Python 3.11
- **Database:** SQLite (development) / PostgreSQL (production)
- **ORM:** SQLAlchemy (async)

## Getting Started

1. Create virtual environment: `py -3.11 -m venv venv`
2. Activate: `.\venv\Scripts\Activate.ps1`
3. Install dependencies: `pip install -r requirements.txt`
4. Run server: `uvicorn app.main:app --reload`
5. Open docs: http://localhost:8000/docs
