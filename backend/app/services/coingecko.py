import httpx
from typing import List, Optional
from app.config import settings

class CoinGeckoService:
    def __init__(self):
        self.base_url = settings.COINGECKO_API_URL
        self.client = httpx.AsyncClient(timeout=30.0)
        self.cache = {}
        self.vanry_id = "vanar-chain"
        
    async def close(self):
        await self.client.aclose()
    
    async def get_coins_list(self, page: int = 1, per_page: int = 50) -> List[dict]:
        """Fetch list of coins with Vanry/USDT first"""
        cache_key = f"coins_list_{page}_{per_page}"
        
        if cache_key in self.cache:
            return self.cache[cache_key]
        
        try:
            url = f"{self.base_url}/coins/markets"
            params = {
                "vs_currency": "usd",
                "order": "market_cap_desc",
                "per_page": per_page,
                "page": page,
                "sparkline": True,
                "price_change_percentage": "24h",
            }
            
            response = await self.client.get(url, params=params)
            response.raise_for_status()
            data = response.json()
            
            vanry_coin = None
            other_coins = []
            
            for coin in data:
                if coin["id"] == self.vanry_id:
                    vanry_coin = coin
                else:
                    other_coins.append(coin)
            
            if vanry_coin is None and page == 1:
                try:
                    vanry_response = await self.client.get(
                        f"{self.base_url}/coins/markets",
                        params={
                            "vs_currency": "usd",
                            "ids": self.vanry_id,
                            "sparkline": True,
                            "price_change_percentage": "24h",
                        }
                    )
                    if vanry_response.status_code == 200:
                        vanry_data = vanry_response.json()
                        if vanry_data:
                            vanry_coin = vanry_data[0]
                except Exception as e:
                    print(f"Error fetching Vanry: {e}")
            
            result = [vanry_coin] + other_coins if vanry_coin else other_coins
            self.cache[cache_key] = result
            return result
            
        except httpx.HTTPError as e:
            print(f"HTTP Error fetching coins list: {e}")
            return []
        except Exception as e:
            print(f"Error fetching coins list: {e}")
            return []
    
    async def get_coin_detail(self, coin_id: str) -> Optional[dict]:
        """Fetch detailed information for a single coin"""
        cache_key = f"coin_detail_{coin_id}"
        
        if cache_key in self.cache:
            return self.cache[cache_key]
        
        try:
            url = f"{self.base_url}/coins/{coin_id}"
            params = {
                "localization": False,
                "tickers": False,
                "community_data": False,
                "developer_data": False,
            }
            
            response = await self.client.get(url, params=params)
            response.raise_for_status()
            data = response.json()
            
            result = {
                "id": data.get("id"),
                "symbol": data.get("symbol"),
                "name": data.get("name"),
                "image": data.get("image", {}),
                "current_price": data.get("market_data", {}).get("current_price", {}).get("usd", 0),
                "market_cap": data.get("market_data", {}).get("market_cap", {}).get("usd", 0),
                "market_cap_rank": data.get("market_cap_rank"),
                "price_change_percentage_24h": data.get("market_data", {}).get("price_change_percentage_24h", 0),
                "price_change_percentage_7d": data.get("market_data", {}).get("price_change_percentage_7d"),
                "price_change_percentage_30d": data.get("market_data", {}).get("price_change_percentage_30d"),
                "total_volume": data.get("market_data", {}).get("total_volume", {}).get("usd", 0),
                "high_24h": data.get("market_data", {}).get("high_24h", {}).get("usd", 0),
                "low_24h": data.get("market_data", {}).get("low_24h", {}).get("usd", 0),
                "description": data.get("description", {}).get("en", ""),
            }
            
            self.cache[cache_key] = result
            return result
            
        except httpx.HTTPError as e:
            print(f"HTTP Error fetching coin detail: {e}")
            return None
        except Exception as e:
            print(f"Error fetching coin detail: {e}")
            return None
    
    async def get_chart_data(self, coin_id: str, days: int = 7) -> List[dict]:
        """Fetch historical chart data for a coin"""
        cache_key = f"chart_{coin_id}_{days}"
        
        if cache_key in self.cache:
            return self.cache[cache_key]
        
        try:
            url = f"{self.base_url}/coins/{coin_id}/market_chart"
            params = {
                "vs_currency": "usd",
                "days": days,
                "interval": "hourly" if days <= 1 else "daily",
            }
            
            response = await self.client.get(url, params=params)
            response.raise_for_status()
            data = response.json()
            
            prices = data.get("prices", [])
            result = [
                {"timestamp": int(timestamp), "price": float(price)}
                for timestamp, price in prices
            ]
            
            self.cache[cache_key] = result
            return result
            
        except httpx.HTTPError as e:
            print(f"HTTP Error fetching chart data: {e}")
            return []
        except Exception as e:
            print(f"Error fetching chart data: {e}")
            return []
    
    async def search_coins(self, query: str) -> List[dict]:
        """Search for coins by name or symbol"""
        try:
            url = f"{self.base_url}/search"
            params = {"query": query}
            
            response = await self.client.get(url, params=params)
            response.raise_for_status()
            data = response.json()
            
            return data.get("coins", [])
            
        except httpx.HTTPError as e:
            print(f"HTTP Error searching coins: {e}")
            return []
        except Exception as e:
            print(f"Error searching coins: {e}")
            return []

coingecko_service = CoinGeckoService()