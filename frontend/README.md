# Frontend - Crypto Dashboard Pro

Next.js 14 application with TypeScript and Tailwind CSS.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Charts:** Recharts
- **State Management:** Zustand
- **Data Fetching:** TanStack React Query
- **HTTP Client:** Axios
- **Icons:** Lucide React
- **Notifications:** Sonner

## Getting Started

1. Install dependencies:
\\\ash
npm install
\\\

2. Create \.env.local\:
\\\
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000
\\\

3. Run development server:
\\\ash
npm run dev
\\\

4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

\\\
src/
├── app/                    # Next.js App Router pages
├── components/
│   ├── layout/            # Header, Footer, Navigation
│   ├── coins/             # Coin list, card, search
│   ├── charts/            # Price charts
│   ├── portfolio/         # Portfolio management
│   └── ui/                # Reusable UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and API client
├── store/                 # Zustand stores
├── types/                 # TypeScript types
└── constants/             # Constants and config
\\\

## Available Scripts

- \
pm run dev\ - Start development server
- \
pm run build\ - Build for production
- \
pm run start\ - Start production server
- \
pm run lint\ - Run ESLint

## Environment Variables

- \NEXT_PUBLIC_API_URL\ - Backend API URL
- \NEXT_PUBLIC_WS_URL\ - WebSocket URL
