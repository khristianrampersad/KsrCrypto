import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, TrendingDown, Filter } from 'lucide-react';
import { getLatestListings } from '../services/coinmarketcap';
import CryptoChart from '../components/CryptoChart';

function Prices() {
  const [cryptos, setCryptos] = useState([]);
  const [filteredCryptos, setFilteredCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [sortBy, setSortBy] = useState('market_cap');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const data = await getLatestListings(50);
        setCryptos(data.data);
        setFilteredCryptos(data.data);
        setSelectedCrypto(data.data[0]); // Select Bitcoin by default
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptos();
  }, []);

  useEffect(() => {
    let filtered = cryptos.filter(crypto =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort the filtered results
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'price':
          aValue = a.quote.USD.price;
          bValue = b.quote.USD.price;
          break;
        case 'change_24h':
          aValue = a.quote.USD.percent_change_24h;
          bValue = b.quote.USD.percent_change_24h;
          break;
        case 'change_7d':
          aValue = a.quote.USD.percent_change_7d || 0;
          bValue = b.quote.USD.percent_change_7d || 0;
          break;
        case 'volume':
          aValue = a.quote.USD.volume_24h || 0;
          bValue = b.quote.USD.volume_24h || 0;
          break;
        case 'market_cap':
        default:
          aValue = a.quote.USD.market_cap;
          bValue = b.quote.USD.market_cap;
          break;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredCryptos(filtered);
  }, [searchTerm, cryptos, sortBy, sortOrder]);

  const formatPrice = (price) => {
    if (price < 0.01) {
      return `$${price.toFixed(6)}`;
    } else if (price < 1) {
      return `$${price.toFixed(4)}`;
    } else {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(price);
    }
  };

  const formatMarketCap = (marketCap) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`;
    } else if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`;
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`;
    } else {
      return `$${marketCap.toFixed(2)}`;
    }
  };

  const formatVolume = (volume) => {
    if (volume >= 1e9) {
      return `$${(volume / 1e9).toFixed(2)}B`;
    } else if (volume >= 1e6) {
      return `$${(volume / 1e6).toFixed(2)}M`;
    } else if (volume >= 1e3) {
      return `$${(volume / 1e3).toFixed(2)}K`;
    } else {
      return `$${volume.toFixed(2)}`;
    }
  };

  const formatPercentage = (percentage) => {
    if (percentage === null || percentage === undefined) return 'N/A';
    return `${percentage > 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cursor-bg pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-cursor-border rounded mb-8"></div>
            <div className="h-96 bg-cursor-border rounded mb-8"></div>
            <div className="h-64 bg-cursor-border rounded"></div>
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
          <h1 className="text-3xl font-bold text-cursor-text mb-4">
            Cryptocurrency Prices
          </h1>
          <p className="text-gray-400">
            Real-time prices for the top cryptocurrencies by market cap
          </p>
        </div>

        {/* Chart Section */}
        {selectedCrypto && (
          <div className="mb-8">
            <div className="card">
              <div className="mb-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-cursor-accent rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {selectedCrypto.symbol.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-cursor-text">
                      {selectedCrypto.name} ({selectedCrypto.symbol})
                    </h2>
                    <div className="flex items-center space-x-4">
                      <span className="text-3xl font-bold text-cursor-text">
                        {formatPrice(selectedCrypto.quote.USD.price)}
                      </span>
                      <span className={`text-xl font-medium flex items-center ${
                        selectedCrypto.quote.USD.percent_change_24h > 0 ? 'price-positive' : 'price-negative'
                      }`}>
                        {selectedCrypto.quote.USD.percent_change_24h > 0 ? (
                          <TrendingUp className="h-5 w-5 mr-1" />
                        ) : (
                          <TrendingDown className="h-5 w-5 mr-1" />
                        )}
                        {formatPercentage(selectedCrypto.quote.USD.percent_change_24h)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <CryptoChart 
                symbol={selectedCrypto.symbol}
                name={selectedCrypto.name}
              />
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search cryptocurrencies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10 w-full"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field"
            >
              <option value="market_cap">Market Cap</option>
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="change_24h">24h Change</option>
              <option value="change_7d">7d Change</option>
              <option value="volume">Volume</option>
            </select>
          </div>
        </div>

        {/* Crypto Table */}
        <div className="card p-0 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-4 bg-cursor-bg border-b border-cursor-border text-sm text-gray-400 font-medium">
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-3">
              <button 
                onClick={() => handleSort('name')}
                className="text-left hover:text-cursor-accent transition-colors flex items-center"
              >
                Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
            </div>
            <div className="col-span-2 text-right">
              <button 
                onClick={() => handleSort('price')}
                className="hover:text-cursor-accent transition-colors"
              >
                Price {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
            </div>
            <div className="col-span-2 text-right">
              <button 
                onClick={() => handleSort('change_24h')}
                className="hover:text-cursor-accent transition-colors"
              >
                24h % {sortBy === 'change_24h' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
            </div>
            <div className="col-span-2 text-right">
              <button 
                onClick={() => handleSort('change_7d')}
                className="hover:text-cursor-accent transition-colors"
              >
                7d % {sortBy === 'change_7d' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
            </div>
            <div className="col-span-2 text-right">
              <button 
                onClick={() => handleSort('market_cap')}
                className="hover:text-cursor-accent transition-colors"
              >
                Market Cap {sortBy === 'market_cap' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
            </div>
          </div>

          {/* Table Body */}
          <div className="max-h-96 overflow-y-auto scrollbar-hide">
            {filteredCryptos.map((crypto, index) => (
              <div
                key={crypto.id}
                onClick={() => setSelectedCrypto(crypto)}
                className={`grid grid-cols-12 gap-4 p-4 border-b border-cursor-border/30 cursor-pointer transition-all duration-200 hover:bg-cursor-surface/50 ${
                  selectedCrypto?.id === crypto.id ? 'bg-cursor-accent/10' : ''
                }`}
              >
                {/* Rank */}
                <div className="col-span-1 text-center text-gray-400 text-sm">
                  {index + 1}
                </div>
                
                {/* Name & Symbol */}
                <div className="col-span-3 flex items-center space-x-3">
                  <div className="w-8 h-8 bg-cursor-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">
                      {crypto.symbol.charAt(0)}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-cursor-text truncate">{crypto.name}</div>
                    <div className="text-sm text-gray-400">{crypto.symbol}</div>
                  </div>
                </div>
                
                {/* Price */}
                <div className="col-span-2 text-right">
                  <div className="font-semibold text-cursor-text">
                    {formatPrice(crypto.quote.USD.price)}
                  </div>
                </div>
                
                {/* 24h Change */}
                <div className="col-span-2 text-right">
                  <div className={`font-medium flex items-center justify-end ${
                    crypto.quote.USD.percent_change_24h > 0 ? 'price-positive' : 'price-negative'
                  }`}>
                    {crypto.quote.USD.percent_change_24h > 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {formatPercentage(crypto.quote.USD.percent_change_24h)}
                  </div>
                </div>
                
                {/* 7d Change */}
                <div className="col-span-2 text-right">
                  <div className={`font-medium ${
                    (crypto.quote.USD.percent_change_7d || 0) > 0 ? 'price-positive' : 'price-negative'
                  }`}>
                    {formatPercentage(crypto.quote.USD.percent_change_7d)}
                  </div>
                </div>
                
                {/* Market Cap */}
                <div className="col-span-2 text-right">
                  <div className="text-cursor-text">
                    {formatMarketCap(crypto.quote.USD.market_cap)}
                  </div>
                  <div className="text-xs text-gray-400">
                    Vol: {formatVolume(crypto.quote.USD.volume_24h || 0)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredCryptos.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-400">No cryptocurrencies found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Prices;