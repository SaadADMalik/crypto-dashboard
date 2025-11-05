from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class PortfolioItemBase(BaseModel):
    coin_id: str
    symbol: str
    name: str
    amount: float = Field(gt=0, description="Amount must be greater than 0")
    buy_price: float = Field(gt=0, description="Buy price must be greater than 0")
    image: Optional[str] = None

class PortfolioItemCreate(PortfolioItemBase):
    pass

class PortfolioItemResponse(PortfolioItemBase):
    id: int
    current_price: float
    created_at: datetime
    
    class Config:
        from_attributes = True

class PortfolioStatsResponse(BaseModel):
    total_value: float
    total_invested: float
    total_profit: float
    profit_percentage: float
    items_count: int
