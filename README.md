# Back2KC Tax Dashboard

A Next.js 14 App Router dashboard for Jessica Powell's small business tax advisory workflow, built with Back2KC branding (blue `#00AEEF` + orange `#F7941D`).

## Features

- **Overview** — KPI cards, tax summary bar chart (revenue vs expenses), revenue area chart, tax breakdown donut
- **Income & Expenses** — Monthly breakdowns with visual bars
- **Deductions** — Categorized deduction tracking ($22,847 YTD)
- **Quarterly Taxes** — Q1–Q4 payment cards with IRS Direct Pay links, safe harbor calculator
- **Upload Documents** — Drag-and-drop CSV/PDF/Excel/JSON, auto-scan via `/api/analyze`
- **Opportunities** — 8 tax-saving opportunities with priority filtering, estimated savings
- **Reports** — Generated report management with download/generate actions
- **Settings** — Profile, notification preferences

## Tech Stack

- Next.js 14 (App Router, TypeScript)
- Tailwind CSS
- Recharts (BarChart, AreaChart, PieChart)
- lucide-react icons
- Supabase (env wired, not required for UI)

## Setup

```bash
cd tax-dashboard
npm install
cp .env.local.example .env.local   # edit your keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_BUSINESS_NAME` | Business name (Back2KC) |
| `NEXT_PUBLIC_OWNER_NAME` | Owner name (Jessica Powell) |
| `NEXT_PUBLIC_STATE` | State abbreviation (MO) |
| `ANTHROPIC_API_KEY` | For AI-powered opportunity scanning |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side only) |

## Deploy to Vercel

```bash
npm install -g vercel
vercel login
vercel --prod
```

Or connect the GitHub repo at [vercel.com/new](https://vercel.com/new) and add environment variables in the Vercel dashboard under Project Settings > Environment Variables.

## Project Structure

```
tax-dashboard/
├── app/
│   ├── layout.tsx          # Root layout with Sidebar + TopBar
│   ├── page.tsx            # Overview dashboard
│   ├── income/page.tsx
│   ├── expenses/page.tsx
│   ├── deductions/page.tsx
│   ├── quarterly/page.tsx  # Quarterly tax payment tracker
│   ├── upload/page.tsx     # Document upload + analysis
│   ├── opportunities/page.tsx
│   ├── reports/page.tsx
│   ├── settings/page.tsx
│   └── api/analyze/route.ts
├── components/
│   ├── Sidebar.tsx
│   ├── TopBar.tsx
│   ├── Back2KCLogo.tsx
│   ├── KPICards.tsx
│   ├── WelcomePanel.tsx
│   ├── TaxSummaryChart.tsx
│   ├── RevenueLineChart.tsx
│   └── TaxDonutChart.tsx
└── lib/
    └── data.ts             # Mock data and formatters
```

## Brand Colors

- Primary Blue: `#00AEEF`
- Accent Orange: `#F7941D`
- Dark: `#0D1B2A`
- Light BG: `#F4F7FE`
