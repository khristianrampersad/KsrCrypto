import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, ArrowRight, Shield, Zap } from 'lucide-react';
import { getLatestListings } from '../services/coinmarketcap';

function Home() {
  const [topCryptos, setTopCryptos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopCryptos = async () => {
      try {
        const data = await getLatestListings(10);
        setTopCryptos(data.data);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopCryptos();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    }).format(price);
  };

  const formatPercentage = (percentage) => {
    return `${percentage > 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  };

  return (
    <div className="min-h-screen bg-cursor-bg">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-gradient">Track Crypto</span>
              <br />
              <span className="text-cursor-text">Like a Pro</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
              Real-time cryptocurrency prices, advanced charts, and market analysis. 
              Stay ahead of the market with professional-grade tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/prices" className="btn-primary text-lg px-8 py-3">
                View Prices
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/register" className="btn-secondary text-lg px-8 py-3">
                Get Started
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating crypto cards */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 animate-pulse-slow">
            <div className="bg-cursor-surface/20 backdrop-blur-sm border border-cursor-border/30 rounded-lg p-4">
              <div className="text-cursor-accent font-bold">BTC</div>
              <div className="text-green-400">+5.2%</div>
            </div>
          </div>
          <div className="absolute top-40 right-20 animate-pulse-slow" style={{ animationDelay: '1s' }}>
            <div className="bg-cursor-surface/20 backdrop-blur-sm border border-cursor-border/30 rounded-lg p-4">
              <div className="text-cursor-accent font-bold">ETH</div>
              <div className="text-green-400">+3.8%</div>
            </div>
          </div>
          <div className="absolute bottom-40 left-20 animate-pulse-slow" style={{ animationDelay: '2s' }}>
            <div className="bg-cursor-surface/20 backdrop-blur-sm border border-cursor-border/30 rounded-lg p-4">
              <div className="text-cursor-accent font-bold">ADA</div>
              <div className="text-red-400">-1.2%</div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Cryptocurrencies */}
      <section className="py-16 bg-cursor-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-cursor-text mb-4">
              Top Cryptocurrencies
            </h2>
            <p className="text-gray-400">
              Track the performance of the most popular digital assets
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="crypto-card animate-pulse">
                  <div className="h-6 bg-cursor-border rounded mb-2"></div>
                  <div className="h-4 bg-cursor-border rounded mb-2"></div>
                  <div className="h-4 bg-cursor-border rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {topCryptos.map((crypto) => (
                <div key={crypto.id} className="crypto-card">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-cursor-accent rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">
                        {crypto.symbol.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-bold text-cursor-text">{crypto.symbol}</div>
                      <div className="text-sm text-gray-400">{crypto.name}</div>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-cursor-text mb-1">
                    {formatPrice(crypto.quote.USD.price)}
                  </div>
                  <div className={`text-sm font-medium ${
                    crypto.quote.USD.percent_change_24h > 0 ? 'price-positive' : 'price-negative'
                  }`}>
                    {formatPercentage(crypto.quote.USD.percent_change_24h)}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Link to="/prices" className="btn-primary">
              View All Prices
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-cursor-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-cursor-text mb-4">
              Why Choose KSRcrypto?
            </h2>
            <p className="text-gray-400">
              Professional tools for serious crypto investors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-cursor-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-cursor-accent" />
              </div>
              <h3 className="text-xl font-bold text-cursor-text mb-2">Real-time Data</h3>
              <p className="text-gray-400">
                Get live cryptocurrency prices and market data updated every second
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-cursor-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-cursor-accent" />
              </div>
              <h3 className="text-xl font-bold text-cursor-text mb-2">Secure & Reliable</h3>
              <p className="text-gray-400">
                Bank-grade security with Firebase authentication and encrypted data
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-cursor-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-cursor-accent" />
              </div>
              <h3 className="text-xl font-bold text-cursor-text mb-2">Advanced Analytics</h3>
              <p className="text-gray-400">
                Professional charts and market analysis tools for informed decisions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-cursor-surface">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-cursor-text mb-4">
            Ready to Start Tracking?
          </h2>
          <p className="text-gray-400 mb-8">
            Join thousands of traders who trust KSRcrypto for their market analysis
          </p>
          <Link to="/register" className="btn-primary text-lg px-8 py-3">
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home; 