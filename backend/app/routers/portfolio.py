from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.database import get_db
from app.services.portfolio import portfolio_service
from app.schemas.portfolio import (
    PortfolioItemCreate,
    PortfolioItemResponse,
    PortfolioStatsResponse,
)

router = APIRouter()

@router.get("/", response_model=List[PortfolioItemResponse])
async def get_portfolio(db: AsyncSession = Depends(get_db)):
    """Get all portfolio items."""
    items = await portfolio_service.get_all_items(db)
    return items

@router.post("/", response_model=PortfolioItemResponse, status_code=201)
async def add_to_portfolio(
    item: PortfolioItemCreate,
    db: AsyncSession = Depends(get_db)
):
    """Add a new item to the portfolio."""
    created_item = await portfolio_service.create_item(db, item)
    return created_item

@router.delete("/{item_id}")
async def remove_from_portfolio(item_id: int, db: AsyncSession = Depends(get_db)):
    """Remove an item from the portfolio."""
    deleted = await portfolio_service.delete_item(db, item_id)
    if not deleted:
        raise HTTPException(status_code=404, detail=f"Portfolio item {item_id} not found")
    return {"message": "Item deleted successfully", "id": item_id}

@router.get("/stats", response_model=PortfolioStatsResponse)
async def get_portfolio_stats(db: AsyncSession = Depends(get_db)):
    """Get portfolio statistics (total value, profit/loss, etc.)."""
    items = await portfolio_service.get_all_items(db)
    stats = await portfolio_service.calculate_stats(items)
    return stats