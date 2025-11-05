import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints
export const coinsApi = {
  getAll: (page = 1, perPage = 50) =>
    api.get(`/api/coins`, { params: { page, per_page: perPage } }),
  
  getById: (id: string) =>
    api.get(`/api/coins/${id}`),
  
  getChart: (id: string, days = 7) =>
    api.get(`/api/coins/${id}/chart`, { params: { days } }),
  
  search: (query: string) =>
    api.get(`/api/coins/search/query`, { params: { q: query } }),
};

export const portfolioApi = {
  getAll: () =>
    api.get('/api/portfolio'),
  
  create: (data: {
    coin_id: string;
    symbol: string;
    name: string;
    amount: number;
    buy_price: number;
    image?: string;
  }) =>
    api.post('/api/portfolio', data),
  
  delete: (id: number) =>
    api.delete(`/api/portfolio/${id}`),
  
  getStats: () =>
    api.get('/api/portfolio/stats'),
};

// WebSocket connection
export const createWebSocket = (symbols: string[]) => {
  const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000';
  return new WebSocket(`${WS_BASE_URL}/ws/prices/${symbols.join(',')}`);
};