from pydantic import BaseModel
from typing import Optional, List

class CoinListItem(BaseModel):
    id: str
    symbol: str
    name: str
    image: str
    current_price: float
    market_cap: float
    market_cap_rank: Optional[int]
    price_change_percentage_24h: float
    total_volume: float
    high_24h: float
    low_24h: float
    sparkline_in_7d: Optional[dict] = None

class CoinDetailResponse(BaseModel):
    id: str
    symbol: str
    name: str
    image: dict
    current_price: float
    market_cap: float
    market_cap_rank: Optional[int]
    price_change_percentage_24h: float
    price_change_percentage_7d: Optional[float]
    price_change_percentage_30d: Optional[float]
    total_volume: float
    high_24h: float
    low_24h: float
    description: Optional[str] = None

class ChartDataPoint(BaseModel):
    timestamp: int
    price: float

class ChartDataResponse(BaseModel):
    prices: List[ChartDataPoint]
