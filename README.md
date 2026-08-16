## Backend Repository
[View Backend Repository](https://github.com/AMIRUL1104/Mission-Tracker-server)

# Mission Tracker

A personal productivity and progress tracking system built with Next.js.

## Live Demo
[https://mission-tracker-client.vercel.app/](https://mission-tracker-client.vercel.app/)

## Project Overview

Mission Tracker helps users stay focused on their goals by tracking priorities, daily non-negotiables, consistency streaks, academic progress, and custom metrics—all organized by month. The application features a dark-themed dashboard with a monospace aesthetic for a terminal-like experience.

## Main Features

- **Dashboard Overview**: Consolidated view of priorities, tasks, streaks, academics, and metrics
- **Priority Management**: Set monthly priorities with milestones and progress tracking
- **Task Tracker**: Daily non-negotiable tasks with calendar-based completion tracking
- **Streak Calendar**: Visual consistency tracking with current streak, best streak, and total completed days
- **Academic Tracker**: Track subjects, chapters, and study hours with progress visualization
- **Custom Metrics**: Define and track personal success metrics with target values
- **Analytics Dashboard**: Performance visualizations using Recharts
- **Month Navigation**: Switch between months to view historical data

## Tech Stack

- **Framework**: Next.js 16.3.0 (App Router)
- **Language**: JavaScript (React 19.2.8)
- **Styling**: Tailwind CSS 4
- **UI Library**: Lucide React (icons)
- **Charts**: Recharts 3.10.1
- **Build Tool**: Turbopack (React Compiler)

## Authentication

- JWT token-based authentication
- Register/Login flow with email and password
  - Registration includes name, email, password, and age fields
- Protected routes via `AuthProvider` context
- Token stored securely in localStorage

## Dashboard and Major Sections

1. **Dashboard** (`/dashboard`) - Overview cards showing today's priorities, tasks, streak stats, and metrics
2. **Priorities** (`/dashboard/priorities`) - Create and manage monthly priorities with milestones
3. **Tasks** (`/dashboard/tasks`) - Daily task grid with completion toggles
4. **Streak** (`/dashboard/streak`) - Full streak calendar view with stats cards
5. **Academics** (`/dashboard/academics`) - Subject and chapter tracking with weekly hours
6. **Metrics** (`/dashboard/metrics`) - Custom success metrics with target progress bars
7. **Analytics** (`/dashboard/analytics`) - Visual charts for academic and metric data
8. **Settings** (`/dashboard/settings`) - User settings (placeholder)

## Responsive Design

- Mobile-first responsive layout
- Collapsible sidebar on mobile devices
- Adaptive grid layouts (1 column on mobile, multi-column on desktop)
- Dark theme with custom color palette:
  - Background: `#0d0f14` (deep navy)
  - Cards: `#1a1e2a` (dark slate)
  - Borders: `#252a38` (subtle dividers)
  - Accent: `#5b6af0` (primary blue)

## API/Backend Integration

The frontend communicates with a REST API backend at `/api`:

- Base URL: `NEXT_PUBLIC_API_URL` environment variable (defaults to `http://localhost:5000/api`)
- JWT Authorization headers for authenticated requests
- Token automatically attached to all API requests via localStorage
- Services:
  - `src/lib/api.js` - Central API client
  - `src/context/AuthContext.jsx` - Authentication context
  - `src/lib/taskApi.js` - Task CRUD operations
  - `src/lib/streakApi.js` - Streak statistics
  - `src/lib/metricApi.js` - Success metrics
  - `src/lib/academicApi.js` - Academic progress
  - `src/lib/overviewApi.js` - Dashboard overview data
  - `src/services/priorityService.js` - Priority and milestone management

## Local Setup Instructions

```bash
# Clone the repository
git clone <repo-url>
cd mission-tracker-client

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view in the browser.

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.js           # Root layout with providers
│   ├── page.js             # Home page
│   ├── login/page.jsx      # Login page
│   ├── register/page.jsx   # Registration page
│   └── dashboard/          # Dashboard sections
│       ├── layout.jsx      # Dashboard layout with sidebar
│       ├── page.jsx        # Dashboard overview
│       ├── priorities/page.jsx
│       ├── tasks/page.jsx
│       ├── streak/page.jsx
│       ├── academics/page.jsx
│       ├── metrics/page.jsx
│       ├── analytics/page.jsx
│       └── settings/page.jsx
├── components/             # Reusable UI components
│   └── dashboard/          # Dashboard-specific components
├── context/                # React contexts
│   ├── AuthContext.jsx     # Authentication state
│   └── TrackerContext.jsx  # Tracker state (date/month data)
├── lib/                    # API service layer
└── services/               # Additional services
```

## License

This project is for educational purposes.