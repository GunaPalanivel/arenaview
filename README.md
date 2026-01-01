# ArenaView - Sports & Casino Games Platform

A full-stack sports/casino games platform for viewing matches, filtering by sport/provider, and managing favorites.

## Tech Stack

**Backend:**

- Node.js + Express + TypeScript
- PostgreSQL + Prisma ORM
- JWT Authentication + bcrypt
- Zod validation

**Frontend:**

- React + TypeScript
- Tailwind CSS
- React Query
- React Router
- Framer Motion

## Project Structure

```
arenaview/
├── backend/          # Express API server
├── frontend/         # React SPA
└── README.md
```

## Setup Instructions

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Configure DATABASE_URL and JWT_SECRET in .env
npx prisma migrate dev
npx prisma db seed
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Configure VITE_API_URL in .env
npm run dev
```

## Features

- ✅ User authentication (register/login with JWT)
- ✅ Games/matches listing with filtering
- ✅ Favorites system (mark/unmark, persisted to database)
- ✅ Search functionality
- ✅ Responsive design

## Development

- Backend runs on: `http://localhost:3001`
- Frontend runs on: `http://localhost:5173`

## License

ISC
