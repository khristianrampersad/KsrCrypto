# KSRcrypto - Real-time Cryptocurrency Tracking Platform

A modern, professional cryptocurrency tracking platform built with React, Tailwind CSS, and Firebase. Features real-time price data from CoinMarketCap API, user authentication, and beautiful charts.

## 🚀 Features

### Core Features
- **Real-time Cryptocurrency Data** - Live prices and market data from CoinMarketCap API
- **User Authentication** - Secure Firebase authentication with email/password
- **Interactive Charts** - Beautiful price charts with multiple timeframes
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Dark Theme** - Modern dark UI inspired by Cursor's design
- **Kraken-style Price Table** - Professional cryptocurrency price table similar to Kraken's design

### Key Components
- **Advanced Price Charts** - Interactive charts with Chart.js
- **Search & Filtering** - Find cryptocurrencies quickly
- **Real-time Updates** - Live price updates and market data
- **Professional UI** - Clean, modern interface with smooth animations
- **Sortable Price Table** - Sort by price, market cap, 24h/7d changes, and volume

### Future Features (AI-Ready Architecture)
- AI-powered market insights and predictions
- Advanced market analysis tools
- Smart trading recommendations
- Market sentiment analysis

## 🛠️ Tech Stack

- **Frontend**: React 18, Tailwind CSS
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Charts**: Chart.js with react-chartjs-2
- **API**: CoinMarketCap Pro API
- **Icons**: Lucide React
- **Routing**: React Router DOM

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ksrcrypto
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Setup**
   - The Firebase configuration is already included in the project
   - Firebase project: `cryptoproject-a3c37`
   - Authentication and Firestore are pre-configured

4. **CoinMarketCap API**
   - API key is already configured: `752e52ae-a7de-46a5-8f09-8c67bcfb1a9e`
   - The API service is set up in `src/services/coinmarketcap.js`
   - Includes fallback data for when API limits are reached

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Open your browser**
   - Navigate to `http://localhost:3000`
   - The app should load with real-time cryptocurrency data

## 🎨 Design Features

### Color Scheme (Cursor-inspired)
- **Background**: `#1e1e1e` (cursor-bg)
- **Surface**: `#252526` (cursor-surface)
- **Border**: `#3e3e42` (cursor-border)
- **Text**: `#cccccc` (cursor-text)
- **Accent**: `#007acc` (cursor-accent)

### Components
- **Navbar** - Responsive navigation with authentication
- **Hero Section** - Animated landing with floating crypto cards
- **Price Charts** - Interactive charts with timeframe selection
- **Crypto Table** - Professional table design similar to Kraken's prices page

## 📱 Pages

1. **Home** (`/`)
   - Hero section with animated elements
   - Top cryptocurrencies display
   - Feature highlights

2. **Prices** (`/prices`)
   - Real-time cryptocurrency prices in Kraken-style table
   - Interactive price charts
   - Search and filtering
   - Sortable columns (Price, Market Cap, 24h/7d changes, Volume)
   - Click to view detailed charts

3. **Portfolio** (`/portfolio`) - *Requires Authentication*
   - Portfolio overview and analytics
   - Holdings management
   - Performance tracking
   - Asset allocation charts

4. **Authentication**
   - Login (`/login`)
   - Register (`/register`)
   - Firebase integration

## 🔐 Authentication

### Demo Credentials
For testing purposes, you can use:
- **Email**: `demo@ksrcrypto.com`
- **Password**: `demo123456`

### Firebase Configuration
The app uses Firebase for:
- User authentication (email/password)
- User profile management
- Future data storage capabilities

## 📊 API Integration

### CoinMarketCap API
- **Endpoint**: `https://pro-api.coinmarketcap.com/v1`
- **Features Used**:
  - Latest cryptocurrency listings
  - Real-time price quotes
  - Market cap and volume data
  - 24h and 7d price changes

### API Functions
- `getLatestListings()` - Fetch top cryptocurrencies
- `getCryptocurrencyQuotes()` - Get specific crypto prices
- `getCryptocurrencyInfo()` - Fetch crypto metadata
- `getGlobalMetrics()` - Market overview data

### Fallback Data
- Includes fallback cryptocurrency data for when API limits are reached
- Ensures the application continues to function with sample data
- Covers top 10 cryptocurrencies including BTC, ETH, USDT, BNB, SOL, XRP, USDC, ADA, DOGE, AVAX

## 🎯 Key Features Implementation

### Kraken-style Price Table
- Professional table layout with rank, name, price, 24h/7d changes, market cap, and volume
- Sortable columns with visual indicators
- Hover effects and selection highlighting
- Responsive design for mobile devices

### Price Charts
- Multiple timeframes (24H, 7D, 30D, 90D, 1Y)
- Responsive design
- Color-coded positive/negative trends
- Hover tooltips with price data

### Responsive Design
- Mobile-first approach
- Breakpoints: `sm`, `md`, `lg`, `xl`
- Collapsible navigation
- Touch-friendly interactions

## 🚀 Deployment

The app is ready for deployment to platforms like:
- Vercel
- Netlify
- Firebase Hosting
- AWS Amplify

### Build for Production
```bash
npm run build
```

## 🔮 Future Enhancements

### AI Integration (Planned)
- Market sentiment analysis
- Price prediction models
- Advanced market analysis
- Automated trading signals

### Additional Features
- More chart types (candlestick, volume)
- News integration
- Advanced filtering options
- Mobile app (React Native)

## 📄 License

This project is built for educational and demonstration purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For questions or support, please open an issue in the repository.

---

**Built with ❤️ using React, Tailwind CSS, and Firebase** 