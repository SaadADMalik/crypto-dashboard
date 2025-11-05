'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { coinsApi } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';
import { formatCurrency, formatPercentage } from '@/lib/utils';

type SortOption = 'rank' | 'price' | 'market_cap' | 'change';

export default function CoinsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('rank');

  const { data: coins, isLoading } = useQuery({
    queryKey: ['coins'],
    queryFn: async () => {
      const response = await coinsApi.getAll(1, 50);
      return response.data;
    },
  });

  // Filter and sort
  let filteredCoins = coins?.filter((coin: any) =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort coins
  if (filteredCoins) {
    filteredCoins = [...filteredCoins].sort((a: any, b: any) => {
      switch (sortBy) {
        case 'price':
          return b.current_price - a.current_price;
        case 'market_cap':
          return b.market_cap - a.market_cap;
        case 'change':
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        default:
          return (a.market_cap_rank || 999) - (b.market_cap_rank || 999);
      }
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-3xl"></div>
        <div className="relative px-4 sm:px-6 lg:px-8 py-16 w-full max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full mb-6 backdrop-blur-sm border border-green-500/30">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-bold text-green-300">LIVE • Updates every 30s</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
              Crypto Markets
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Real-time cryptocurrency prices powered by CoinGecko API
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 pb-16 w-full max-w-7xl mx-auto">
        
        {/* Search and Filter Bar */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="🔍 Search coins..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 text-lg rounded-xl bg-white/10 backdrop-blur-md border-2 border-white/20 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-all shadow-2xl"
            />
          </div>
          
          {/* Sort Filter */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full md:w-auto px-6 py-4 text-lg rounded-xl bg-white/10 backdrop-blur-md border-2 border-white/20 text-white focus:border-purple-500 focus:outline-none transition-all shadow-2xl cursor-pointer"
            >
              <option value="rank" className="bg-slate-800">Sort by Rank</option>
              <option value="price" className="bg-slate-800">Sort by Price</option>
              <option value="market_cap" className="bg-slate-800">Sort by Market Cap</option>
              <option value="change" className="bg-slate-800">Sort by 24h Change</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-20 text-center border border-white/10 shadow-2xl">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mb-4"></div>
            <p className="text-gray-300 text-lg">Loading markets...</p>
          </div>
        )}

        {/* Coins Grid */}
        {!isLoading && filteredCoins && (
          <div className="space-y-4">
            {filteredCoins.map((coin: any, index: number) => {
              const isPositive = coin.price_change_percentage_24h >= 0;
              const isFeatured = coin.id === 'vanar-chain';

              return (
                <Link key={coin.id} href={`/coins/${coin.id}`}>
                  <div className={`group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${
                    isFeatured
                      ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/50'
                      : 'bg-white/5 backdrop-blur-md border border-white/10'
                  } hover:bg-white/10`}>
                    
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/10 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="relative p-6">
                      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                        
                        {/* Left: Rank + Logo + Name */}
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          {/* Rank Badge */}
                          {isFeatured ? (
                            <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                              <span className="text-2xl">⭐</span>
                            </div>
                          ) : (
                            <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center font-black text-lg shadow-lg ${
                              index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' :
                              index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white' :
                              index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white' :
                              'bg-white/10 text-gray-300'
                            }`}>
                              {coin.market_cap_rank || '?'}
                            </div>
                          )}

                          {/* Logo */}
                          <Image
                            src={coin.image}
                            alt={coin.name}
                            width={56}
                            height={56}
                            className="rounded-full ring-4 ring-white/20"
                            unoptimized
                          />

                          {/* Name */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="text-2xl font-black text-white truncate">
                                {coin.name}
                              </h3>
                              {isFeatured && (
                                <span className="px-3 py-1 bg-yellow-500 text-yellow-900 text-xs font-black rounded-lg shadow-lg">
                                  FEATURED
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-400 uppercase font-bold tracking-wider">
                              {coin.symbol}
                            </p>
                          </div>
                        </div>

                        {/* Right: Price + Change */}
                        <div className="flex items-center gap-8 w-full lg:w-auto">
                          {/* Price */}
                          <div className="flex-1 lg:flex-none text-left lg:text-right">
                            <div className="text-xs text-gray-400 mb-1 font-medium uppercase">Price</div>
                            <div className="text-3xl font-black text-white">
                              {formatCurrency(coin.current_price)}
                            </div>
                          </div>

                          {/* 24h Change */}
                          <div className="text-right">
                            <div className="text-xs text-gray-400 mb-1 font-medium uppercase">24h</div>
                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-black text-xl shadow-lg ${
                              isPositive
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                : 'bg-red-500/20 text-red-400 border border-red-500/30'
                            }`}>
                              {isPositive ? '↗' : '↘'}
                              {formatPercentage(coin.price_change_percentage_24h)}
                            </div>
                          </div>

                          {/* Arrow */}
                          <div className="hidden lg:block text-gray-500 group-hover:text-blue-400 group-hover:translate-x-2 transition-all">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Stats */}
                      <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-6">
                        <div>
                          <div className="text-xs text-gray-400 mb-1 font-bold uppercase">Market Cap</div>
                          <div className="text-lg font-black text-white">
                            {formatCurrency(coin.market_cap)}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400 mb-1 font-bold uppercase">Volume 24h</div>
                          <div className="text-lg font-black text-white">
                            {formatCurrency(coin.total_volume)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* No Results */}
        {!isLoading && filteredCoins?.length === 0 && (
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-16 text-center border border-white/10 shadow-2xl">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No coins found</h3>
            <p className="text-gray-400">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  );
}