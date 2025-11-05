# 🚀 Crypto Dashboard - AI-Powered Build Challenge

<div align="center">

![Crypto Dashboard](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Python](https://img.shields.io/badge/Python-3.11-yellow?style=for-the-badge&logo=python)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Real-time cryptocurrency price tracker featuring Vanar Chain (VANRY/USDT)**

[Live Demo](https://crypto-dashboard-waur.vercel.app) • [API Docs](https://crypto-dashboard-70ff.onrender.com/docs) • [GitHub](https://github.com/SaadADMalik/crypto-dashboard)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [AI Development](#-ai-development)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**Crypto Dashboard** is a modern, full-stack web application that provides real-time cryptocurrency market data with a special focus on **Vanar Chain (VANRY/USDT)**. Built as part of an AI-assisted development challenge, this project demonstrates the power of combining AI tools with traditional software engineering.

### Key Highlights

- 🌟 **Vanar Chain Featured** - Prominently displays VANRY/USDT with special badge
- 📊 **Real-time Data** - Live prices updated every 30 seconds via CoinGecko API
- 📈 **Interactive Charts** - 7-day price history with Recharts
- 🎨 **Modern UI** - Professional dark-themed interface with Tailwind CSS
- 🌓 **Dark Mode** - Seamless light/dark theme switching
- 📱 **Responsive** - Fully mobile-optimized design
- ⚡ **Fast** - Edge-deployed frontend on Vercel CDN

---

## 🌐 Live Demo

### **Production URLs**

| Service | URL | Description |
|---------|-----|-------------|
| 🎨 **Frontend** | [crypto-dashboard-waur.vercel.app](https://crypto-dashboard-waur.vercel.app) | Production web app |
| 📡 **Backend API** | [crypto-dashboard-70ff.onrender.com](https://crypto-dashboard-70ff.onrender.com) | RESTful API |
| 📚 **API Docs** | [/docs](https://crypto-dashboard-70ff.onrender.com/docs) | Interactive API documentation |
| 🔄 **Health Check** | [/health](https://crypto-dashboard-70ff.onrender.com/health) | Service status |

### ⚠️ Important Note for Testing

**The backend is deployed on Render's free tier, which sleeps after 15 minutes of inactivity.**

**If you see "Loading markets..." for more than 10 seconds on first visit:**
1. The backend is waking up from sleep (takes 30-60 seconds)
2. Wait 60 seconds, then refresh the page
3. Subsequent loads will be instant

**To avoid this:** I've set up [UptimeRobot](https://uptimerobot.com/) monitoring to keep the backend active during evaluation periods.

---

## ✨ Features

### Core Functionality

- ✅ **Real-time Price Tracking**
  - Live cryptocurrency prices from CoinGecko API
  - Auto-refresh every 30 seconds
  - Support for 50+ cryptocurrencies

- ✅ **Vanar Chain (VANRY/USDT) Prominence**
  - Featured at top of coin list with ⭐ badge
  - Dedicated styling and visibility
  - Real-time USDT trading pair data

- ✅ **Interactive 7-Day Charts**
  - Price history visualization using Recharts
  - Responsive and touch-friendly
  - Tooltips with detailed data points

- ✅ **Advanced Search & Filtering**
  - Real-time search by coin name or symbol
  - Sort by: Price, Market Cap, Volume, 24h Change
  - Instant results with debounced search

- ✅ **Coin Detail Pages**
  - Comprehensive coin information
  - Current price with 24h change percentage
  - Market cap, trading volume, circulating supply
  - Historical price chart

### UI/UX Features

- 🎨 **Professional Dark Theme**
  - Carefully crafted color palette
  - Smooth animations and transitions
  - Glassmorphism effects

- 🌓 **Theme Toggle**
  - Instant light/dark mode switching
  - Persistent preference (localStorage)
  - System preference detection

- 📱 **Fully Responsive**
  - Mobile-first design approach
  - Optimized for all screen sizes
  - Touch-friendly interactions

- ⚡ **Performance Optimized**
  - Next.js 16 with Turbopack
  - React Query for efficient data fetching
  - Edge-deployed on Vercel CDN
  - Lazy loading and code splitting

---

## 🛠️ Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| [Next.js](https://nextjs.org/) | 16.0.1 | React framework with SSR/SSG |
| [React](https://react.dev/) | 19.0 | UI library |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Type-safe JavaScript |
| [Tailwind CSS](https://tailwindcss.com/) | 3.x | Utility-first CSS framework |
| [Shadcn UI](https://ui.shadcn.com/) | Latest | Component library |
| [Recharts](https://recharts.org/) | 2.x | Chart visualization |
| [React Query](https://tanstack.com/query) | 5.x | Data fetching & caching |
| [Axios](https://axios-http.com/) | 1.x | HTTP client |
| [Lucide React](https://lucide.dev/) | Latest | Icon library |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| [FastAPI](https://fastapi.tiangolo.com/) | 0.115.0 | Modern Python web framework |
| [Python](https://www.python.org/) | 3.11.9 | Programming language |
| [SQLAlchemy](https://www.sqlalchemy.org/) | 2.0.35 | Async ORM |
| [Pydantic](https://docs.pydantic.dev/) | 2.9.2 | Data validation |
| [Uvicorn](https://www.uvicorn.org/) | 0.32.0 | ASGI server |
| [HTTPX](https://www.python-httpx.org/) | 0.27.2 | Async HTTP client |
| [aiosqlite](https://aiosqlite.omnilib.dev/) | 0.20.0 | Async SQLite driver |

### External APIs

- **[CoinGecko API](https://www.coingecko.com/en/api)** - Cryptocurrency market data
- **[Binance WebSocket](https://binance-docs.github.io/)** - Real-time price streams (optional)

### Deployment & DevOps

| Service | Purpose |
|---------|---------|
| [Vercel](https://vercel.com/) | Frontend hosting & CDN |
| [Render](https://render.com/) | Backend API hosting |
| [GitHub Actions](https://github.com/features/actions) | CI/CD pipeline |
| [UptimeRobot](https://uptimerobot.com/) | Uptime monitoring |

---

## 🏗️ Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Production Architecture                   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────┐         ┌──────────────────┐         │
│  │   Vercel (CDN)   │         │   Render.com     │         │
│  │   Frontend       │ ◄─────► │   Backend API    │         │
│  │   Next.js App    │  HTTPS  │   FastAPI        │         │
│  └──────────────────┘  CORS   └──────────────────┘         │
│          │                             │                     │
│   Global Edge Network         ┌───────▼────────┐          │
│   (Auto-scaling)              │  SQLite DB     │          │
│                                │  (Embedded)    │          │
│                                └────────────────┘          │
│                                        │                     │
│                                ┌───────▼────────┐          │
│                                │  CoinGecko API │          │
│                                │  External Data │          │
│                                └────────────────┘          │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

```
User Request → Vercel Edge → Next.js → API Call → Render
                    ↓                                ↓
              SSR/SSG Page                    FastAPI Handler
                    ↓                                ↓
              HTML Response                   Database Query
                    ↓                                ↓
              User Browser ← JSON Response ← CoinGecko API
```

### Why Split Architecture?

| Aspect | Benefit |
|--------|---------|
| **Performance** | Frontend on CDN = Global edge distribution |
| **Scalability** | Independent scaling of frontend and backend |
| **Cost** | Optimized for each platform's free tier ($0/month) |
| **Deployment** | Separate release cycles, faster updates |
| **SEO** | Vercel's edge network optimized for Next.js |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20.x or higher
- **Python** 3.11 or higher
- **Git**
- **npm** or **yarn** or **pnpm**
- **pip** (Python package manager)

### Installation

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/SaadADMalik/crypto-dashboard.git
cd crypto-dashboard
```

#### 2️⃣ Setup Backend

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file (optional)
cp .env.example .env

# Run database migrations (if any)
# python -m alembic upgrade head

# Start the backend server
uvicorn app.main:app --reload --port 8000
```

Backend will be available at: `http://localhost:8000`

**API Documentation:** `http://localhost:8000/docs`

#### 3️⃣ Setup Frontend

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Create environment file
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

# Start the development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

Frontend will be available at: `http://localhost:3000`

### Development Servers

| Service | URL | Command |
|---------|-----|---------|
| Frontend | http://localhost:3000 | `npm run dev` |
| Backend | http://localhost:8000 | `uvicorn app.main:app --reload` |
| API Docs | http://localhost:8000/docs | (auto-generated) |

---

## 📁 Project Structure

```
crypto-dashboard/
├── backend/                      # FastAPI backend
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # FastAPI app entry point
│   │   ├── config.py            # Configuration settings
│   │   ├── database.py          # Database setup
│   │   ├── models/              # SQLAlchemy models
│   │   │   ├── __init__.py
│   │   │   └── coin.py
│   │   ├── routers/             # API route handlers
│   │   │   ├── __init__.py
│   │   │   ├── coins.py         # Coin endpoints
│   │   │   ├── portfolio.py    # Portfolio endpoints
│   │   │   └── websocket.py    # WebSocket endpoints
│   │   ├── schemas/             # Pydantic schemas
│   │   │   ├── __init__.py
│   │   │   └── coin.py
│   │   └── services/            # Business logic
│   │       ├── __init__.py
│   │       └── coingecko.py    # CoinGecko API service
│   ├── requirements.txt         # Python dependencies
│   ├── .env.example            # Environment variables template
│   └── README.md               # Backend documentation
│
├── frontend/                    # Next.js frontend
│   ├── src/
│   │   ├── app/                # App router pages
│   │   │   ├── layout.tsx     # Root layout
│   │   │   ├── page.tsx       # Homepage
│   │   │   └── coins/         # Coins pages
│   │   │       ├── page.tsx   # Coins list
│   │   │       └── [id]/      # Dynamic coin detail
│   │   │           └── page.tsx
│   │   ├── components/         # React components
│   │   │   ├── ui/            # Shadcn UI components
│   │   │   ├── CoinCard.tsx
│   │   │   ├── CoinChart.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   └── ThemeToggle.tsx
│   │   ├── lib/               # Utilities
│   │   │   ├── api.ts         # API client
│   │   │   └── utils.ts       # Helper functions
│   │   └── types/             # TypeScript types
│   │       └── coin.ts
│   ├── public/                # Static assets
│   ├── package.json           # Node dependencies
│   ├── tsconfig.json          # TypeScript config
│   ├── tailwind.config.ts     # Tailwind config
│   ├── next.config.js         # Next.js config
│   ├── .env.local.example     # Environment variables template
│   └── README.md             # Frontend documentation
│
├── .gitignore                 # Git ignore rules
├── README.md                  # This file
├── DEPLOYMENT.md              # Deployment guide
├── AI_DOCUMENTATION.md        # AI development process
└── LICENSE                    # MIT License
```

---

## 📖 API Documentation

### Base URL

- **Production:** `https://crypto-dashboard-70ff.onrender.com`
- **Development:** `http://localhost:8000`

### Endpoints

#### **GET** `/health`
Health check endpoint

**Response:**
```json
{
  "status": "healthy",
  "api": "operational",
  "database": "connected"
}
```

#### **GET** `/api/coins`
Get list of cryptocurrencies

**Query Parameters:**
- `page` (integer, default: 1) - Page number
- `per_page` (integer, default: 50) - Items per page
- `order` (string) - Sort order: `market_cap_desc`, `price_asc`, etc.

**Response:**
```json
[
  {
    "id": "vanar-chain",
    "symbol": "vanry",
    "name": "Vanar Chain",
    "current_price": 0.12345,
    "market_cap": 123456789,
    "market_cap_rank": 150,
    "total_volume": 12345678,
    "price_change_percentage_24h": 5.67,
    "circulating_supply": 1000000000,
    "total_supply": 2000000000,
    "image": "https://...",
    "last_updated": "2025-01-05T12:31:32.000Z"
  }
]
```

#### **GET** `/api/coins/{id}`
Get detailed information for a specific coin

**Path Parameters:**
- `id` (string) - Coin ID (e.g., `bitcoin`, `vanar-chain`)

**Response:**
```json
{
  "id": "vanar-chain",
  "symbol": "vanry",
  "name": "Vanar Chain",
  "current_price": 0.12345,
  "market_data": { ... },
  "sparkline_in_7d": {
    "price": [0.12, 0.13, 0.12, ...]
  }
}
```

#### **GET** `/api/coins/{id}/chart`
Get historical price data for charts

**Path Parameters:**
- `id` (string) - Coin ID

**Query Parameters:**
- `days` (integer, default: 7) - Number of days (1-365)

**Response:**
```json
{
  "prices": [
    [1704499200000, 0.12345],
    [1704585600000, 0.13456],
    ...
  ]
}
```

### Interactive Documentation

Visit the interactive API documentation:
- **Swagger UI:** `https://crypto-dashboard-70ff.onrender.com/docs`
- **ReDoc:** `https://crypto-dashboard-70ff.onrender.com/redoc`

---

## 🚢 Deployment

### Automated Deployment

Both frontend and backend are configured for automatic deployment:

- **Push to `main` branch** → Automatic deployment
- **Pull requests** → Preview deployments (Vercel only)

### Manual Deployment

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for detailed instructions on:
- Backend deployment to Render
- Frontend deployment to Vercel
- Environment variable configuration
- CORS setup
- Monitoring with UptimeRobot
- Troubleshooting common issues

### Quick Deploy

**Backend (Render):**
```bash
# Automatically deploys from GitHub on push to main
# Manual: Render Dashboard → Service → Manual Deploy
```

**Frontend (Vercel):**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel --prod
```

---

## 🤖 AI Development

This project was built using **AI-assisted development** tools, demonstrating modern development workflows.

### AI Tools Used

| Tool | Usage | Percentage |
|------|-------|------------|
| **GitHub Copilot** | Code generation, autocompletion | 50% |
| **ChatGPT/Claude** | Architecture decisions, debugging | 15% |
| **Copilot Chat** | Code explanation, refactoring | 5% |
| **Manual Development** | Integration, testing, refinement | 30% |

### Development Metrics

- **Total Development Time:** ~8 hours
- **Estimated Time Without AI:** 20+ hours
- **Time Saved:** 60%
- **AI-Generated Code:** 70%
- **Manual Refinement:** 30%

### Key Learnings

✅ **What AI Excelled At:**
- Boilerplate code generation
- Component structure setup
- API endpoint creation
- Type definitions
- Styling and UI components

⚠️ **What Required Manual Work:**
- Architecture decisions
- CORS configuration
- Deployment troubleshooting
- Environment setup
- Business logic refinement
- Integration testing

### Detailed AI Documentation

See **[AI_DOCUMENTATION.md](./AI_DOCUMENTATION.md)** for:
- Complete breakdown of AI usage per component
- Challenges faced and solutions
- Time analysis and productivity metrics
- Recommendations for AI-assisted development

---

## 📸 Screenshots

### Homepage
<img src="https://via.placeholder.com/800x400/1a1a2e/16c79a?text=Crypto+Dashboard+Homepage" alt="Homepage" width="100%">

*Modern landing page with featured cryptocurrencies*

### Coins List
<img src="https://via.placeholder.com/800x400/1a1a2e/16c79a?text=Coins+List+with+Vanar+Featured" alt="Coins List" width="100%">

*Real-time coin list with Vanar Chain prominently featured*

### Coin Detail Page
<img src="https://via.placeholder.com/800x400/1a1a2e/16c79a?text=Coin+Detail+with+Chart" alt="Coin Detail" width="100%">

*Detailed coin information with interactive 7-day chart*

### Dark Mode
<img src="https://via.placeholder.com/800x400/0f0f0f/16c79a?text=Dark+Mode+Interface" alt="Dark Mode" width="100%">

*Sleek dark theme with professional color palette*

---

## 🧪 Testing

### Run Tests

**Backend:**
```bash
cd backend
pytest
```

**Frontend:**
```bash
cd frontend
npm test
```

### Manual Testing Checklist

- [ ] Homepage loads successfully
- [ ] Navigate to `/coins` page
- [ ] Vanar Chain appears at top with ⭐ badge
- [ ] Search functionality works
- [ ] Sort dropdown filters correctly
- [ ] Click coin → Detail page loads
- [ ] Chart displays 7-day data
- [ ] Dark mode toggle works
- [ ] Mobile responsive design
- [ ] Real-time updates (wait 30s)
- [ ] No console errors
- [ ] API calls succeed (check Network tab)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Code Style

- **Frontend:** ESLint + Prettier
- **Backend:** Black + isort
- **Commits:** Conventional Commits format

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Saad Malik**

- GitHub: [@SaadADMalik](https://github.com/SaadADMalik)
- Email: [your-email@example.com](mailto:your-email@example.com)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

---

## 🙏 Acknowledgments

- **Vanar Chain** - For the challenge opportunity
- **CoinGecko** - For providing free cryptocurrency API
- **Vercel** - For excellent Next.js hosting
- **Render** - For reliable backend hosting
- **Shadcn UI** - For beautiful React components
- **OpenAI & Anthropic** - For AI development tools

---

## 📚 Documentation

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete deployment guide and architecture
- **[AI_DOCUMENTATION.md](./AI_DOCUMENTATION.md)** - AI usage and development process
- **[API Documentation](https://crypto-dashboard-70ff.onrender.com/docs)** - Interactive API docs

---

## 🔗 Links

- **Live Demo:** https://crypto-dashboard-waur.vercel.app
- **API:** https://crypto-dashboard-70ff.onrender.com
- **GitHub:** https://github.com/SaadADMalik/crypto-dashboard
- **Issues:** https://github.com/SaadADMalik/crypto-dashboard/issues

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/SaadADMalik/crypto-dashboard?style=social)
![GitHub forks](https://img.shields.io/github/forks/SaadADMalik/crypto-dashboard?style=social)
![GitHub issues](https://img.shields.io/github/issues/SaadADMalik/crypto-dashboard)
![GitHub pull requests](https://img.shields.io/github/issues-pr/SaadADMalik/crypto-dashboard)

---

<div align="center">

**Made with ❤️ using AI-assisted development**

**⭐ Star this repo if you find it helpful!**

</div>
