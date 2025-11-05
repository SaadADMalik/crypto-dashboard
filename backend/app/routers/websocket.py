from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import Dict, Set
import asyncio
import json
import websockets
from app.config import settings

router = APIRouter()

# Store active WebSocket connections
class ConnectionManager:
    def __init__(self):
        self.active_connections: Set[WebSocket] = set()
        self.binance_ws = None
        self.subscribed_symbols: Set[str] = set()
        
    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.add(websocket)
        print(f"Client connected. Total connections: {len(self.active_connections)}")
        
    def disconnect(self, websocket: WebSocket):
        self.active_connections.discard(websocket)
        print(f"Client disconnected. Total connections: {len(self.active_connections)}")
        
    async def broadcast(self, message: dict):
        """Send message to all connected clients"""
        disconnected = set()
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except Exception as e:
                print(f"Error sending to client: {e}")
                disconnected.add(connection)
        
        # Clean up disconnected clients
        for conn in disconnected:
            self.disconnect(conn)
    
    async def connect_to_binance(self, symbols: list):
        """Connect to Binance WebSocket for multiple symbols"""
        # Convert symbols to lowercase streams (e.g., btcusdt@trade)
        streams = [f"{symbol.lower()}@trade" for symbol in symbols]
        stream_url = f"{settings.BINANCE_WS_URL}/{'/'.join(streams)}"
        
        print(f"Connecting to Binance: {stream_url}")
        
        while True:
            try:
                async with websockets.connect(stream_url) as ws:
                    self.binance_ws = ws
                    print("Connected to Binance WebSocket")
                    
                    async for message in ws:
                        data = json.loads(message)
                        
                        # Binance trade stream format
                        if 's' in data and 'p' in data:
                            symbol = data['s']  # e.g., BTCUSDT
                            price = float(data['p'])
                            timestamp = data['T']
                            
                            # Broadcast to all clients
                            await self.broadcast({
                                "symbol": symbol,
                                "price": price,
                                "timestamp": timestamp,
                                "type": "price_update"
                            })
                            
            except websockets.exceptions.ConnectionClosed:
                print("Binance WebSocket closed. Reconnecting in 5s...")
                await asyncio.sleep(5)
            except Exception as e:
                print(f"Binance WebSocket error: {e}. Reconnecting in 5s...")
                await asyncio.sleep(5)

manager = ConnectionManager()

@router.websocket("/prices/{symbols}")
async def websocket_prices(websocket: WebSocket, symbols: str):
    """
    WebSocket endpoint for real-time price updates.
    
    Usage: ws://localhost:8000/ws/prices/VANRYUSDT,BTCUSDT,ETHUSDT
    """
    await manager.connect(websocket)
    
    # Parse symbols (comma-separated)
    symbol_list = [s.strip().upper() for s in symbols.split(',')]
    
    # Start Binance connection if not already running
    if not manager.binance_ws or manager.binance_ws.closed:
        # Start background task to connect to Binance
        asyncio.create_task(manager.connect_to_binance(symbol_list))
    
    try:
        # Send initial connection success message
        await websocket.send_json({
            "type": "connection",
            "status": "connected",
            "subscribed_symbols": symbol_list
        })
        
        # Keep connection alive and handle incoming messages
        while True:
            # Wait for messages from client (e.g., ping/pong)
            try:
                data = await asyncio.wait_for(websocket.receive_text(), timeout=30.0)
                
                # Handle client messages (optional)
                if data == "ping":
                    await websocket.send_json({"type": "pong"})
                    
            except asyncio.TimeoutError:
                # Send heartbeat to keep connection alive
                await websocket.send_json({"type": "heartbeat"})
                
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        print("Client disconnected")
    except Exception as e:
        print(f"WebSocket error: {e}")
        manager.disconnect(websocket)