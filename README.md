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

### Prerequisites

- Node.js v20+ installed
- Docker Desktop installed and running
- Git installed

### 1. Clone Repository

```bash
git clone https://github.com/GunaPalanivel/arenaview.git
cd arenaview
```

### 2. Database Setup (PostgreSQL via Docker)

```bash
docker run --name arenaview-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=arenaview -p 5432:5432 -d postgres:15
```

### 3. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` file:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/arenaview"
JWT_SECRET="your-64-character-secret-key-here"
PORT=3001
FRONTEND_URL="http://localhost:5173"
```

Run migrations and seed data:
```bash
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

Backend health check: `http://localhost:3001/health`

### 4. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
```

Edit `.env` file:
```env
VITE_API_URL="http://localhost:3001"
```

Start frontend:
```bash
npm run dev
```

Frontend opens at: `http://localhost:5173`

### 5. Test Credentials

- Email: `test@example.com`
- Password: `Test1234`

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
