
"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Eye, EyeOff, Briefcase, Target, Shield, ChevronUp, ChevronDown, BarChart3, PieChart, Activity } from "lucide-react";

const MotilalFundLanding: React.FC = () => {
  const [showHoldings, setShowHoldings] = useState(true);
  const [animatedCards, setAnimatedCards] = useState<Set<number>>(new Set());
  
  const holdings: string[] = [
    "Eternal Ltd",
    "Bharat Electronics", 
    "Waaree",
    "CG Power",
    "Siemens",
    "Amber Enterprises",
    "Multi Commodity (MCX)",
    "One97 (Paytm)",
    "Cholamandalam Inv Fin",
    "Samvardhana Motherson",
    "PTC",
    "Suzlon",
    "Apar Industries",
    "Bajaj Finance",
    "Prestige",
    "GE Power India",
    "Hindustan Aeronautics",
    "OneSource Pharma",
    "Bharat Dynamics",
    "Trent",
    "Kaynes",
    "Zen Technologies", 
    "Muthoot Finance",
    "Inox Wind",
    "Dixon",
    "Gujarat Fluorochem",
    "Religare",
    "V2 Retail",
    "Angel One",
    "PB Fintech",
    "Kalyan Jewellers",
    "K.P.R. Mills",
    "TVS Motors",
  ];

  const fundStats = [
    { label: "AUM", value: "₹2,847 Cr", icon: <Briefcase className="w-5 h-5" />, trend: "up" },
    { label: "NAV", value: "₹88.45", icon: <BarChart3 className="w-5 h-5" />, trend: "up" },
    { label: "1Y Return", value: "24.8%", icon: <TrendingUp className="w-5 h-5" />, trend: "up" },
    { label: "Expense Ratio", value: "0.45%", icon: <PieChart className="w-5 h-5" />, trend: "stable" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedCards(new Set([0, 1, 2, 3]));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleCardHover = (index: number) => {
    setAnimatedCards(prev => new Set([...prev, index]));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gray-300 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-gray-400 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Hero Section with Glassmorphism */}
      <section className="relative px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-white/20 backdrop-blur-sm">
                <Activity className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Motilal Oswal Large & Midcap Fund
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl opacity-80 leading-relaxed">
              Direct Growth Plan – Invest in a diversified portfolio of large and
              midcap companies with long-term growth potential.
            </p>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
              {fundStats.map((stat, index) => (
                <div
                  key={index}
                  className={`backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 transform transition-all duration-700 hover:scale-105 hover:bg-white/15 ${
                    animatedCards.has(index) ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-gray-300">{stat.icon}</div>
                    {stat.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-400" />}
                    {stat.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-400" />}
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About the Fund */}
      <section className="px-6 py-16 max-w-5xl mx-auto relative">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white">About the Fund</h2>
          </div>
          <p className="text-gray-300 leading-relaxed text-lg">
            The Motilal Oswal Large & Midcap Fund (Direct Growth) is an equity
            scheme investing in both large-cap and mid-cap companies. The fund
            seeks to provide long-term capital appreciation by focusing on high
            quality businesses with sustainable growth potential and strong fundamentals.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6">
              <Shield className="w-8 h-8 text-blue-400 mb-3" />
              <h3 className="font-semibold text-white mb-2">Risk Management</h3>
              <p className="text-gray-300 text-sm">Diversified portfolio across sectors and market caps</p>
            </div>
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6">
              <TrendingUp className="w-8 h-8 text-green-400 mb-3" />
              <h3 className="font-semibold text-white mb-2">Growth Focus</h3>
              <p className="text-gray-300 text-sm">Targeting companies with sustainable competitive advantages</p>
            </div>
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6">
              <BarChart3 className="w-8 h-8 text-purple-400 mb-3" />
              <h3 className="font-semibold text-white mb-2">Performance</h3>
              <p className="text-gray-300 text-sm">Consistent long-term wealth creation strategy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Holdings Section */}
      <section className="px-6 py-16 max-w-6xl mx-auto relative">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">Current Holdings</h2>
              <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-gray-200">
                {holdings.length} stocks
              </div>
            </div>
            <button
              onClick={() => setShowHoldings(!showHoldings)}
              className="flex items-center gap-2 px-4 py-2 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300"
            >
              {showHoldings ? (
                <>
                  <EyeOff className="w-4 h-4" />
                  Hide
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  Show
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {showHoldings && (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {holdings.map((stock: string, index: number) => (
                <div
                  key={index}
                  className="group backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 text-center transform transition-all duration-500 hover:scale-105 hover:bg-white/20 hover:shadow-2xl cursor-pointer"
                  onMouseEnter={() => handleCardHover(index)}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: `fadeInUp 0.6s ease-out forwards ${index * 50}ms`,
                    opacity: 0,
                    transform: 'translateY(20px)'
                  }}
                >
                  <div className="text-white font-medium group-hover:text-gray-100 transition-colors duration-300">
                    {stock}
                  </div>
                  <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Disclaimer */}
      <footer className="px-6 py-12 max-w-4xl mx-auto text-center relative">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
          <div className="flex justify-center mb-4">
            <Shield className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Mutual Fund investments are subject to market risks. Please read the
            scheme information document carefully before investing. Past performance
            is not indicative of future results.
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default MotilalFundLanding;