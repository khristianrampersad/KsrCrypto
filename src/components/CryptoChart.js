import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function CryptoChart({ symbol, name }) {
  const [timeframe, setTimeframe] = useState('7d');
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Generate mock historical data since CoinMarketCap historical data requires a higher tier
  const generateMockData = (days) => {
    const data = [];
    const labels = [];
    const now = new Date();
    
    // Base price (mock current price)
    let basePrice = Math.random() * 50000 + 1000;
    
    for (let i = days; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      // Generate realistic price movement
      const volatility = 0.05; // 5% daily volatility
      const change = (Math.random() - 0.5) * 2 * volatility;
      basePrice = basePrice * (1 + change);
      
      data.push(basePrice);
      
      if (days <= 7) {
        labels.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
      } else if (days <= 30) {
        labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
      } else {
        labels.push(date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }));
      }
    }
    
    return { data, labels };
  };

  useEffect(() => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const days = timeframe === '24h' ? 1 : 
                   timeframe === '7d' ? 7 : 
                   timeframe === '30d' ? 30 : 
                   timeframe === '90d' ? 90 : 365;
      
      const mockData = generateMockData(days);
      
      const isPositive = mockData.data[mockData.data.length - 1] > mockData.data[0];
      
      setChartData({
        labels: mockData.labels,
        datasets: [
          {
            label: `${symbol} Price`,
            data: mockData.data,
            borderColor: isPositive ? '#4ade80' : '#f87171',
            backgroundColor: isPositive ? 'rgba(74, 222, 128, 0.1)' : 'rgba(248, 113, 113, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: isPositive ? '#4ade80' : '#f87171',
            pointHoverBorderColor: '#ffffff',
            pointHoverBorderWidth: 2,
          }
        ]
      });
      setLoading(false);
    }, 500);
  }, [symbol, timeframe]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: '#252526',
        titleColor: '#cccccc',
        bodyColor: '#cccccc',
        borderColor: '#3e3e42',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `$${context.parsed.y.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}`;
          }
        }
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          color: '#94a3b8',
          font: {
            size: 12,
          },
        },
      },
      y: {
        display: true,
        position: 'right',
        grid: {
          color: '#3e3e42',
          drawBorder: false,
        },
        ticks: {
          color: '#94a3b8',
          font: {
            size: 12,
          },
          callback: function(value) {
            return '$' + value.toLocaleString('en-US', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            });
          }
        },
      },
    },
    elements: {
      point: {
        hoverRadius: 8,
      },
    },
  };

  const timeframes = [
    { label: '24H', value: '24h' },
    { label: '7D', value: '7d' },
    { label: '30D', value: '30d' },
    { label: '90D', value: '90d' },
    { label: '1Y', value: '1y' },
  ];

  return (
    <div className="w-full">
      {/* Timeframe Selector */}
      <div className="flex space-x-2 mb-6">
        {timeframes.map((tf) => (
          <button
            key={tf.value}
            onClick={() => setTimeframe(tf.value)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
              timeframe === tf.value
                ? 'bg-cursor-accent text-white'
                : 'bg-cursor-bg text-gray-400 hover:text-cursor-text'
            }`}
          >
            {tf.label}
          </button>
        ))}
      </div>

      {/* Chart Container */}
      <div className="relative h-80">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cursor-accent"></div>
          </div>
        ) : chartData ? (
          <Line data={chartData} options={options} />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            No data available
          </div>
        )}
      </div>

      {/* Chart Info */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div>
          <div className="text-gray-400">24h High</div>
          <div className="text-cursor-text font-semibold">
            ${chartData ? Math.max(...chartData.datasets[0].data).toLocaleString() : '--'}
          </div>
        </div>
        <div>
          <div className="text-gray-400">24h Low</div>
          <div className="text-cursor-text font-semibold">
            ${chartData ? Math.min(...chartData.datasets[0].data).toLocaleString() : '--'}
          </div>
        </div>
        <div>
          <div className="text-gray-400">Volume</div>
          <div className="text-cursor-text font-semibold">
            ${(Math.random() * 1000000000).toLocaleString('en-US', { maximumFractionDigits: 0 })}
          </div>
        </div>
        <div>
          <div className="text-gray-400">Market Cap</div>
          <div className="text-cursor-text font-semibold">
            ${(Math.random() * 100000000000).toLocaleString('en-US', { maximumFractionDigits: 0 })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CryptoChart; 