from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.config import settings
from app.database import create_tables
from app.routers import coins, portfolio, websocket

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan context manager for startup and shutdown events
    """
    # Startup: Create database tables
    print("🚀 Starting up Crypto Dashboard API...")
    await create_tables()
    print("✅ Database tables created successfully")
    yield
    # Shutdown: Clean up (if needed)
    print("👋 Shutting down Crypto Dashboard API...")

# Create FastAPI app
app = FastAPI(
    title="Crypto Dashboard API",
    description="Real-time cryptocurrency tracking API with portfolio management",
    version="1.0.0",
    lifespan=lifespan,
)

# Configure CORS - PRODUCTION FIX
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",                        # Local development
        "https://crypto-dashboard-waur.vercel.app",     # Production Vercel URL
        "https://*.vercel.app",                         # All Vercel preview deployments
        "*",                                            # Allow all (for debugging)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check endpoints
@app.get("/")
async def root():
    """
    Root endpoint - API information
    """
    return {
        "message": "Crypto Dashboard API",
        "version": "1.0.0",
        "status": "operational",
        "endpoints": {
            "docs": "/docs",
            "redoc": "/redoc",
            "health": "/health",
            "coins": "/api/coins",
            "portfolio": "/api/portfolio",
            "websocket": "/ws"
        }
    }

@app.get("/health")
async def health_check():
    """
    Health check endpoint for monitoring
    """
    return {
        "status": "healthy",
        "api": "operational",
        "database": "connected"
    }

# Include routers
app.include_router(coins.router, prefix="/api/coins", tags=["Coins"])
app.include_router(portfolio.router, prefix="/api/portfolio", tags=["Portfolio"])
app.include_router(websocket.router, prefix="/ws", tags=["WebSocket"])

# Additional middleware for debugging (optional - remove in production)
@app.middleware("http")
async def log_requests(request, call_next):
    """
    Log all incoming requests for debugging
    """
    print(f"📥 {request.method} {request.url.path} from {request.client.host}")
    response = await call_next(request)
    print(f"📤 Response: {response.status_code}")
    return response