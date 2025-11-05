\# 🚀 Deployment Guide - Crypto Dashboard



This document describes the deployment architecture, process, and maintenance for the Crypto Dashboard application.



---



\## 📋 Table of Contents



1\. \[Architecture Overview](#architecture-overview)

2\. \[Backend Deployment (Render)](#backend-deployment-render)

3\. \[Frontend Deployment (Vercel)](#frontend-deployment-vercel)

4\. \[Environment Variables](#environment-variables)

5\. \[CI/CD Pipeline](#cicd-pipeline)

6\. \[Monitoring \& Uptime](#monitoring--uptime)

7\. \[Troubleshooting](#troubleshooting)

8\. \[Cost Analysis](#cost-analysis)



---



\## 🏗️ Architecture Overview



\### \*\*Deployment Strategy: Split Architecture\*\*



```

┌─────────────────────────────────────────────────────────────┐

│                    Production Architecture                   │

├─────────────────────────────────────────────────────────────┤

│                                                               │

│  ┌──────────────────┐         ┌──────────────────┐         │

│  │   Vercel (CDN)   │         │   Render.com     │         │

│  │   Frontend       │ ◄─────► │   Backend API    │         │

│  │   Next.js App    │  HTTPS  │   FastAPI        │         │

│  └──────────────────┘         └──────────────────┘         │

│          │                             │                     │

│          │                             │                     │

│  ┌───────▼────────┐           ┌───────▼────────┐          │

│  │  Global CDN    │           │  SQLite DB     │          │

│  │  Edge Network  │           │  (Embedded)    │          │

│  └────────────────┘           └────────────────┘          │

│                                        │                     │

│                                ┌───────▼────────┐          │

│                                │  CoinGecko API │          │

│                                │  External Data │          │

│                                └────────────────┘          │

└─────────────────────────────────────────────────────────────┘

```



\### \*\*Why Split Deployment?\*\*



| Aspect | Benefit |

|--------|---------|

| \*\*Performance\*\* | Frontend on CDN (Vercel) = Global edge distribution |

| \*\*Scalability\*\* | Independent scaling of frontend and backend |

| \*\*Cost\*\* | Optimized for each platform's free tier |

| \*\*Deployment\*\* | Separate release cycles, faster frontend updates |

| \*\*SEO\*\* | Vercel's edge network optimized for Next.js SSR/SSG |



---



\## 🔧 Backend Deployment (Render)



\### \*\*Platform:\*\* Render.com

\### \*\*Service Type:\*\* Web Service

\### \*\*Runtime:\*\* Python 3.11.9

\### \*\*Instance:\*\* Free Tier



\### \*\*Step-by-Step Deployment:\*\*



\#### \*\*1. Prerequisites\*\*

\- GitHub repository with backend code

\- Render.com account (sign up with GitHub)



\#### \*\*2. Create Web Service\*\*



1\. Go to \[Render Dashboard](https://dashboard.render.com/)

2\. Click \*\*"New +"\*\* → \*\*"Web Service"\*\*

3\. Connect GitHub repository: `SaadADMalik/crypto-dashboard`

4\. Click \*\*"Connect"\*\*



\#### \*\*3. Configuration\*\*



| Setting | Value |

|---------|-------|

| \*\*Name\*\* | `crypto-dashboard-backend` |

| \*\*Region\*\* | Oregon (US West) or closest region |

| \*\*Branch\*\* | `main` |

| \*\*Root Directory\*\* | `backend` |

| \*\*Runtime\*\* | `Python 3` |

| \*\*Build Command\*\* | `pip install -r requirements.txt` |

| \*\*Start Command\*\* | `uvicorn app.main:app --host 0.0.0.0 --port $PORT` |

| \*\*Instance Type\*\* | `Free` |



\#### \*\*4. Environment Variables\*\*



Add these in Render dashboard under \*\*Environment\*\*:



| Key | Value | Description |

|-----|-------|-------------|

| `PYTHON\_VERSION` | `3.11.9` | Python version (must include patch) |

| `DATABASE\_URL` | `sqlite+aiosqlite:///./crypto\_dashboard.db` | Database connection string |

| `ENVIRONMENT` | `production` | Environment identifier |



\#### \*\*5. Deploy\*\*



Click \*\*"Create Web Service"\*\* → Wait 2-3 minutes for build and deployment.



\#### \*\*6. Verify Deployment\*\*



```bash

\# Health check

curl https://crypto-dashboard-70ff.onrender.com/health



\# Expected response:

{

&nbsp; "status": "healthy",

&nbsp; "api": "operational",

&nbsp; "database": "connected"

}



\# API documentation

https://crypto-dashboard-70ff.onrender.com/docs

```



\### \*\*Backend URLs:\*\*



\- \*\*Production API:\*\* `https://crypto-dashboard-70ff.onrender.com`

\- \*\*Health Check:\*\* `/health`

\- \*\*API Docs:\*\* `/docs`

\- \*\*ReDoc:\*\* `/redoc`



---



\## 🌐 Frontend Deployment (Vercel)



\### \*\*Platform:\*\* Vercel

\### \*\*Framework:\*\* Next.js 16

\### \*\*Instance:\*\* Hobby (Free) Tier



\### \*\*Step-by-Step Deployment:\*\*



\#### \*\*1. Prerequisites\*\*

\- GitHub repository with frontend code

\- Vercel account (sign up with GitHub)



\#### \*\*2. Import Project\*\*



1\. Go to \[Vercel Dashboard](https://vercel.com/dashboard)

2\. Click \*\*"Add New..."\*\* → \*\*"Project"\*\*

3\. Select repository: `crypto-dashboard`

4\. Click \*\*"Import"\*\*



\#### \*\*3. Configuration\*\*



| Setting | Value |

|---------|-------|

| \*\*Framework Preset\*\* | `Next.js` (auto-detected) |

| \*\*Root Directory\*\* | `frontend` ⚠️ \*\*CRITICAL\*\* |

| \*\*Build Command\*\* | `npm run build` (default) |

| \*\*Output Directory\*\* | `.next` (default) |

| \*\*Install Command\*\* | `npm install` (default) |

| \*\*Node Version\*\* | `20.x` (default) |



\#### \*\*4. Environment Variables\*\*



Click \*\*"Environment Variables"\*\* and add:



| Key | Value | All Environments |

|-----|-------|------------------|

| `NEXT\_PUBLIC\_API\_URL` | `https://crypto-dashboard-70ff.onrender.com` | ✅ Yes |



⚠️ \*\*Important:\*\* The `NEXT\_PUBLIC\_` prefix is required for client-side access.



\#### \*\*5. Deploy\*\*



Click \*\*"Deploy"\*\* → Wait 1-2 minutes for build and deployment.



\#### \*\*6. Verify Deployment\*\*



Visit: `https://crypto-dashboard-waur.vercel.app`



\*\*Check:\*\*

\- ✅ Homepage loads

\- ✅ `/coins` page shows cryptocurrency list

\- ✅ Vanar Chain appears first with ⭐ badge

\- ✅ Click coin → Detail page with chart loads

\- ✅ Search and filter work

\- ✅ Dark mode toggle works



\### \*\*Frontend URLs:\*\*



\- \*\*Production:\*\* `https://crypto-dashboard-waur.vercel.app`

\- \*\*Preview Deployments:\*\* Auto-generated for each PR



---



\## 🔐 Environment Variables



\### \*\*Backend (Render)\*\*



```bash

\# Required

PYTHON\_VERSION=3.11.9

DATABASE\_URL=sqlite+aiosqlite:///./crypto\_dashboard.db

ENVIRONMENT=production



\# Optional (using defaults)

COINGECKO\_API\_URL=https://api.coingecko.com/api/v3

```



\### \*\*Frontend (Vercel)\*\*



```bash

\# Required

NEXT\_PUBLIC\_API\_URL=https://crypto-dashboard-70ff.onrender.com



\# Optional (for analytics, monitoring)

\# NEXT\_PUBLIC\_GA\_ID=G-XXXXXXXXXX

\# NEXT\_PUBLIC\_SENTRY\_DSN=https://...

```



\### \*\*Local Development\*\*



\*\*Backend `.env`:\*\*

```bash

DATABASE\_URL=sqlite+aiosqlite:///./crypto\_dashboard.db

ENVIRONMENT=development

```



\*\*Frontend `.env.local`:\*\*

```bash

NEXT\_PUBLIC\_API\_URL=http://localhost:8000

```



---



\## 🔄 CI/CD Pipeline



\### \*\*Automated Deployment Flow\*\*



```

Developer Push → GitHub → Auto-Deploy

&nbsp;    ↓              ↓           ↓

&nbsp; git push     Webhook    Build \& Deploy

&nbsp;    ↓              ↓           ↓

&nbsp;  main        Render      Production

&nbsp;  branch      Vercel      Live Update

```



\### \*\*Backend (Render)\*\*



\*\*Trigger:\*\* Push to `main` branch



\*\*Build Process:\*\*

1\. Detect changes in `backend/` directory

2\. Install dependencies: `pip install -r requirements.txt`

3\. Run health checks

4\. Start service: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

5\. Perform zero-downtime deployment



\*\*Build Time:\*\* ~2-3 minutes



\### \*\*Frontend (Vercel)\*\*



\*\*Trigger:\*\* Push to `main` branch



\*\*Build Process:\*\*

1\. Detect changes in `frontend/` directory

2\. Install dependencies: `npm install`

3\. Build Next.js: `npm run build`

4\. Deploy to Edge Network

5\. Invalidate CDN cache



\*\*Build Time:\*\* ~1-2 minutes



\### \*\*Preview Deployments\*\*



Vercel automatically creates preview deployments for:

\- Pull requests

\- Non-main branches



Each preview gets unique URL: `https://crypto-dashboard-{hash}.vercel.app`



---



\## 📊 Monitoring \& Uptime



\### \*\*Problem: Render Free Tier Limitations\*\*



⚠️ \*\*Render free tier spins down after 15 minutes of inactivity\*\*

\- First request after sleep: 30-60 seconds cold start

\- Poor user experience for demos/interviews



\### \*\*Solution: UptimeRobot Monitoring\*\*



\*\*Service:\*\* \[UptimeRobot](https://uptimerobot.com/) (Free)



\*\*Configuration:\*\*

1\. Sign up at https://uptimerobot.com/

2\. Add monitor:

&nbsp;  - \*\*Type:\*\* HTTP(s)

&nbsp;  - \*\*URL:\*\* `https://crypto-dashboard-70ff.onrender.com/health`

&nbsp;  - \*\*Interval:\*\* 5 minutes

&nbsp;  - \*\*Name:\*\* Crypto Dashboard Backend



\*\*Benefits:\*\*

\- ✅ Keeps backend active 24/7

\- ✅ Email alerts on downtime

\- ✅ 50 monitors free tier

\- ✅ Public status page available



\### \*\*Alternative Monitoring Options\*\*



| Service | Free Tier | Interval | Notes |

|---------|-----------|----------|-------|

| \[BetterStack](https://betterstack.com/uptime) | 10 monitors | 3 min | Better UI |

| \[Cron-Job.org](https://cron-job.org/) | Unlimited | Custom | More flexible |

| \[Pingdom](https://www.pingdom.com/) | 1 monitor | 5 min | Limited free |



\### \*\*Health Check Endpoint\*\*



```python

\# backend/app/main.py

@app.get("/health")

async def health\_check():

&nbsp;   return {

&nbsp;       "status": "healthy",

&nbsp;       "api": "operational",

&nbsp;       "database": "connected"

&nbsp;   }

```



\*\*Response:\*\*

```json

{

&nbsp; "status": "healthy",

&nbsp; "api": "operational",

&nbsp; "database": "connected"

}

```



---



\## 🐛 Troubleshooting



\### \*\*Common Issues \& Solutions\*\*



\#### \*\*1. CORS Error on Frontend\*\*



\*\*Symptom:\*\*

```

Access to XMLHttpRequest blocked by CORS policy

```



\*\*Solution:\*\*

```python

\# backend/app/main.py

app.add\_middleware(

&nbsp;   CORSMiddleware,

&nbsp;   allow\_origins=\[

&nbsp;       "https://crypto-dashboard-waur.vercel.app",

&nbsp;       "https://\*.vercel.app",

&nbsp;   ],

&nbsp;   allow\_credentials=True,

&nbsp;   allow\_methods=\["\*"],

&nbsp;   allow\_headers=\["\*"],

)

```



\#### \*\*2. Backend Not Waking Up\*\*



\*\*Symptom:\*\*

\- Frontend stuck on "Loading markets..."

\- 504 Gateway Timeout



\*\*Solution:\*\*

1\. Visit backend directly: `https://crypto-dashboard-70ff.onrender.com/health`

2\. Wait 60 seconds for wake-up

3\. Refresh frontend

4\. Set up UptimeRobot to prevent sleep



\#### \*\*3. Build Fails on Render\*\*



\*\*Symptom:\*\*

```

ERROR: Could not open requirements file

```



\*\*Solution:\*\*

\- Verify `Root Directory` is set to `backend`

\- Check `requirements.txt` exists in `backend/` folder

\- Verify all dependencies listed



\#### \*\*4. Vercel 404 Error\*\*



\*\*Symptom:\*\*

```

404: NOT\_FOUND

Code: NOT\_FOUND

```



\*\*Solution:\*\*

\- Set \*\*Root Directory\*\* to `frontend` in Vercel settings

\- Redeploy: Settings → General → Root Directory → Edit → `frontend`



\#### \*\*5. Environment Variable Not Found\*\*



\*\*Symptom:\*\*

```

NameError: name 'os' is not defined

```



\*\*Solution:\*\*

```python

\# Add at top of config.py

import os

```



\#### \*\*6. TypeScript Build Error\*\*



\*\*Symptom:\*\*

```

Type error: darkMode \["class"] not assignable

```



\*\*Solution:\*\*

```typescript

// tailwind.config.ts

const config: Config = {

&nbsp; darkMode: "class",  // String, not array

&nbsp; // ...

}

```



---



\## 💰 Cost Analysis



\### \*\*Current Setup: $0/month\*\*



| Service | Plan | Cost | Usage |

|---------|------|------|-------|

| \*\*Vercel\*\* | Hobby | Free | ✅ 100GB bandwidth/month |

| \*\*Render\*\* | Free | Free | ✅ 750 hours/month (enough for 1 service) |

| \*\*UptimeRobot\*\* | Free | Free | ✅ 50 monitors, 5-min checks |

| \*\*GitHub\*\* | Free | Free | ✅ Unlimited public repos |

| \*\*CoinGecko API\*\* | Free | Free | ✅ 10-30 calls/minute |



\*\*Total Monthly Cost: $0\*\* 🎉



\### \*\*Limitations of Free Tier\*\*



| Service | Limitation | Impact |

|---------|------------|--------|

| Render | Spins down after 15 min | 30-60s cold start |

| Render | 750 hours/month | ≈31 days (enough for 1 service) |

| CoinGecko | 10-30 req/min | Rate limiting on heavy use |

| Vercel | 100GB bandwidth | Sufficient for demo/portfolio |



\### \*\*Upgrade Path (If Needed)\*\*



| Service | Paid Plan | Cost | Benefits |

|---------|-----------|------|----------|

| \*\*Render\*\* | Starter | $7/month | No sleep, always-on |

| \*\*Vercel\*\* | Pro | $20/month | More bandwidth, analytics |

| \*\*CoinGecko\*\* | Pro | $129/month | Higher rate limits, more data |



\*\*Recommendation:\*\* Free tier is perfect for portfolio/demo projects.



---



\## 📝 Deployment Checklist



\### \*\*Before First Deployment:\*\*



\- \[ ] Code pushed to GitHub main branch

\- \[ ] Backend `requirements.txt` complete

\- \[ ] Frontend `package.json` has all dependencies

\- \[ ] Environment variables documented

\- \[ ] CORS configured for production domains

\- \[ ] Health check endpoint implemented



\### \*\*Backend Deployment:\*\*



\- \[ ] Render account created and linked to GitHub

\- \[ ] Web service created with correct settings

\- \[ ] Root directory set to `backend`

\- \[ ] Environment variables configured

\- \[ ] Build command: `pip install -r requirements.txt`

\- \[ ] Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

\- \[ ] Service shows "Live" status

\- \[ ] Health check returns 200 OK



\### \*\*Frontend Deployment:\*\*



\- \[ ] Vercel account created and linked to GitHub

\- \[ ] Project imported from GitHub

\- \[ ] Root directory set to `frontend`

\- \[ ] Environment variable `NEXT\_PUBLIC\_API\_URL` set

\- \[ ] Build completes successfully

\- \[ ] Site accessible and loads correctly

\- \[ ] API calls work (check browser console)



\### \*\*Post-Deployment:\*\*



\- \[ ] UptimeRobot monitor configured

\- \[ ] All features tested in production

\- \[ ] CORS verified (no console errors)

\- \[ ] Mobile responsiveness checked

\- \[ ] Dark mode toggle works

\- \[ ] README updated with live URLs

\- \[ ] Documentation complete



---



\## 🔗 Important URLs



\### \*\*Production\*\*

\- Frontend: https://crypto-dashboard-waur.vercel.app

\- Backend API: https://crypto-dashboard-70ff.onrender.com

\- API Docs: https://crypto-dashboard-70ff.onrender.com/docs



\### \*\*Development\*\*

\- Frontend: http://localhost:3000

\- Backend: http://localhost:8000

\- API Docs: http://localhost:8000/docs



\### \*\*Management\*\*

\- Vercel Dashboard: https://vercel.com/dashboard

\- Render Dashboard: https://dashboard.render.com/

\- UptimeRobot: https://uptimerobot.com/dashboard

\- GitHub Repo: https://github.com/SaadADMalik/crypto-dashboard



---



\## 📞 Support \& Maintenance



\### \*\*Monitoring\*\*

\- Check UptimeRobot dashboard for uptime stats

\- Review Vercel Analytics for frontend performance

\- Check Render logs for backend errors



\### \*\*Logs Access\*\*



\*\*Backend Logs (Render):\*\*

```

Dashboard → Service → Logs tab

```



\*\*Frontend Logs (Vercel):\*\*

```

Dashboard → Project → Deployments → View Function Logs

```



\### \*\*Manual Redeploy\*\*



\*\*Backend:\*\*

```

Render Dashboard → Service → Manual Deploy → Deploy latest commit

```



\*\*Frontend:\*\*

```

Vercel Dashboard → Deployments → ⋯ → Redeploy

```



---



\## 📚 Additional Resources



\- \[Render Documentation](https://render.com/docs)

\- \[Vercel Documentation](https://vercel.com/docs)

\- \[FastAPI Deployment Guide](https://fastapi.tiangolo.com/deployment/)

\- \[Next.js Deployment](https://nextjs.org/docs/deployment)

\- \[CoinGecko API Docs](https://www.coingecko.com/en/api/documentation)



---



\*\*Last Updated:\*\* 2025-01-05  

\*\*Maintained By:\*\* Saad Malik (@SaadADMalik)  

\*\*License:\*\* MIT

