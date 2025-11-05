from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.config import settings
from app.database import create_tables
from app.routers import coins, portfolio, websocket

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Create database tables
    await create_tables()
    yield
    # Shutdown: Clean up (if needed)

# Create FastAPI app
app = FastAPI(
    title="Crypto Dashboard API",
    description="Real-time cryptocurrency tracking API with portfolio management",
    version="1.0.0",
    lifespan=lifespan,
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check endpoints
@app.get("/")
async def root():
    return {
        "message": "Crypto Dashboard API",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/health"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# Include routers
app.include_router(coins.router, prefix="/api/coins", tags=["Coins"])
app.include_router(portfolio.router, prefix="/api/portfolio", tags=["Portfolio"])
app.include_router(websocket.router, prefix="/ws", tags=["WebSocket"])