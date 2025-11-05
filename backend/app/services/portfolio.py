from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete
from typing import List, Optional
from app.models.portfolio import Portfolio
from app.schemas.portfolio import PortfolioItemCreate, PortfolioStatsResponse

class PortfolioService:
    
    @staticmethod
    async def get_all_items(db: AsyncSession) -> List[Portfolio]:
        """Get all portfolio items"""
        result = await db.execute(select(Portfolio))
        return result.scalars().all()
    
    @staticmethod
    async def get_item_by_id(db: AsyncSession, item_id: int) -> Optional[Portfolio]:
        """Get a single portfolio item by ID"""
        result = await db.execute(select(Portfolio).where(Portfolio.id == item_id))
        return result.scalar_one_or_none()
    
    @staticmethod
    async def create_item(db: AsyncSession, item: PortfolioItemCreate) -> Portfolio:
        """Create a new portfolio item"""
        db_item = Portfolio(
            coin_id=item.coin_id,
            symbol=item.symbol,
            name=item.name,
            amount=item.amount,
            buy_price=item.buy_price,
            current_price=item.buy_price,
            image=item.image,
        )
        db.add(db_item)
        await db.commit()
        await db.refresh(db_item)
        return db_item
    
    @staticmethod
    async def delete_item(db: AsyncSession, item_id: int) -> bool:
        """Delete a portfolio item"""
        result = await db.execute(delete(Portfolio).where(Portfolio.id == item_id))
        await db.commit()
        return result.rowcount > 0
    
    @staticmethod
    async def update_current_price(db: AsyncSession, coin_id: str, current_price: float) -> None:
        """Update current price for all items of a specific coin"""
        result = await db.execute(select(Portfolio).where(Portfolio.coin_id == coin_id))
        items = result.scalars().all()
        
        for item in items:
            item.current_price = current_price
        
        await db.commit()
    
    @staticmethod
    async def calculate_stats(items: List[Portfolio]) -> PortfolioStatsResponse:
        """Calculate portfolio statistics"""
        if not items:
            return PortfolioStatsResponse(
                total_value=0.0,
                total_invested=0.0,
                total_profit=0.0,
                profit_percentage=0.0,
                items_count=0,
            )
        
        total_value = sum(item.current_price * item.amount for item in items)
        total_invested = sum(item.buy_price * item.amount for item in items)
        total_profit = total_value - total_invested
        profit_percentage = (total_profit / total_invested * 100) if total_invested > 0 else 0.0
        
        return PortfolioStatsResponse(
            total_value=round(total_value, 2),
            total_invested=round(total_invested, 2),
            total_profit=round(total_profit, 2),
            profit_percentage=round(profit_percentage, 2),
            items_count=len(items),
        )

portfolio_service = PortfolioService()