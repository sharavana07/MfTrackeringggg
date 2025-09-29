"use client";

import { useEffect, useState } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Activity, 
  Clock,
  Building2,
  Minus
} from "lucide-react";

const API_URL = "https://mftrackeringggg-1.onrender.com";

export default function StocksPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [stocks, setStocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/stocks`)
      .then((res) => res.json())
      .then((data) => {
        setStocks(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching stocks:", err);
        setLoading(false);
      });
  }, []);

  const getTrendIcon = (trend: string) => {
    if (trend === "UP 🔼") return <TrendingUp className="w-4 h-4" />;
    if (trend === "DOWN 🔽") return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const getTrendColor = (trend: string) => {
    if (trend === "UP 🔼") return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    if (trend === "DOWN 🔽") return "text-red-400 bg-red-500/10 border-red-500/20";
    return "text-slate-400 bg-slate-500/10 border-slate-500/20";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center">
        <div className="backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-3xl p-12 shadow-2xl">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div className="w-16 h-16 border-2 border-white/20 border-t-white/60 rounded-full animate-spin"></div>
              <Activity className="absolute inset-0 m-auto w-6 h-6 text-white/60" />
            </div>
            <div className="text-white text-2xl font-light tracking-wide">Loading Market Data...</div>
            <div className="text-white/40 text-sm">Fetching real-time stock information</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 relative overflow-hidden">
      {/* Enhanced Background Patterns */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.03)_0%,transparent_70%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.02)_0%,transparent_70%)]"></div>
        <div className="absolute top-1/2 left-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.01)_0%,transparent_50%)]"></div>
      </div>
      
      <div className="relative z-10 p-6 md:p-8 lg:p-12 max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="backdrop-blur-3xl bg-white/[0.02] border border-white/10 rounded-3xl p-8 mb-8 shadow-2xl hover:bg-white/[0.03] transition-all duration-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 backdrop-blur-2xl bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all">
                <BarChart3 className="w-8 h-8 text-white/70" />
              </div>
              <div>
                <h1 className="text-5xl font-light text-white mb-2 tracking-tight">Market Dashboard</h1>
                <p className="text-white/50 text-lg font-light">Real-time stock market analytics</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2 backdrop-blur-xl bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="text-white/60 text-sm">Live</span>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:bg-white/[0.03] transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 backdrop-blur-xl bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all">
                <Building2 className="w-6 h-6 text-white/60" />
              </div>
              <div className="text-white/40 text-xs uppercase tracking-widest font-medium">Portfolio</div>
            </div>
            <div className="text-white text-4xl font-light mb-1">{stocks.length}</div>
            <div className="text-white/50 text-sm font-light">Total Stocks</div>
          </div>

          <div className="backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:bg-white/[0.03] transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 backdrop-blur-xl bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20 group-hover:border-emerald-500/30 transition-all">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="text-white/40 text-xs uppercase tracking-widest font-medium">Bullish</div>
            </div>
            <div className="text-emerald-400 text-4xl font-light mb-1">
              {stocks.filter(stock => stock.trend === "UP 🔼").length}
            </div>
            <div className="text-white/50 text-sm font-light">Trending Up</div>
          </div>

          <div className="backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:bg-white/[0.03] transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 backdrop-blur-xl bg-red-500/10 rounded-xl flex items-center justify-center border border-red-500/20 group-hover:border-red-500/30 transition-all">
                <TrendingDown className="w-6 h-6 text-red-400" />
              </div>
              <div className="text-white/40 text-xs uppercase tracking-widest font-medium">Bearish</div>
            </div>
            <div className="text-red-400 text-4xl font-light mb-1">
              {stocks.filter(stock => stock.trend === "DOWN 🔽").length}
            </div>
            <div className="text-white/50 text-sm font-light">Trending Down</div>
          </div>
        </div>

        {/* Enhanced Stock Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {stocks.map((stock, index) => (
            <div
              key={stock.symbol}
              className="group backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:bg-white/[0.04] transition-all duration-500 hover:scale-[1.02] hover:border-white/20 relative overflow-hidden"
              style={{
                animationDelay: `${index * 50}ms`
              }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              
              <div className="relative z-10">
                {/* Stock Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="backdrop-blur-xl bg-white/5 px-4 py-2 rounded-full border border-white/10 group-hover:border-white/20 transition-all">
                    <span className="text-white/80 text-sm font-medium tracking-wide">{stock.symbol}</span>
                  </div>
                  <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${getTrendColor(stock.trend)} transition-all duration-300`}>
                    {getTrendIcon(stock.trend)}
                    <span className="ml-1">
                      {stock.trend === "UP 🔼" ? "Bull" : stock.trend === "DOWN 🔽" ? "Bear" : "Flat"}
                    </span>
                  </div>
                </div>

                {/* Company Name */}
                <h2 className="text-white text-xl font-medium mb-6 group-hover:text-white/90 transition-colors line-clamp-2 leading-tight">
                  {stock.name}
                </h2>

                {/* Price Information */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/50 text-sm font-light">Baseline</span>
                    <span className="text-white/70 font-medium">₹{stock.baseline}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-white/50 text-sm font-light">Current Price</span>
                    <div className="flex items-center space-x-2">
                     
                      <span className="text-white text-lg font-semibold">₹{stock.current}</span>
                    </div>
                  </div>

                  {/* Enhanced Change Information */}
                  <div className="backdrop-blur-xl bg-white/[0.02] rounded-xl p-4 border border-white/5 group-hover:border-white/10 transition-all">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/50 text-sm font-light">Performance</span>
                      <span className={`text-sm font-medium ${
                        stock.trend === "UP 🔼" ? "text-emerald-400" :
                        stock.trend === "DOWN 🔽" ? "text-red-400" : "text-white/60"
                      }`}>
                        {stock.change_pct}
                      </span>
                    </div>
                    <div className={`text-xl font-semibold flex items-center space-x-2 ${
                      stock.trend === "UP 🔼" ? "text-emerald-400" :
                      stock.trend === "DOWN 🔽" ? "text-red-400" : "text-white/60"
                    }`}>
                      {getTrendIcon(stock.trend)}
                      <span>{stock.abs_change}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Footer */}
        <div className="mt-16 text-center">
          <div className="backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-2xl p-6 inline-flex items-center space-x-4 shadow-xl hover:bg-white/[0.03] transition-all duration-300">
            <Clock className="w-5 h-5 text-white/40" />
            <div>
              <p className="text-white/60 text-sm font-light">
                Last updated: <span className="font-medium">{new Date().toLocaleTimeString()}</span>
              </p>
              <p className="text-white/30 text-xs mt-1">Data refreshes automatically</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
