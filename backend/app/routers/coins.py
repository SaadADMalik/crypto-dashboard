from fastapi import APIRouter, HTTPException, Query
from typing import List
from app.services.coingecko import coingecko_service
from app.schemas.coin import CoinListItem, ChartDataPoint

router = APIRouter()

@router.get("/", response_model=List[CoinListItem])
async def get_coins(
    page: int = Query(1, ge=1, description="Page number"),
    per_page: int = Query(50, ge=1, le=250, description="Items per page")
):
    """Get list of cryptocurrencies with Vanar Chain (VANRY) first."""
    coins = await coingecko_service.get_coins_list(page=page, per_page=per_page)
    if not coins:
        raise HTTPException(status_code=503, detail="Unable to fetch coins data")
    return coins

@router.get("/{coin_id}")
async def get_coin_detail(coin_id: str):
    """Get detailed information for a specific cryptocurrency."""
    coin = await coingecko_service.get_coin_detail(coin_id)
    if not coin:
        raise HTTPException(status_code=404, detail=f"Coin '{coin_id}' not found")
    return coin

@router.get("/{coin_id}/chart", response_model=List[ChartDataPoint])
async def get_coin_chart(
    coin_id: str,
    days: int = Query(7, ge=1, le=365, description="Number of days (1-365)")
):
    """Get historical price chart data for a cryptocurrency."""
    chart_data = await coingecko_service.get_chart_data(coin_id, days)
    if not chart_data:
        raise HTTPException(status_code=404, detail=f"Chart data for '{coin_id}' not found")
    return chart_data

@router.get("/search/query")
async def search_coins(q: str = Query(..., min_length=1, description="Search query")):
    """Search for cryptocurrencies by name or symbol."""
    results = await coingecko_service.search_coins(q)
    return {"results": results, "count": len(results)}