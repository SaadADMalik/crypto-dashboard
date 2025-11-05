import os
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        "sqlite+aiosqlite:///./crypto_dashboard.db"
    )
    
    # API URLs
    COINGECKO_API_URL: str = "https://api.coingecko.com/api/v3"
    BINANCE_WS_URL: str = "wss://stream.binance.com:9443/ws"
    
    # CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "https://*.vercel.app",
    ]
    
    # Environment
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "production")
    
    class Config:
        env_file = ".env"

settings = Settings()