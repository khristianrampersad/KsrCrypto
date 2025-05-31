import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Plus, TrendingUp, TrendingDown, DollarSign, PieChart, BarChart3 } from 'lucide-react';

function Portfolio() {
  const { currentUser } = useAuth();
  const [portfolioData, setPortfolioData] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [totalChange, setTotalChange] = useState(0);
  const [loading, setLoading] = useState(true);

  // Mock portfolio data - in a real app, this would come from Firestore
  useEffect(() => {
    if (currentUser) {
      // Simulate loading portfolio data
      setTimeout(() => {
        const mockPortfolio = [
          {
            id: 1,
            symbol: 'BTC',
            name: 'Bitcoin',
            amount: 0.5,
            avgPrice: 42000,
            currentPrice: 43250,
            value: 21625,
            change24h: 5.2,
            allocation: 45.2
          },
          {
            id: 2,
            symbol: 'ETH',
            name: 'Ethereum',
            amount: 8,
            avgPrice: 2500,
            currentPrice: 2650,
            value: 21200,
            change24h: 3.8,
            allocation: 44.3
          },
          {
            id: 3,
            symbol: 'ADA',
            name: 'Cardano',
            amount: 10000,
            avgPrice: 0.48,
            currentPrice: 0.45,
            value: 4500,
            change24h: -1.2,
            allocation: 9.4
          },
          {
            id: 4,
            symbol: 'SOL',
            name: 'Solana',
            amount: 5,
            avgPrice: 95,
            currentPrice: 98.5,
            value: 492.5,
            change24h: 7.1,
            allocation: 1.1
          }
        ];

        setPortfolioData(mockPortfolio);
        
        const total = mockPortfolio.reduce((sum, item) => sum + item.value, 0);
        setTotalValue(total);
        
        const totalCost = mockPortfolio.reduce((sum, item) => sum + (item.amount * item.avgPrice), 0);
        const change = ((total - totalCost) / totalCost) * 100;
        setTotalChange(change);
        
        setLoading(false);
      }, 1000);
    }
  }, [currentUser]);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const formatPercentage = (percentage) => {
    return `${percentage > 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cursor-bg pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-cursor-border rounded mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-cursor-border rounded"></div>
              ))}
            </div>
            <div className="h-96 bg-cursor-border rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cursor-bg pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-cursor-text mb-2">
            Portfolio
          </h1>
          <p className="text-gray-400">
            Track your cryptocurrency investments and performance
          </p>
        </div>

        {/* Portfolio Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Value */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-cursor-text">Total Value</h3>
              <DollarSign className="h-6 w-6 text-cursor-accent" />
            </div>
            <div className="text-3xl font-bold text-cursor-text mb-2">
              {formatCurrency(totalValue)}
            </div>
            <div className={`flex items-center text-sm ${
              totalChange >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {totalChange >= 0 ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              {formatPercentage(totalChange)} All Time
            </div>
          </div>

          {/* Best Performer */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-cursor-text">Best Performer</h3>
              <TrendingUp className="h-6 w-6 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-cursor-text mb-1">
              SOL
            </div>
            <div className="text-green-400 text-sm font-medium">
              +7.1% (24h)
            </div>
          </div>

          {/* Total Assets */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-cursor-text">Total Assets</h3>
              <PieChart className="h-6 w-6 text-cursor-accent" />
            </div>
            <div className="text-3xl font-bold text-cursor-text mb-2">
              {portfolioData.length}
            </div>
            <div className="text-gray-400 text-sm">
              Cryptocurrencies
            </div>
          </div>
        </div>

        {/* Portfolio Holdings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Holdings List */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-cursor-text">Holdings</h2>
                <button className="btn-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Asset
                </button>
              </div>

              <div className="space-y-4">
                {/* Table Header */}
                <div className="grid grid-cols-6 gap-4 p-4 bg-cursor-bg rounded-lg text-sm text-gray-400 font-medium">
                  <div className="col-span-2">Asset</div>
                  <div className="text-right">Holdings</div>
                  <div className="text-right">Avg Price</div>
                  <div className="text-right">Current Price</div>
                  <div className="text-right">P&L</div>
                </div>

                {/* Holdings */}
                {portfolioData.map((asset) => {
                  const pnl = ((asset.currentPrice - asset.avgPrice) / asset.avgPrice) * 100;
                  
                  return (
                    <div key={asset.id} className="grid grid-cols-6 gap-4 p-4 bg-cursor-bg rounded-lg hover:bg-cursor-surface/50 transition-colors">
                      <div className="col-span-2 flex items-center space-x-3">
                        <div className="w-10 h-10 bg-cursor-accent rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {asset.symbol.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-cursor-text">{asset.symbol}</div>
                          <div className="text-sm text-gray-400">{asset.name}</div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-semibold text-cursor-text">
                          {asset.amount} {asset.symbol}
                        </div>
                        <div className="text-sm text-gray-400">
                          {formatCurrency(asset.value)}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-cursor-text">
                          {formatCurrency(asset.avgPrice)}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-cursor-text">
                          {formatCurrency(asset.currentPrice)}
                        </div>
                        <div className={`text-sm ${
                          asset.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {formatPercentage(asset.change24h)}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`font-semibold ${
                          pnl >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {formatPercentage(pnl)}
                        </div>
                        <div className={`text-sm ${
                          pnl >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {formatCurrency((asset.currentPrice - asset.avgPrice) * asset.amount)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Portfolio Allocation */}
          <div className="space-y-6">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-cursor-text">Allocation</h3>
                <BarChart3 className="h-5 w-5 text-cursor-accent" />
              </div>
              
              <div className="space-y-4">
                {portfolioData.map((asset) => (
                  <div key={asset.id} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-cursor-text font-medium">{asset.symbol}</span>
                      <span className="text-gray-400">{asset.allocation.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-cursor-bg rounded-full h-2">
                      <div 
                        className="bg-cursor-accent h-2 rounded-full transition-all duration-300"
                        style={{ width: `${asset.allocation}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h3 className="text-lg font-bold text-cursor-text mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="btn-primary w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Buy Crypto
                </button>
                <button className="btn-secondary w-full">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Analytics
                </button>
                <button className="btn-secondary w-full">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Rebalance Portfolio
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Portfolio; 