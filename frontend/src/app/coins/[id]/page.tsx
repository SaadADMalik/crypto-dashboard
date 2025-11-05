'use client';

import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { coinsApi } from '@/lib/api';
import { CoinDetail, ChartDataPoint } from '@/types';
import { Loading } from '@/components/Loading';
import { Error } from '@/components/Error';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import { TrendingUp, TrendingDown, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function CoinDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap async params
  const { id } = use(params);

  // Fetch coin details
  const { data: coin, isLoading: coinLoading, error: coinError } = useQuery({
    queryKey: ['coin', id],
    queryFn: async () => {
      const response = await coinsApi.getById(id);
      return response.data as CoinDetail;
    },
  });

  // Fetch chart data
  const { data: chartData, isLoading: chartLoading } = useQuery({
    queryKey: ['chart', id],
    queryFn: async () => {
      const response = await coinsApi.getChart(id, 7);
      return response.data as ChartDataPoint[];
    },
  });

  if (coinLoading) return <Loading />;
  if (coinError) return <Error message="Failed to load coin details" />;
  if (!coin) return <Error message="Coin not found" />;

  const isPositive = coin.price_change_percentage_24h >= 0;
  const isFeatured = coin.id === 'vanar-chain';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        
        {/* Back Button */}
        <Link
          href="/coins"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-xl text-white transition-all mb-8 shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-semibold">Back to Markets</span>
        </Link>

        {/* Coin Header Card */}
        <div className={`relative overflow-hidden rounded-3xl p-8 mb-8 shadow-2xl border-2 ${
          isFeatured 
            ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/50' 
            : 'bg-white/5 backdrop-blur-md border-white/10'
        }`}>
          
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
          
          <div className="relative">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
              
              {/* Coin Info */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-xl opacity-40"></div>
                  <Image
                    src={coin.image}
                    alt={coin.name}
                    width={80}
                    height={80}
                    className="relative rounded-full ring-4 ring-white/20"
                    unoptimized
                  />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-4xl md:text-5xl font-black text-white">
                      {coin.name}
                    </h1>
                    {isFeatured && (
                      <span className="px-3 py-1 bg-yellow-500 text-yellow-900 text-sm font-black rounded-lg shadow-lg">
                        FEATURED
                      </span>
                    )}
                  </div>
                  <p className="text-xl text-gray-400 uppercase font-bold tracking-wider">
                    {coin.symbol}
                  </p>
                </div>
              </div>

              {/* Rank Badge */}
              {coin.market_cap_rank && (
                <div className="px-6 py-3 bg-blue-500/20 border-2 border-blue-500/30 rounded-2xl backdrop-blur-sm shadow-lg">
                  <div className="text-sm text-blue-300 font-medium mb-1">MARKET RANK</div>
                  <div className="text-3xl font-black text-white">
                    #{coin.market_cap_rank}
                  </div>
                </div>
              )}
            </div>

            {/* Current Price */}
            <div className="mb-8">
              <div className="text-sm text-gray-400 font-bold uppercase mb-2">Current Price</div>
              <div className="text-6xl md:text-7xl font-black text-white mb-4">
                {formatCurrency(coin.current_price)}
              </div>
              <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl font-black text-2xl shadow-lg border-2 ${
                isPositive
                  ? 'bg-green-500/20 text-green-400 border-green-500/30'
                  : 'bg-red-500/20 text-red-400 border-red-500/30'
              }`}>
                {isPositive ? <TrendingUp className="w-7 h-7" /> : <TrendingDown className="w-7 h-7" />}
                <span>{formatPercentage(coin.price_change_percentage_24h)}</span>
                <span className="text-base text-gray-400">(24h)</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
                <div className="text-xs text-gray-400 font-bold uppercase mb-2">Market Cap</div>
                <div className="text-xl md:text-2xl font-black text-white">
                  {formatCurrency(coin.market_cap)}
                </div>
              </div>
              <div className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
                <div className="text-xs text-gray-400 font-bold uppercase mb-2">Volume (24h)</div>
                <div className="text-xl md:text-2xl font-black text-white">
                  {formatCurrency(coin.total_volume)}
                </div>
              </div>
              <div className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
                <div className="text-xs text-gray-400 font-bold uppercase mb-2">24h High</div>
                <div className="text-xl md:text-2xl font-black text-green-400">
                  {formatCurrency(coin.high_24h)}
                </div>
              </div>
              <div className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
                <div className="text-xs text-gray-400 font-bold uppercase mb-2">24h Low</div>
                <div className="text-xl md:text-2xl font-black text-red-400">
                  {formatCurrency(coin.low_24h)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Price Chart Card */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl">📈</span>
            <h2 className="text-3xl font-black text-white">
              Price Chart (7 Days)
            </h2>
          </div>

          {chartLoading ? (
            <div className="h-[500px] flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-400 text-lg font-medium">Loading chart data...</p>
            </div>
          ) : chartData && chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={500}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={isPositive ? '#10b981' : '#ef4444'} stopOpacity={0.4}/>
                    <stop offset="95%" stopColor={isPositive ? '#10b981' : '#ef4444'} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis 
                  dataKey="timestamp"
                  tickFormatter={(timestamp) => {
                    const date = new Date(timestamp);
                    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                  }}
                  stroke="#9ca3af"
                  style={{ fontSize: '14px', fontWeight: 600 }}
                  tick={{ fill: '#9ca3af' }}
                />
                <YAxis
                  stroke="#9ca3af"
                  style={{ fontSize: '14px', fontWeight: 600 }}
                  tick={{ fill: '#9ca3af' }}
                  tickFormatter={(value) => {
                    const numValue = Number(value);
                    if (numValue >= 1000) {
                      return '$' + numValue.toLocaleString('en-US', { 
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0 
                      });
                    } else if (numValue >= 1) {
                      return '$' + numValue.toFixed(2);
                    } else if (numValue >= 0.01) {
                      return '$' + numValue.toFixed(4);
                    } else {
                      return '$' + numValue.toFixed(6);
                    }
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '2px solid ' + (isPositive ? '#10b981' : '#ef4444'),
                    borderRadius: '16px',
                    padding: '16px',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
                  }}
                  labelStyle={{ 
                    color: '#9ca3af',
                    marginBottom: '8px',
                    fontSize: '14px'
                  }}
                  labelFormatter={(timestamp) => {
                    const date = new Date(timestamp);
                    return date.toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    });
                  }}
                  formatter={(value: any) => {
                    const numValue = Number(value);
                    let formatted = '';
                    if (numValue >= 1000) {
                      formatted = '$' + numValue.toLocaleString('en-US', { 
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2 
                      });
                    } else if (numValue >= 1) {
                      formatted = '$' + numValue.toFixed(2);
                    } else if (numValue >= 0.01) {
                      formatted = '$' + numValue.toFixed(4);
                    } else {
                      formatted = '$' + numValue.toFixed(6);
                    }
                    return [formatted, 'Price'];
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke={isPositive ? '#10b981' : '#ef4444'}
                  strokeWidth={3}
                  fill="url(#colorPrice)"
                  animationDuration={1500}
                  animationEasing="ease-in-out"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[500px] flex flex-col items-center justify-center">
              <div className="text-6xl mb-4">📊</div>
              <div className="text-xl font-bold text-gray-400">No chart data available</div>
              <div className="text-sm text-gray-500 mt-2">Chart data will appear once available</div>
            </div>
          )}
        </div>

        {/* Additional Info (Optional) */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Price Range */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              📊 24h Price Range
            </h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-400 mb-2">Low</div>
                <div className="text-2xl font-bold text-red-400">
                  {formatCurrency(coin.low_24h)}
                </div>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                  style={{
                    width: `${((coin.current_price - coin.low_24h) / (coin.high_24h - coin.low_24h)) * 100}%`
                  }}
                ></div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-2">High</div>
                <div className="text-2xl font-bold text-green-400">
                  {formatCurrency(coin.high_24h)}
                </div>
              </div>
            </div>
          </div>

          {/* Market Stats */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              💰 Market Statistics
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Market Cap Rank</span>
                <span className="text-white font-bold">#{coin.market_cap_rank || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Trading Volume</span>
                <span className="text-white font-bold">{formatCurrency(coin.total_volume)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Market Dominance</span>
                <span className="text-white font-bold">
                  {coin.market_cap && coin.total_volume 
                    ? ((coin.market_cap / coin.total_volume) * 100).toFixed(2) + '%'
                    : 'N/A'
                  }
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}