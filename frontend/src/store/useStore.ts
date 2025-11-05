import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StoreState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  
  realTimePrices: Record<string, number>;
  updatePrice: (symbol: string, price: number) => void;
  
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      // Theme - default to light
      theme: 'light',
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'dark' ? 'light' : 'dark',
        })),
      
      // Real-time prices from WebSocket
      realTimePrices: {},
      updatePrice: (symbol, price) =>
        set((state) => ({
          realTimePrices: { ...state.realTimePrices, [symbol]: price },
        })),
      
      // Search
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
    }),
    {
      name: 'crypto-dashboard-storage',
    }
  )
);