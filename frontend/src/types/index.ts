export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number | null;
  price_change_percentage_24h: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  sparkline_in_7d?: {
    price: number[];
  };
}

export interface CoinDetail extends Coin {
  price_change_percentage_7d?: number;
  price_change_percentage_30d?: number;
  description?: string;
}

export interface ChartDataPoint {
  timestamp: number;
  price: number;
}

export interface PortfolioItem {
  id: number;
  coin_id: string;
  symbol: string;
  name: string;
  amount: number;
  buy_price: number;
  current_price: number;
  image?: string;
  created_at: string;
}

export interface PortfolioStats {
  total_value: number;
  total_invested: number;
  total_profit: number;
  profit_percentage: number;
  items_count: number;
}

export interface WebSocketMessage {
  type: 'connection' | 'price_update' | 'heartbeat' | 'pong';
  symbol?: string;
  price?: number;
  timestamp?: number;
  status?: string;
  subscribed_symbols?: string[];
}