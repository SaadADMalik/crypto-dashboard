'use client';

import { Coin } from '@/types';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import { TrendingUp, TrendingDown, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CoinCardProps {
  coin: Coin;
  isFeatured?: boolean;
}

export function CoinCard({ coin, isFeatured = false }: CoinCardProps) {
  const isPositive = coin.price_change_percentage_24h >= 0;

  return (
    <Link href={`/coins/${coin.id}`}>
      <div
        className={`
          relative p-6 rounded-xl border transition-all duration-200 hover:shadow-lg cursor-pointer
          ${isFeatured 
            ? 'bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-300 dark:border-blue-700 shadow-md' 
            : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700'
          }
        `}
      >
        {/* Featured Badge */}
        {isFeatured && (
          <div className="absolute top-3 right-3">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          </div>
        )}

        {/* Coin Header */}
        <div className="flex items-center space-x-3 mb-4">
          <Image
            src={coin.image}
            alt={coin.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {coin.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 uppercase">
              {coin.symbol}
            </p>
          </div>
          {coin.market_cap_rank && (
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
              #{coin.market_cap_rank}
            </span>
          )}
        </div>

        {/* Price */}
        <div className="mb-3">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatCurrency(coin.current_price)}
          </div>
        </div>

        {/* 24h Change */}
        <div className="flex items-center justify-between">
          <div
            className={`flex items-center space-x-1 text-sm font-medium ${
              isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>{formatPercentage(coin.price_change_percentage_24h)}</span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">24h</div>
        </div>

        {/* Market Cap */}
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between text-xs">
            <span className="text-gray-500 dark:text-gray-400">Market Cap</span>
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {formatCurrency(coin.market_cap)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}