# ArenaView - Sports & Casino Games Platform

A full-stack sports/casino games platform for viewing matches, filtering by sport/provider, and managing favorites. Built with clean architecture, type safety, and production-ready patterns.

## Features

### ✅ Completed (Backend - Phases 1-5)

- **Authentication API** - Register, login with JWT + bcrypt hashing
- **Games API** - List 39+ games with advanced filtering:
  - Filter by type (Sports/Casino)
  - Filter by sport (Cricket, Football, Tennis)
  - Filter by provider (Evolution, Pragmatic Play, Betsoft)
  - Full-text search across game names, teams, leagues
  - Pagination with configurable limits
- **Favorites API** - CRUD operations for user favorites:
  - Add/remove games from favorites
  - View all favorites with game data
  - Duplicate prevention with unique constraints
  - Optimistic updates ready for frontend
- **Security** - Rate limiting, input validation (Zod), error handling
- **Database** - PostgreSQL with Prisma ORM, full type safety

### 🚀 Upcoming (Phase 6+)

- Frontend React SPA with Games browsing and Favorites management
- Responsive design with Tailwind CSS
- React Query for server state management
- Framer Motion animations

## Tech Stack

| Layer          | Technology                     | Purpose                      |
| -------------- | ------------------------------ | ---------------------------- |
| **Backend**    | Node.js + Express + TypeScript | REST API with clean patterns |
| **Database**   | PostgreSQL + Prisma ORM        | Type-safe data persistence   |
| **Auth**       | JWT + bcrypt                   | Secure authentication        |
| **Validation** | Zod                            | Runtime type validation      |
| **Frontend**   | React + TypeScript (upcoming)  | SPA user interface           |
| **Styling**    | Tailwind CSS (upcoming)        | Utility-first CSS            |

## Project Structure

```
arenaview/
├── backend/
│   ├── src/
│   │   ├── controllers/      # HTTP request handlers
│   │   ├── services/         # Business logic
│   │   ├── routes/           # Route definitions
│   │   ├── schemas/          # Zod validation
│   │   ├── middleware/       # Auth, validation, rate limiting
│   │   ├── config/           # Database, CORS, environment
│   │   └── utils/            # JWT, errors, response formatting
│   ├── prisma/
│   │   ├── schema.prisma     # Database schema
│   │   ├── seed.ts           # Seed 39 games
│   │   └── migrations/
│   ├── package.json
│   └── .env.example
├── frontend/                  # React SPA (upcoming)
└── README.md
```

## Setup Instructions

### Prerequisites

- **Node.js** v20+ installed
- **Docker Desktop** installed and running
- **Git** installed

### 1. Clone Repository

```bash
git clone https://github.com/GunaPalanivel/arenaview.git
cd arenaview
```

### 2. Database Setup (PostgreSQL via Docker)

```bash
docker run --name arenaview-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=arenaview \
  -p 5432:5432 \
  -d postgres:15
```

Verify database is running:

```bash
docker ps | grep arenaview-postgres
```

### 3. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` with:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/arenaview"
JWT_SECRET="your-minimum-32-character-secret-key-here-required"
PORT=3001
FRONTEND_URL="http://localhost:5173"
```

Initialize database and seed data:

```bash
npx prisma migrate dev --name init
npx prisma db seed
```

The seed creates:

- 1 test user (john@example.com / John1234)
- 39 games:
  - 19 sports games (Cricket, Football, Tennis)
  - 20 casino games (Evolution, Pragmatic Play, Betsoft)

Start backend:

```bash
npm run dev
```

**Backend health check:** `curl http://localhost:3001/health`

### 4. API Testing

#### Authentication

```bash
# Register new user
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Your Name","email":"you@example.com","password":"Password123"}'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"John1234"}'
```

#### Games API

```bash
# Get all games (requires Bearer token)
curl http://localhost:3001/api/games \
  -H "Authorization: Bearer YOUR_TOKEN"

# Filter by type
curl "http://localhost:3001/api/games?type=SPORTS" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Filter by sport
curl "http://localhost:3001/api/games?sport=Cricket" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Search
curl "http://localhost:3001/api/games?search=Mumbai" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Pagination
curl "http://localhost:3001/api/games?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Favorites API

```bash
# Get user's favorites
curl http://localhost:3001/api/favorites \
  -H "Authorization: Bearer YOUR_TOKEN"

# Add to favorites
curl -X POST http://localhost:3001/api/favorites/{gameId} \
  -H "Authorization: Bearer YOUR_TOKEN"

# Remove from favorites
curl -X DELETE http://localhost:3001/api/favorites/{gameId} \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 5. API Specification

| Method | Endpoint                 | Auth | Status | Description             |
| ------ | ------------------------ | ---- | ------ | ----------------------- |
| POST   | `/api/auth/register`     | No   | ✅     | Create new user         |
| POST   | `/api/auth/login`        | No   | ✅     | Authenticate user       |
| GET    | `/api/games`             | Yes  | ✅     | List games with filters |
| GET    | `/api/games/:id`         | Yes  | ✅     | Get single game         |
| GET    | `/api/favorites`         | Yes  | ✅     | Get user's favorites    |
| POST   | `/api/favorites/:gameId` | Yes  | ✅     | Add game to favorites   |
| DELETE | `/api/favorites/:gameId` | Yes  | ✅     | Remove from favorites   |

### Response Format

All endpoints return consistent JSON:

**Success (200, 201):**

```json
{
  "success": true,
  "data": { ... }
}
```

**Error (4xx, 5xx):**

```json
{
  "success": false,
  "message": "Error description"
}
```

## Database Schema

```
users
├── id (UUID)
├── name (String)
├── email (String, unique)
├── password (String, bcrypt hashed)
└── createdAt, updatedAt

games (39 seeded)
├── id (UUID)
├── name (String)
├── type (SPORTS | CASINO)
├── sport (Cricket, Football, Tennis)
├── provider (Evolution, Pragmatic Play, Betsoft)
├── teamA, teamB (for sports)
├── league (for sports)
└── imageUrl, isActive, etc.

favorites
├── id (UUID)
├── userId (FK → users)
├── gameId (FK → games)
└── unique constraint on [userId, gameId]
```

## Security Features

- ✅ **Password Hashing** - bcrypt with 12 salt rounds
- ✅ **JWT Authentication** - 7-day token expiry
- ✅ **Input Validation** - Zod schemas on all endpoints
- ✅ **Rate Limiting** - 5 attempts/15min for login, 30 toggles/min for favorites
- ✅ **CORS Protection** - Whitelist frontend origin
- ✅ **SQL Injection Prevention** - Prisma ORM parameterized queries
- ✅ **Error Handling** - No sensitive data in error messages

## Development Commands

```bash
# Backend
cd backend
npm run dev         # Start dev server with auto-reload
npm run build       # Compile TypeScript
npm test            # Run tests (if configured)

# Database
npx prisma studio  # Open Prisma Studio GUI
npx prisma migrate dev --name migration-name
npx prisma db seed
```

## Test Credentials

```
Email: john@example.com
Password: John1234
```

Or register a new user via `/api/auth/register`

## Deployment Ready

The backend is production-ready with:

- TypeScript strict mode
- Environment variable validation
- Graceful error handling
- Rate limiting
- CORS configuration
- Prisma connection pooling
- Docker compatible

## Next Steps (Phase 6)

- Initialize React frontend
- Create authentication UI (login/register pages)
- Build games listing with filters
- Implement favorites management UI
- Add responsive design with Tailwind CSS

## License

ISC
