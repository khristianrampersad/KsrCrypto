import axios from 'axios';

const API_KEY = '752e52ae-a7de-46a5-8f09-8c67bcfb1a9e';
const BASE_URL = 'https://pro-api.coinmarketcap.com/v1';

// Create axios instance with default headers
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-CMC_PRO_API_KEY': API_KEY,
    'Accept': 'application/json',
    'Accept-Encoding': 'deflate, gzip'
  }
});

// Fallback data for when API is not available
const fallbackCryptoData = [
  {
    id: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    quote: {
      USD: {
        price: 43250.00,
        percent_change_24h: 2.5,
        percent_change_7d: 8.2,
        market_cap: 847500000000,
        volume_24h: 15200000000
      }
    }
  },
  {
    id: 1027,
    name: 'Ethereum',
    symbol: 'ETH',
    quote: {
      USD: {
        price: 2650.00,
        percent_change_24h: 3.8,
        percent_change_7d: 12.1,
        market_cap: 318600000000,
        volume_24h: 8500000000
      }
    }
  },
  {
    id: 825,
    name: 'Tether',
    symbol: 'USDT',
    quote: {
      USD: {
        price: 1.00,
        percent_change_24h: 0.01,
        percent_change_7d: -0.02,
        market_cap: 91200000000,
        volume_24h: 24800000000
      }
    }
  },
  {
    id: 1839,
    name: 'BNB',
    symbol: 'BNB',
    quote: {
      USD: {
        price: 315.50,
        percent_change_24h: 1.8,
        percent_change_7d: 5.4,
        market_cap: 47300000000,
        volume_24h: 890000000
      }
    }
  },
  {
    id: 5426,
    name: 'Solana',
    symbol: 'SOL',
    quote: {
      USD: {
        price: 98.50,
        percent_change_24h: 7.1,
        percent_change_7d: 15.8,
        market_cap: 43200000000,
        volume_24h: 1200000000
      }
    }
  },
  {
    id: 52,
    name: 'XRP',
    symbol: 'XRP',
    quote: {
      USD: {
        price: 0.62,
        percent_change_24h: -1.2,
        percent_change_7d: 3.8,
        market_cap: 33800000000,
        volume_24h: 1100000000
      }
    }
  },
  {
    id: 3408,
    name: 'USD Coin',
    symbol: 'USDC',
    quote: {
      USD: {
        price: 1.00,
        percent_change_24h: 0.00,
        percent_change_7d: 0.01,
        market_cap: 25100000000,
        volume_24h: 3200000000
      }
    }
  },
  {
    id: 2010,
    name: 'Cardano',
    symbol: 'ADA',
    quote: {
      USD: {
        price: 0.45,
        percent_change_24h: -1.2,
        percent_change_7d: 2.1,
        market_cap: 15800000000,
        volume_24h: 320000000
      }
    }
  },
  {
    id: 74,
    name: 'Dogecoin',
    symbol: 'DOGE',
    quote: {
      USD: {
        price: 0.085,
        percent_change_24h: 4.2,
        percent_change_7d: 8.9,
        market_cap: 12100000000,
        volume_24h: 580000000
      }
    }
  },
  {
    id: 5805,
    name: 'Avalanche',
    symbol: 'AVAX',
    quote: {
      USD: {
        price: 38.50,
        percent_change_24h: 2.8,
        percent_change_7d: 11.2,
        market_cap: 14200000000,
        volume_24h: 420000000
      }
    }
  }
];

// Get latest cryptocurrency listings
export const getLatestListings = async (limit = 100) => {
  try {
    const response = await api.get('/cryptocurrency/listings/latest', {
      params: {
        start: 1,
        limit: limit,
        convert: 'USD'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching latest listings, using fallback data:', error);
    // Return fallback data when API fails
    return {
      data: fallbackCryptoData.slice(0, Math.min(limit, fallbackCryptoData.length))
    };
  }
};

// Get specific cryptocurrency quotes
export const getCryptocurrencyQuotes = async (symbols) => {
  try {
    const response = await api.get('/cryptocurrency/quotes/latest', {
      params: {
        symbol: symbols.join(','),
        convert: 'USD'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching cryptocurrency quotes:', error);
    // Return fallback data for requested symbols
    const requestedData = {};
    symbols.forEach(symbol => {
      const crypto = fallbackCryptoData.find(c => c.symbol === symbol);
      if (crypto) {
        requestedData[symbol] = crypto;
      }
    });
    return { data: requestedData };
  }
};

// Get cryptocurrency metadata
export const getCryptocurrencyInfo = async (symbols) => {
  try {
    const response = await api.get('/cryptocurrency/info', {
      params: {
        symbol: symbols.join(',')
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching cryptocurrency info:', error);
    throw error;
  }
};

// Get historical data (OHLCV)
export const getHistoricalData = async (symbol, timeStart, timeEnd) => {
  try {
    const response = await api.get('/cryptocurrency/quotes/historical', {
      params: {
        symbol: symbol,
        time_start: timeStart,
        time_end: timeEnd,
        interval: '1d',
        convert: 'USD'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching historical data:', error);
    throw error;
  }
};

// Get global market metrics
export const getGlobalMetrics = async () => {
  try {
    const response = await api.get('/global-metrics/quotes/latest');
    return response.data;
  } catch (error) {
    console.error('Error fetching global metrics:', error);
    throw error;
  }
}; 