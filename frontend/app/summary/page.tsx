/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, BarChart3, Loader2, AlertCircle, Activity, Zap } from "lucide-react";

type Stock = {
  name: string;
  symbol: string;
  baseline: number;
  current: number;
  abs_change: number;
  change_pct: string;
  trend: string;
  source: string;
  last_updated: string;
};

type Summary = {
  top_gainers: Stock[];
  top_losers: Stock[];
  portfolio_avg_change: number;
};

export default function SummaryPage() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/summary");
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Failed to fetch summary: ${text}`);
        }
        const data: Summary = await res.json();
        setSummary(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  if (loading) 
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,transparent_70%)]"></div>
        <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-12 shadow-2xl">
          <div className="flex items-center space-x-4">
            <Loader2 className="animate-spin h-8 w-8 text-white/80" />
            <p className="text-white/90 text-xl font-light tracking-wide">Loading market data...</p>
          </div>
        </div>
      </div>
    );

  if (error) 
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,transparent_70%)]"></div>
        <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/20 p-12 shadow-2xl">
          <div className="flex items-center space-x-4">
            <AlertCircle className="h-8 w-8 text-white/70" />
            <p className="text-white/90 text-xl font-light">Error: {error}</p>
          </div>
        </div>
      </div>
    );

  if (!summary) 
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,transparent_70%)]"></div>
        <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-12 shadow-2xl">
          <div className="flex items-center space-x-4">
            <BarChart3 className="h-8 w-8 text-white/70" />
            <p className="text-white/80 text-xl font-light">No summary data available</p>
          </div>
        </div>
      </div>
    );

  const renderStockList = (stocks: Stock[]) =>
    stocks.length > 0 ? (
      <div className="mt-6 space-y-4">
        {stocks.map((stock, index) => (
          <div 
            key={stock.symbol} 
            className="group bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                  <p className="font-bold text-white text-xl tracking-wider">{stock.symbol}</p>
                </div>
                <p className="text-white/60 text-sm font-light pl-5 tracking-wide">{stock.name}</p>
              </div>
              <div className="text-right space-y-2">
                <div className="flex items-center space-x-2">
                  {stock.trend.includes("UP") ? (
                    <TrendingUp className="h-5 w-5 text-white/80" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-white/80" />
                  )}
                  <p className={`font-bold text-xl tracking-wider ${
                    stock.trend.includes("UP") 
                      ? "text-white/90" 
                      : "text-white/70"
                  }`}>
                    {stock.change_pct}
                  </p>
                </div>
                <p className="text-xs text-white/40 font-light tracking-wide">
                  {stock.last_updated}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="mt-6 bg-white/3 backdrop-blur-xl rounded-2xl border border-white/10 p-8 text-center">
        <BarChart3 className="h-12 w-12 text-white/30 mx-auto mb-4" />
        <p className="text-white/50 text-lg font-light tracking-wide">No data available</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.05)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.03)_0%,transparent_50%)]"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/3 rounded-full blur-3xl transform translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/3 rounded-full blur-3xl transform -translate-x-48 translate-y-48"></div>
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      <div className="relative z-10 p-8 space-y-12 max-w-7xl mx-auto">
        {/* Refined Header */}
        <div className="text-center space-y-6 pt-8">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-1 h-12 bg-gradient-to-b from-white/60 to-white/20 rounded-full"></div>
            <BarChart3 className="h-12 w-12 text-white/80" />
            <div className="w-1 h-12 bg-gradient-to-b from-white/20 to-white/60 rounded-full"></div>
          </div>
          <h1 className="text-6xl font-extralight text-white tracking-wider">
            MARKET
          </h1>
          <h2 className="text-3xl font-light text-white/80 tracking-widest -mt-2">
            SUMMARY
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto"></div>
        </div>

        {/* Portfolio Average Card - Enhanced */}
        <div className="bg-white/8 backdrop-blur-2xl rounded-3xl border border-white/15 p-12 shadow-2xl hover:bg-white/12 hover:border-white/25 transition-all duration-700 hover:scale-[1.02] group">
          <div className="text-center space-y-8">
            <div className="flex items-center justify-center space-x-4">
              <Activity className="h-8 w-8 text-white/70 group-hover:text-white/90 transition-colors duration-300" />
              <h2 className="text-2xl font-light text-white/90 tracking-widest uppercase">
                Portfolio Performance
              </h2>
            </div>
            <div className="relative">
              <p className={`text-7xl font-extralight tracking-wider transition-all duration-500 ${
                summary.portfolio_avg_change >= 0 
                  ? "text-white/90" 
                  : "text-white/70"
              }`}>
                {summary.portfolio_avg_change.toFixed(2)}%
              </p>
              <div className="absolute -inset-8 rounded-full bg-white/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-white/50 rounded-full animate-pulse"></div>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              <div className="w-2 h-2 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>

        {/* Stock Lists Grid - Enhanced */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Top Gainers */}
          <div className="bg-white/8 backdrop-blur-2xl rounded-3xl border border-white/15 p-10 shadow-2xl hover:bg-white/12 hover:border-white/25 transition-all duration-700 group">
            <div className="flex items-center space-x-4 mb-8">
              <div className="relative">
                <TrendingUp className="h-8 w-8 text-white/80 group-hover:text-white transition-colors duration-300" />
                <div className="absolute -inset-2 bg-white/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-light text-white tracking-widest uppercase">
                  Top Gainers
                </h2>
                <div className="w-12 h-px bg-white/40"></div>
              </div>
            </div>
            {renderStockList(summary.top_gainers)}
          </div>

          {/* Top Losers */}
          <div className="bg-white/8 backdrop-blur-2xl rounded-3xl border border-white/15 p-10 shadow-2xl hover:bg-white/12 hover:border-white/25 transition-all duration-700 group">
            <div className="flex items-center space-x-4 mb-8">
              <div className="relative">
                <TrendingDown className="h-8 w-8 text-white/80 group-hover:text-white transition-colors duration-300" />
                <div className="absolute -inset-2 bg-white/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-light text-white tracking-widest uppercase">
                  Top Losers
                </h2>
                <div className="w-12 h-px bg-white/40"></div>
              </div>
            </div>
            {renderStockList(summary.top_losers)}
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="text-center pt-12 pb-8">
          <div className="inline-flex items-center space-x-4 bg-white/5 backdrop-blur-2xl rounded-full px-8 py-4 border border-white/10 hover:bg-white/8 hover:border-white/20 transition-all duration-500">
            <div className="relative">
              <Zap className="h-4 w-4 text-white/70" />
              <div className="absolute -inset-1 bg-white/20 rounded-full animate-ping opacity-20"></div>
            </div>
            <div className="w-px h-4 bg-white/20"></div>
            <p className="text-white/60 text-sm font-light tracking-widest uppercase">Live Market Data</p>
          </div>
        </div>
      </div>
    </div>
  );
}