# ArenaView - Mini Sports/Casino Games Platform

## Project Overview

A full-stack sports/casino games platform for viewing matches, filtering by sport/provider, and managing favorites. Built for a full-stack assessment demonstrating clean architecture, type safety, and engineering best practices.

**Core Features:**

- User authentication (register/login with JWT)
- Games/matches listing with filtering
- Favorites system (mark/unmark, persisted to database)
- No betting logic—viewing and favoriting only

---

## Tech Stack

| Layer          | Technology                     | Purpose                                 |
| -------------- | ------------------------------ | --------------------------------------- |
| **Backend**    | Node.js + Express + TypeScript | REST API server                         |
| **Database**   | PostgreSQL + Prisma ORM        | Data persistence with type-safe queries |
| **Auth**       | JWT + bcrypt                   | Secure authentication                   |
| **Validation** | Zod                            | Runtime type validation                 |
| **Frontend**   | React + TypeScript             | SPA user interface                      |
| **Styling**    | Tailwind CSS                   | Utility-first styling                   |
| **State**      | React Query + Context          | Server state + auth state               |

---

## Project Structure

```
arenaview/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma          # Database schema
│   │   ├── seed.ts                # Seed data script
│   │   └── migrations/
│   ├── src/
│   │   ├── index.ts               # App entry point
│   │   ├── config/
│   │   │   ├── env.ts             # Environment validation
│   │   │   ├── database.ts        # Prisma client singleton
│   │   │   └── cors.ts            # CORS configuration
│   │   ├── middleware/
│   │   │   ├── auth.middleware.ts # JWT verification
│   │   │   ├── error.middleware.ts# Global error handler
│   │   │   ├── validate.middleware.ts
│   │   │   └── rateLimiter.middleware.ts # Rate limiting
│   │   ├── controllers/           # Request handlers
│   │   │   ├── auth.controller.ts
│   │   │   ├── games.controller.ts
│   │   │   └── favorites.controller.ts
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   ├── games.routes.ts
│   │   │   └── favorites.routes.ts
│   │   ├── services/
│   │   │   ├── auth.service.ts    # Auth business logic
│   │   │   ├── games.service.ts   # Games queries
│   │   │   ├── favorites.service.ts
│   │   │   └── password.service.ts # Password hashing
│   │   ├── schemas/               # Zod validation schemas
│   │   │   ├── auth.schema.ts
│   │   │   └── games.schema.ts
│   │   ├── types/
│   │   │   └── index.ts           # Shared TypeScript types
│   │   └── utils/
│   │       ├── jwt.ts             # Token helpers
│   │       ├── errors.ts          # AppError classes
│   │       └── response.ts        # Response formatters
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── main.tsx                    # App entry with providers
│   │   ├── App.tsx                     # Router and layout
│   │   ├── index.css                   # Global styles + CSS variables
│   │   │
│   │   ├── api/
│   │   │   ├── client.ts               # Axios instance with interceptors
│   │   │   ├── auth.api.ts             # Auth endpoints
│   │   │   ├── games.api.ts            # Games endpoints
│   │   │   └── favorites.api.ts        # Favorites endpoints
│   │   │
│   │   ├── components/
│   │   │   ├── ui/                     # Design system components
│   │   │   │   ├── Button.tsx          # Primary, secondary, ghost variants
│   │   │   │   ├── Input.tsx           # Form input with validation states
│   │   │   │   ├── Card.tsx            # Game card container
│   │   │   │   ├── Badge.tsx           # Sport/category tags
│   │   │   │   ├── Skeleton.tsx        # Loading placeholders
│   │   │   │   ├── Toast.tsx           # Notification system
│   │   │   │   ├── Spinner.tsx         # Loading indicator
│   │   │   │   └── EmptyState.tsx      # No data illustration
│   │   │   │
│   │   │   ├── layout/
│   │   │   │   ├── Header.tsx          # Navigation + user menu
│   │   │   │   ├── Sidebar.tsx         # Filter panel (desktop)
│   │   │   │   ├── MobileNav.tsx       # Bottom navigation (mobile)
│   │   │   │   └── PageContainer.tsx   # Consistent page wrapper
│   │   │   │
│   │   │   ├── auth/
│   │   │   │   ├── LoginForm.tsx       # Email/password with validation
│   │   │   │   ├── RegisterForm.tsx    # Name/email/password form
│   │   │   │   └── AuthGuard.tsx       # Protected route wrapper
│   │   │   │
│   │   │   ├── games/
│   │   │   │   ├── GameCard.tsx        # Individual game display
│   │   │   │   ├── GameList.tsx        # Grid with infinite scroll
│   │   │   │   ├── GameFilter.tsx      # Sport/provider filter tabs
│   │   │   │   ├── GameSearch.tsx      # Search input with debounce
│   │   │   │   └── GameSkeleton.tsx    # Loading card placeholder
│   │   │   │
│   │   │   └── favorites/
│   │   │       ├── FavoriteButton.tsx  # Heart icon with animation
│   │   │       └── FavoritesList.tsx   # User's favorites grid
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.tsx         # User state + token management
│   │   │   └── ToastContext.tsx        # Global notification state
│   │   │
│   │   ├── hooks/
│   │   │   ├── useAuth.ts              # Login/register/logout logic
│   │   │   ├── useGames.ts             # Games query with filters
│   │   │   ├── useFavorites.ts         # Favorites CRUD operations
│   │   │   ├── useDebounce.ts          # Search input debouncing
│   │   │   └── useInfiniteScroll.ts    # Pagination trigger hook
│   │   │
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx           # Auth entry point
│   │   │   ├── RegisterPage.tsx        # New user registration
│   │   │   ├── GamesPage.tsx           # Main games listing
│   │   │   └── FavoritesPage.tsx       # User favorites view
│   │   │
│   │   ├── styles/
│   │   │   ├── theme.ts                # CSS variables + design tokens
│   │   │   ├── animations.ts           # Framer Motion variants
│   │   │   └── breakpoints.ts          # Responsive breakpoint config
│   │   │
│   │   ├── types/
│   │   │   ├── index.ts                # Shared TypeScript interfaces
│   │   │   ├── api.types.ts            # API response types
│   │   │   └── game.types.ts           # Game/Favorite models
│   │   │
│   │   └── utils/
│   │       ├── storage.ts              # Token localStorage helpers
│   │       ├── validation.ts           # Form validation schemas (Zod)
│   │       ├── formatters.ts           # Date/time formatting
│   │       └── cn.ts                   # Tailwind class merge utility
│   │
│   ├── public/
│   │   └── fonts/                      # Custom typography files
│   │
│   ├── package.json
│   ├── tailwind.config.js              # Custom theme + fonts
│   └── vite.config.ts
├── README.md
└── .env.example
```

---

## Database Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  password  String   // bcrypt hashed
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  favorites Favorite[]

  @@map("users")
}

model Game {
  id        String   @id @default(uuid())
  name      String
  type      GameType // SPORTS or CASINO

  // Sports-specific fields
  sport     String?  // Cricket, Football, Tennis
  league    String?  // IPL, EPL, La Liga
  teamA     String?
  teamB     String?
  startTime DateTime?

  // Casino-specific fields
  provider  String?  // Evolution, Pragmatic Play
  category  String?  // Slots, Live Casino, Table Games

  imageUrl  String?
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  favorites Favorite[]

  @@index([type])
  @@index([sport])
  @@index([provider])
  @@map("games")
}

model Favorite {
  id        String   @id @default(uuid())
  userId    String
  gameId    String
  createdAt DateTime @default(now())

  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  game      Game     @relation(fields: [gameId], references: [id], onDelete: Cascade)

  @@unique([userId, gameId]) // Prevent duplicate favorites
  @@index([userId])
  @@map("favorites")
}

enum GameType {
  SPORTS
  CASINO
}
```

---

## API Specification

### Response Format (Consistent)

```typescript
// Success
{ success: true, data: T }

// Error
{ success: false, error: { code: string, message: string } }
```

### Endpoints

| Method | Endpoint                 | Auth | Description                 |
| ------ | ------------------------ | ---- | --------------------------- |
| POST   | `/api/auth/register`     | No   | Create new user             |
| POST   | `/api/auth/login`        | No   | Authenticate user           |
| GET    | `/api/games`             | Yes  | List all games with filters |
| GET    | `/api/games/:id`         | Yes  | Get single game details     |
| GET    | `/api/favorites`         | Yes  | Get user's favorites        |
| POST   | `/api/favorites/:gameId` | Yes  | Add game to favorites       |
| DELETE | `/api/favorites/:gameId` | Yes  | Remove from favorites       |

### Endpoint Details

#### POST /api/auth/register

```typescript
// Request
{ name: string, email: string, password: string }

// Response 201
{ success: true, data: { user: { id, name, email }, token: string } }

// Errors: 400 (validation), 409 (email exists)
```

#### POST /api/auth/login

```typescript
// Request
{ email: string, password: string }

// Response 200
{ success: true, data: { user: { id, name, email }, token: string } }

// Errors: 400 (validation), 401 (invalid credentials)
```

#### GET /api/games

```typescript
// Query params (all optional)
?type=SPORTS|CASINO
&sport=Cricket|Football|Tennis
&provider=Evolution|Pragmatic%20Play
&search=team+name
&page=1
&limit=20

// Response 200
{
  success: true,
  data: {
    games: Game[],
    pagination: { page, limit, total, totalPages }
  }
}
```

#### POST /api/favorites/:gameId

```typescript
// Response 201
{ success: true, data: { favorite: { id, userId, gameId, createdAt } } }

// Errors: 404 (game not found), 409 (already favorited)
```

#### DELETE /api/favorites/:gameId

```typescript
// Response 200
{ success: true, data: { message: "Removed from favorites" } }

// Errors: 404 (favorite not found)
```

---

## Authentication Flow

```
┌─────────┐     ┌─────────┐     ┌────────────┐     ┌──────────┐     ┌────────┐
│ Client  │     │ Routes  │     │ Controller │     │ Service  │     │ Prisma │
└────┬────┘     └────┬────┘     └─────┬──────┘     └────┬─────┘     └───┬────┘
     │               │                │                 │               │
     │ POST /register│                │                 │               │
     │──────────────>│                │                 │               │
     │               │ validate(Zod)  │                 │               │
     │               │───────────────>│                 │               │
     │               │                │ authService     │               │
     │               │                │ .register()     │               │
     │               │                │────────────────>│               │
     │               │                │                 │ hash password │
     │               │                │                 │──────────────>│
     │               │                │                 │ create user   │
     │               │                │                 │──────────────>│
     │               │                │                 │<──────────────│
     │               │                │                 │ generate JWT  │
     │               │                │<────────────────│               │
     │               │ format response│                 │               │
     │               │<───────────────│                 │               │
     │ { user, token }                │                 │               │
     │<──────────────│                │                 │               │
     │               │                │                 │               │
     │ GET /games    │                │                 │               │
     │ Authorization:│                │                 │               │
     │ Bearer <token>│                │                 │               │
     │──────────────>│                │                 │               │
     │               │ authMiddleware │                 │               │
     │               │ verify JWT     │                 │               │
     │               │───────────────>│                 │               │
     │               │                │ gamesService    │               │
     │               │                │ .getGames()     │               │
     │               │                │────────────────>│               │
     │               │                │                 │ query games   │
     │               │                │                 │──────────────>│
     │               │                │                 │<──────────────│
     │               │                │<────────────────│               │
     │ { games }     │                │                 │               │
     │<──────────────│                │                 │               │
```

### Request Flow Pattern

```
Client Request
     ↓
┌─────────────────────────────────────────────────────────────┐
│ Routes Layer (routes/*.routes.ts)                           │
│ • Rate limiting (authLimiter, apiLimiter)                   │
│ • Input validation (validate middleware + Zod schemas)      │
│ • Auth verification (authMiddleware)                        │
└─────────────────────────────────────────────────────────────┘
     ↓
┌─────────────────────────────────────────────────────────────┐
│ Controller Layer (controllers/*.controller.ts)              │
│ • Extract validated data from req.body/query/params         │
│ • Call appropriate service methods                          │
│ • Format and send HTTP responses                            │
│ • Handle controller-level errors                            │
└─────────────────────────────────────────────────────────────┘
     ↓
┌─────────────────────────────────────────────────────────────┐
│ Service Layer (services/*.service.ts)                       │
│ • Business logic implementation                             │
│ • Database operations via Prisma                            │
│ • Throw domain-specific errors (NotFoundError, etc.)        │
└─────────────────────────────────────────────────────────────┘
     ↓
┌─────────────────────────────────────────────────────────────┐
│ Data Layer (Prisma ORM)                                     │
│ • Type-safe database queries                                │
│ • Transactions for multi-step operations                    │
│ • Connection pooling                                        │
└─────────────────────────────────────────────────────────────┘
```

### JWT Implementation

```typescript
// utils/jwt.ts
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = "7d";

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token: string): { userId: string } => {
  return jwt.verify(token, JWT_SECRET) as { userId: string };
};
```

### Auth Middleware

```typescript
// middleware/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      error: { code: "UNAUTHORIZED", message: "Missing or invalid token" },
    });
  }

  try {
    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token);
    req.userId = payload.userId;
    next();
  } catch {
    return res.status(401).json({
      success: false,
      error: { code: "INVALID_TOKEN", message: "Token expired or invalid" },
    });
  }
};
```

---

## Security Requirements

| Requirement      | Implementation                                |
| ---------------- | --------------------------------------------- |
| Password hashing | bcrypt with salt rounds = 12                  |
| Token security   | JWT with 7-day expiry, stored in localStorage |
| Input validation | Zod schemas on all endpoints                  |
| SQL injection    | Prisma ORM (parameterized queries)            |
| XSS protection   | React auto-escapes, sanitize user inputs      |
| CORS             | Whitelist frontend origin only                |
| Rate limiting    | express-rate-limit on auth endpoints          |
| Environment      | All secrets in .env, never commit             |

### Input Validation Schemas (Complete)

```typescript
// schemas/auth.schema.ts
import { z } from "zod";

// Password requirements: 8+ chars, uppercase, lowercase, number
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(100, "Password must be less than 100 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  email: z
    .string()
    .email("Invalid email format")
    .max(255, "Email must be less than 255 characters")
    .toLowerCase(), // Normalize email
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email format").toLowerCase(),
  password: z.string().min(1, "Password is required"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
```

```typescript
// schemas/games.schema.ts
import { z } from "zod";

export const gameFilterSchema = z.object({
  type: z.enum(["SPORTS", "CASINO"]).optional(),
  sport: z
    .string()
    .max(50)
    .regex(/^[a-zA-Z\s]+$/)
    .optional(),
  provider: z.string().max(100).optional(),
  search: z
    .string()
    .max(100)
    .transform((val) => val.trim())
    .optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const gameIdSchema = z.object({
  id: z.string().uuid("Invalid game ID format"),
});

export const favoriteParamsSchema = z.object({
  gameId: z.string().uuid("Invalid game ID format"),
});

export type GameFilterInput = z.infer<typeof gameFilterSchema>;
```

### Validation Middleware

```typescript
// middleware/validate.middleware.ts
import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

type ValidationTarget = "body" | "query" | "params";

export const validate =
  (schema: AnyZodObject, target: ValidationTarget = "body") =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await schema.parseAsync(req[target]);
      req[target] = data; // Replace with sanitized data
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: error.errors[0].message,
            details: error.errors.map((e) => ({
              field: e.path.join("."),
              message: e.message,
            })),
          },
        });
      }
      next(error);
    }
  };

// Usage in routes:
// router.post('/register', validate(registerSchema), authController.register);
// router.get('/games', validate(gameFilterSchema, 'query'), gamesController.list);
```

### JWT Middleware (Production-Ready)

```typescript
// middleware/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { prisma } from "../config/database";

const JWT_SECRET = process.env.JWT_SECRET!;

interface JWTPayload {
  userId: string;
  iat: number;
  exp: number;
}

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      userId?: string;
      user?: { id: string; email: string; name: string };
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. Extract token from header
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: {
          code: "MISSING_TOKEN",
          message: "Authorization header must be: Bearer <token>",
        },
      });
    }

    const token = authHeader.slice(7); // Remove 'Bearer '

    // 2. Verify token signature and expiration
    const payload = jwt.verify(token, JWT_SECRET) as JWTPayload;

    // 3. Optional: Verify user still exists (catches deleted accounts)
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true, name: true },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: {
          code: "USER_NOT_FOUND",
          message: "User no longer exists",
        },
      });
    }

    // 4. Attach user info to request
    req.userId = payload.userId;
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res.status(401).json({
        success: false,
        error: {
          code: "TOKEN_EXPIRED",
          message: "Token has expired. Please login again.",
        },
      });
    }

    if (error instanceof JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        error: {
          code: "INVALID_TOKEN",
          message: "Token is invalid or malformed",
        },
      });
    }

    next(error);
  }
};

// Optional: Middleware for routes that work with or without auth
export const optionalAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return next(); // Continue without auth
  }

  try {
    const token = authHeader.slice(7);
    const payload = jwt.verify(token, JWT_SECRET) as JWTPayload;
    req.userId = payload.userId;
  } catch {
    // Invalid token, continue without auth
  }
  next();
};
```

### JWT Utilities

```typescript
// utils/jwt.ts
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = "7d";

if (!JWT_SECRET || JWT_SECRET.length < 32) {
  throw new Error("JWT_SECRET must be at least 32 characters long");
}

export interface TokenPayload {
  userId: string;
}

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
    algorithm: "HS256",
  });
};

export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
};

export const decodeToken = (token: string): TokenPayload | null => {
  try {
    return jwt.decode(token) as TokenPayload;
  } catch {
    return null;
  }
};
```

### Rate Limiting Configuration

```typescript
// middleware/rateLimiter.middleware.ts
import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

// Custom key generator - use IP + user agent fingerprint
const keyGenerator = (req: Request): string => {
  const ip = req.ip || req.socket.remoteAddress || "unknown";
  const userAgent = req.headers["user-agent"] || "unknown";
  return `${ip}-${userAgent.slice(0, 50)}`;
};

// Custom error response
const rateLimitResponse = (req: Request, res: Response) => {
  res.status(429).json({
    success: false,
    error: {
      code: "RATE_LIMIT_EXCEEDED",
      message: "Too many requests. Please try again later.",
      retryAfter: res.getHeader("Retry-After"),
    },
  });
};

// Strict limiter for auth endpoints (prevent brute force)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: "Too many login attempts. Please try again in 15 minutes.",
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false,
  keyGenerator,
  handler: rateLimitResponse,
  skipSuccessfulRequests: false, // Count all requests
});

// Stricter limiter for registration (prevent spam accounts)
export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 registrations per hour per IP
  message: "Too many accounts created. Please try again in an hour.",
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator,
  handler: rateLimitResponse,
});

// General API limiter (prevent abuse)
export const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // 100 requests per minute
  message: "Too many requests. Please slow down.",
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator,
  handler: rateLimitResponse,
  skip: (req) => {
    // Skip rate limiting for health checks
    return req.path === "/health";
  },
});

// Favorites-specific limiter (prevent toggle spam)
export const favoritesLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30, // 30 favorite toggles per minute
  message: "Too many favorite actions. Please slow down.",
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator,
  handler: rateLimitResponse,
});
```

### Applying Rate Limiters to Routes

```typescript
// routes/auth.routes.ts
import { Router } from "express";
import {
  authLimiter,
  registerLimiter,
} from "../middleware/rateLimiter.middleware";
import { validate } from "../middleware/validate.middleware";
import { registerSchema, loginSchema } from "../schemas/auth.schema";
import * as authController from "../controllers/auth.controller";

const router = Router();

router.post(
  "/register",
  registerLimiter, // Rate limit first
  validate(registerSchema), // Then validate
  authController.register
);

router.post("/login", authLimiter, validate(loginSchema), authController.login);

export default router;
```

```typescript
// routes/favorites.routes.ts
import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { favoritesLimiter } from "../middleware/rateLimiter.middleware";
import { validate } from "../middleware/validate.middleware";
import { favoriteParamsSchema } from "../schemas/games.schema";
import * as favoritesController from "../controllers/favorites.controller";

const router = Router();

// All routes require authentication
router.use(authMiddleware);

router.get("/", favoritesController.getFavorites);

router.post(
  "/:gameId",
  favoritesLimiter,
  validate(favoriteParamsSchema, "params"),
  favoritesController.addFavorite
);

router.delete(
  "/:gameId",
  favoritesLimiter,
  validate(favoriteParamsSchema, "params"),
  favoritesController.removeFavorite
);

export default router;
```

### CORS Configuration

```typescript
// config/cors.ts
import cors from "cors";

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

export const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      FRONTEND_URL,
      // Add staging/production URLs as needed
    ];

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow cookies
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  maxAge: 86400, // Cache preflight for 24 hours
};
```

### Password Hashing Service

```typescript
// services/password.service.ts
import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};
```

---

## Error Handling Strategy

### Backend Error Classes

```typescript
// utils/errors.ts
export class AppError extends Error {
  constructor(public statusCode: number, public code: string, message: string) {
    super(message);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(400, "VALIDATION_ERROR", message);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(401, "UNAUTHORIZED", message);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(404, "NOT_FOUND", `${resource} not found`);
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(409, "CONFLICT", message);
  }
}
```

### Global Error Handler

```typescript
// middleware/error.middleware.ts
import { ErrorRequestHandler } from "express";
import { AppError } from "../utils/errors";
import { ZodError } from "zod";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Zod validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: err.errors[0].message,
        details: err.errors,
      },
    });
  }

  // Custom app errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: { code: err.code, message: err.message },
    });
  }

  // Unknown errors
  console.error("Unhandled error:", err);
  return res.status(500).json({
    success: false,
    error: { code: "INTERNAL_ERROR", message: "Something went wrong" },
  });
};
```

### Frontend Error Handling

#### Error Boundary Component

```typescript
// components/ui/ErrorBoundary.tsx
import { Component, ErrorInfo, ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-[400px] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center p-8"
            >
              <div className="text-6xl mb-4">💥</div>
              <h2 className="text-xl font-display text-white mb-2">
                Something went wrong
              </h2>
              <p className="text-gray-400 mb-6">
                {this.state.error?.message || "An unexpected error occurred"}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg transition-colors"
              >
                Reload Page
              </button>
            </motion.div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
```

#### API Error Handler

```typescript
// api/client.ts
import axios, { AxiosError } from "axios";
import { storage } from "@/utils/storage";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor - attach token
apiClient.interceptors.request.use((config) => {
  const token = storage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - handle errors
apiClient.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError<{ error: { code: string; message: string } }>) => {
    // Handle 401 - token expired
    if (error.response?.status === 401) {
      storage.clearAuth();
      window.location.href = "/login";
      return Promise.reject(new Error("Session expired. Please login again."));
    }

    // Extract error message from API response
    const message =
      error.response?.data?.error?.message ||
      error.message ||
      "Network error. Please try again.";

    return Promise.reject(new Error(message));
  }
);
```

#### Form Validation with Zod

```typescript
// utils/validation.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain an uppercase letter")
    .regex(/[0-9]/, "Password must contain a number"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
```

#### Form Error Display Component

```typescript
// components/ui/Input.tsx
import { forwardRef, InputHTMLAttributes } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
        <input
          ref={ref}
          className={`
            w-full px-4 py-3 bg-white/5 border rounded-lg
            text-white placeholder-gray-500
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-cyan-500/50
            ${
              error
                ? "border-red-500 focus:ring-red-500/50"
                : "border-white/10 hover:border-white/20"
            }
            ${className}
          `}
          {...props}
        />
        <AnimatePresence mode="wait">
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm text-red-400 flex items-center gap-1"
            >
              <span>⚠</span> {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
```

#### Loading & Empty States

```typescript
// components/ui/Skeleton.tsx - Loading placeholder
export const GameSkeleton = () => (
  <div className="bg-white/5 rounded-xl overflow-hidden animate-pulse">
    <div className="h-40 bg-white/10" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-white/10 rounded w-3/4" />
      <div className="h-3 bg-white/10 rounded w-1/2" />
    </div>
  </div>
);

// components/ui/EmptyState.tsx - No data
export const EmptyState = ({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center py-16"
  >
    <div className="text-6xl mb-4 opacity-50">🎮</div>
    <h3 className="text-xl font-display text-white mb-2">{title}</h3>
    <p className="text-gray-400 mb-6 max-w-md mx-auto">{description}</p>
    {action}
  </motion.div>
);

// Usage in GameList
if (isLoading) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <GameSkeleton key={i} />
      ))}
    </div>
  );
}

if (!games.length) {
  return (
    <EmptyState
      title="No games found"
      description="Try adjusting your filters or search term"
      action={
        <button
          onClick={clearFilters}
          className="text-cyan-400 hover:underline"
        >
          Clear filters
        </button>
      }
    />
  );
}
```

---

## Frontend State Management

### Design Tokens & Theme

```typescript
// styles/theme.ts
export const theme = {
  colors: {
    // Dark luxury casino aesthetic
    bg: {
      primary: "#0A0A0F", // Deep black
      secondary: "#12121A", // Card backgrounds
      tertiary: "#1A1A25", // Elevated surfaces
    },
    accent: {
      primary: "#00F0FF", // Cyan neon (sports)
      secondary: "#FF3366", // Hot pink (casino)
      gold: "#FFD700", // Favorites/premium
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#8888AA",
      muted: "#555566",
    },
    status: {
      success: "#00CC88",
      error: "#FF4455",
      warning: "#FFAA00",
    },
  },
  fonts: {
    display: '"Clash Display", sans-serif', // Headlines
    body: '"Satoshi", sans-serif', // Body text
    mono: '"JetBrains Mono", monospace', // Data/stats
  },
  shadows: {
    glow: "0 0 20px rgba(0, 240, 255, 0.3)",
    card: "0 4px 24px rgba(0, 0, 0, 0.4)",
  },
} as const;
```

### Auth Context (Complete Implementation)

```typescript
// context/AuthContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/api/auth.api";
import { storage } from "@/utils/storage";
import { User } from "@/types";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: storage.getToken(),
    isAuthenticated: false,
    isLoading: true,
  });
  const navigate = useNavigate();

  // Hydrate user from token on mount
  useEffect(() => {
    const token = storage.getToken();
    const user = storage.getUser();
    if (token && user) {
      setState({ user, token, isAuthenticated: true, isLoading: false });
    } else {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    const { data } = await authApi.login({ email, password });
    storage.setToken(data.token);
    storage.setUser(data.user);
    setState({
      user: data.user,
      token: data.token,
      isAuthenticated: true,
      isLoading: false,
    });
    navigate("/games");
  };

  const register = async (name: string, email: string, password: string) => {
    const { data } = await authApi.register({ name, email, password });
    storage.setToken(data.token);
    storage.setUser(data.user);
    setState({
      user: data.user,
      token: data.token,
      isAuthenticated: true,
      isLoading: false,
    });
    navigate("/games");
  };

  const logout = () => {
    storage.clearAuth();
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
```

### React Query Configuration

```typescript
// main.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError: (error) => {
        // Global error handling via toast
        toast.error(error.message || "Something went wrong");
      },
    },
  },
});
```

### Games Hook with Filters & Pagination

```typescript
// hooks/useGames.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import { gamesApi } from "@/api/games.api";
import { GameFilters } from "@/types";

export const useGames = (filters: GameFilters) => {
  return useInfiniteQuery({
    queryKey: ["games", filters],
    queryFn: ({ pageParam = 1 }) =>
      gamesApi.getGames({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
  });
};

export const useGameSearch = (searchTerm: string) => {
  const debouncedSearch = useDebounce(searchTerm, 300);
  return useGames({ search: debouncedSearch });
};
```

### Favorites Hook with Optimistic Updates

```typescript
// hooks/useFavorites.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { favoritesApi } from "@/api/favorites.api";
import { useToast } from "@/context/ToastContext";

export const useFavorites = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const favoritesQuery = useQuery({
    queryKey: ["favorites"],
    queryFn: favoritesApi.getFavorites,
  });

  const addFavorite = useMutation({
    mutationFn: (gameId: string) => favoritesApi.addFavorite(gameId),
    // Optimistic update
    onMutate: async (gameId) => {
      await queryClient.cancelQueries({ queryKey: ["favorites"] });
      const previous = queryClient.getQueryData(["favorites"]);

      // Optimistically add to favorites
      queryClient.setQueryData(["favorites"], (old: any) => ({
        ...old,
        data: [...(old?.data || []), { gameId, id: "temp-" + gameId }],
      }));

      return { previous };
    },
    onError: (err, gameId, context) => {
      queryClient.setQueryData(["favorites"], context?.previous);
      toast.error("Failed to add favorite");
    },
    onSuccess: () => {
      toast.success("Added to favorites!");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  const removeFavorite = useMutation({
    mutationFn: (gameId: string) => favoritesApi.removeFavorite(gameId),
    onMutate: async (gameId) => {
      await queryClient.cancelQueries({ queryKey: ["favorites"] });
      const previous = queryClient.getQueryData(["favorites"]);

      queryClient.setQueryData(["favorites"], (old: any) => ({
        ...old,
        data: old?.data?.filter((f: any) => f.gameId !== gameId) || [],
      }));

      return { previous };
    },
    onError: (err, gameId, context) => {
      queryClient.setQueryData(["favorites"], context?.previous);
      toast.error("Failed to remove favorite");
    },
    onSuccess: () => {
      toast.success("Removed from favorites");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  const isFavorite = (gameId: string) => {
    return (
      favoritesQuery.data?.data?.some((f: any) => f.gameId === gameId) ?? false
    );
  };

  return {
    favorites: favoritesQuery.data?.data || [],
    isLoading: favoritesQuery.isLoading,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
};
```

### Toast Notification Context

```typescript
// context/ToastContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextValue {
  toast: {
    success: (message: string) => void;
    error: (message: string) => void;
    info: (message: string) => void;
  };
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (type: ToastType, message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const toast = {
    success: (message: string) => addToast("success", message),
    error: (message: string) => addToast("error", message),
    info: (message: string) => addToast("info", message),
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className={`px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm ${
                t.type === "success"
                  ? "bg-green-500/90 text-white"
                  : t.type === "error"
                  ? "bg-red-500/90 text-white"
                  : "bg-cyan-500/90 text-white"
              }`}
            >
              {t.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};
```

### Protected Routes

```typescript
// components/auth/AuthGuard.tsx
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Spinner } from "@/components/ui/Spinner";

export const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
```

---

## Implementation Phases

### Phase 1: Project Setup (Day 1 - 8 hours)

#### Hour 1: Backend Initialization (9:00 - 10:00)

**Tasks:**

- [ ] Create `backend/` directory
- [ ] Run `npm init -y`
- [ ] Install dependencies:
  ```bash
  npm install express cors dotenv helmet jsonwebtoken bcrypt zod express-rate-limit
  npm install -D typescript @types/node @types/express @types/cors @types/jsonwebtoken @types/bcrypt ts-node-dev
  ```
- [ ] Create `tsconfig.json` with strict mode
- [ ] Create folder structure: `src/{config,controllers,middleware,routes,services,schemas,utils,types}`

**Acceptance Criteria:**

- ✅ `npm run dev` starts without errors (empty Express app)
- ✅ TypeScript compiles with no errors
- ✅ Folder structure matches project architecture (including controllers/)

#### Hour 2: Prisma & Database Setup (10:00 - 11:00)

**Tasks:**

- [ ] Install Prisma: `npm install prisma @prisma/client`
- [ ] Initialize Prisma: `npx prisma init`
- [ ] Create PostgreSQL database (local or Docker)
- [ ] Configure `DATABASE_URL` in `.env`
- [ ] Write `schema.prisma` with User, Game, Favorite models
- [ ] Run `npx prisma migrate dev --name init`

**Acceptance Criteria:**

- ✅ `npx prisma studio` opens and shows empty tables
- ✅ All three models (User, Game, Favorite) exist
- ✅ Indexes created for type, sport, provider, userId

#### Hour 3: Express Server Foundation (11:00 - 12:00)

**Tasks:**

- [ ] Create `src/index.ts` with Express app
- [ ] Configure middleware: `cors()`, `express.json()`, `helmet()`
- [ ] Create `config/env.ts` for environment validation
- [ ] Create `config/database.ts` for Prisma client singleton
- [ ] Add health check endpoint: `GET /health`
- [ ] Create npm scripts: `dev`, `build`, `start`

**Acceptance Criteria:**

- ✅ Server starts on PORT from .env (default 3001)
- ✅ `GET /health` returns `{ status: 'ok', timestamp: Date }`
- ✅ CORS allows frontend origin
- ✅ Invalid JSON returns 400 error

#### Hour 4: Error Handling & Response Utils (12:00 - 13:00)

**Tasks:**

- [ ] Create `utils/errors.ts` with AppError classes
- [ ] Create `middleware/error.middleware.ts` global handler
- [ ] Create `utils/response.ts` for consistent API responses
- [ ] Add 404 handler for unknown routes
- [ ] Test error handling with intentional errors

**Acceptance Criteria:**

- ✅ All errors return `{ success: false, error: { code, message } }`
- ✅ Zod errors return 400 with field details
- ✅ Unknown routes return 404
- ✅ Unhandled errors return 500 (no stack trace in production)

**--- LUNCH BREAK (13:00 - 14:00) ---**

#### Hour 5: Frontend Initialization (14:00 - 15:00)

**Tasks:**

- [ ] Create Vite project: `npm create vite@latest frontend -- --template react-ts`
- [ ] Install dependencies:
  ```bash
  npm install @tanstack/react-query axios react-router-dom framer-motion zod
  npm install -D tailwindcss postcss autoprefixer @types/node
  ```
- [ ] Initialize Tailwind: `npx tailwindcss init -p`
- [ ] Configure path aliases in `vite.config.ts`
- [ ] Create folder structure matching architecture

**Acceptance Criteria:**

- ✅ `npm run dev` shows Vite welcome page
- ✅ `@/` alias resolves to `src/`
- ✅ Tailwind classes work (test with `bg-red-500`)

#### Hour 6: Tailwind Theme & Design Tokens (15:00 - 16:00)

**Tasks:**

- [ ] Configure custom colors in `tailwind.config.js`
- [ ] Add custom fonts (Clash Display, Satoshi)
- [ ] Create `src/index.css` with CSS variables
- [ ] Create `styles/theme.ts` with design tokens
- [ ] Create `utils/cn.ts` for className merging

**Acceptance Criteria:**

- ✅ Custom colors available: `bg-bg-primary`, `text-accent-primary`
- ✅ Custom fonts load: `font-display`, `font-body`
- ✅ Dark theme applied by default

#### Hour 7: Core Providers & Routing (16:00 - 17:00)

**Tasks:**

- [ ] Create `api/client.ts` with Axios instance
- [ ] Create `context/AuthContext.tsx` (skeleton)
- [ ] Create `context/ToastContext.tsx` (skeleton)
- [ ] Set up React Query provider in `main.tsx`
- [ ] Set up React Router with placeholder routes
- [ ] Create `components/auth/AuthGuard.tsx`

**Acceptance Criteria:**

- ✅ App renders without errors
- ✅ Routes: `/login`, `/register`, `/games`, `/favorites`
- ✅ Protected routes redirect to `/login`
- ✅ React Query DevTools visible in development

#### Hour 8: Environment & Git Setup (17:00 - 18:00)

**Tasks:**

- [ ] Create `backend/.env.example` with all variables
- [ ] Create `frontend/.env.example`
- [ ] Create root `.gitignore` (node_modules, .env, dist)
- [ ] Create root `README.md` with setup instructions
- [ ] Initialize git repository
- [ ] Make initial commit: `feat: project initialization`

**Acceptance Criteria:**

- ✅ Both apps start with only `.env.example` copied to `.env`
- ✅ No secrets committed to git
- ✅ README has clear setup steps
- ✅ Clean git history with meaningful commit

#### Day 1 Checkpoint Verification

```bash
# Backend verification
cd backend
npm run dev
# Should see: "Server running on port 3001"
curl http://localhost:3001/health
# Should return: { "status": "ok", "timestamp": "..." }

# Frontend verification
cd frontend
npm run dev
# Should open browser to localhost:5173
# Should see dark themed page with custom fonts
```

### Phase 2: Database & Seed Data (Day 2 Morning - 4 hours)

#### Hour 1: Prisma Schema (9:00 - 10:00)

**Tasks:**

- [ ] Review `schema.prisma` from Claude.md specification
- [ ] Ensure User model has all fields (id, name, email, password, timestamps)
- [ ] Ensure Game model has sports + casino fields with proper optionals
- [ ] Ensure Favorite model has unique constraint on [userId, gameId]
- [ ] Add all indexes (type, sport, provider, userId)
- [ ] Run `npx prisma format` to validate syntax

**Acceptance Criteria:**

- ✅ Schema matches Claude.md Database Schema section exactly
- ✅ `npx prisma validate` passes with no errors
- ✅ All @@map annotations correct (users, games, favorites)

#### Hour 2: Database Migration (10:00 - 11:00)

**Tasks:**

- [ ] Ensure PostgreSQL is running (Docker or local)
- [ ] Verify DATABASE_URL in `.env` is correct
- [ ] Run `npx prisma migrate dev --name init`
- [ ] Verify migration created in `prisma/migrations/`
- [ ] Open `npx prisma studio` and verify tables
- [ ] Generate Prisma client: `npx prisma generate`

**Acceptance Criteria:**

- ✅ Migration completes without errors
- ✅ Prisma Studio shows User, Game, Favorite tables
- ✅ All columns and indexes visible in studio
- ✅ Prisma client types available in IDE

#### Hour 3: Seed Script (11:00 - 12:00)

**Tasks:**

- [ ] Create `prisma/seed.ts` from Claude.md Seed Data section
- [ ] Add 20 sports matches (Cricket IPL/BBL, Football EPL/La Liga, Tennis ATP)
- [ ] Add 20 casino games (Evolution, Pragmatic Play, NetEnt)
- [ ] Add test user with hashed password
- [ ] Configure `package.json` prisma seed command
- [ ] Run `npx prisma db seed`

**Acceptance Criteria:**

- ✅ Seed completes: "Created 20 sports matches, 20 casino games, 1 test user"
- ✅ Prisma Studio shows 40 games + 1 user
- ✅ Test user: test@example.com / Test1234
- ✅ Seed is idempotent (clears before inserting)

#### Hour 4: Database Service & Types (12:00 - 13:00)

**Tasks:**

- [ ] Create `src/config/database.ts` with Prisma singleton
- [ ] Create `src/types/index.ts` with shared interfaces
- [ ] Test database connection in `src/index.ts`
- [ ] Add graceful shutdown for Prisma connection
- [ ] **Commit**: `feat: add database schema and seed data`

**Acceptance Criteria:**

- ✅ App connects to database on startup (log: "Database connected")
- ✅ App disconnects cleanly on SIGTERM
- ✅ Types export User, Game, Favorite interfaces

**--- LUNCH BREAK (13:00 - 14:00) ---**

### Phase 3: Authentication API (Day 2 Afternoon - 4 hours)

#### Hour 5: Auth Schemas & Password Service (14:00 - 15:00)

**Tasks:**

- [ ] Create `src/schemas/auth.schema.ts` with registerSchema, loginSchema
- [ ] Create `src/services/password.service.ts` with hash/compare functions
- [ ] Create `src/utils/jwt.ts` with generate/verify/decode functions
- [ ] Test password hashing in isolation
- [ ] Test JWT generation/verification in isolation

**Acceptance Criteria:**

- ✅ Password "Test1234" hashes to 60-char bcrypt string
- ✅ JWT contains userId and expires in 7 days
- ✅ Invalid JWT throws JsonWebTokenError
- ✅ Expired JWT throws TokenExpiredError

#### Hour 6: Auth Service (15:00 - 16:00)

**Tasks:**

- [ ] Create `src/services/auth.service.ts`
- [ ] Implement `register(name, email, password)` → { user, token }
- [ ] Implement `login(email, password)` → { user, token }
- [ ] Handle duplicate email (throw ConflictError)
- [ ] Handle invalid credentials (throw UnauthorizedError)
- [ ] Never return password field in user object

**Acceptance Criteria:**

- ✅ Register creates user with hashed password
- ✅ Register returns user (no password) + JWT token
- ✅ Login verifies password and returns token
- ✅ Duplicate email throws 409 ConflictError
- ✅ Wrong password throws 401 UnauthorizedError

#### Hour 7: Auth Controller & Routes (16:00 - 17:00)

**Tasks:**

- [ ] Create `src/controllers/auth.controller.ts`
- [ ] Implement `register` handler (call service, format response)
- [ ] Implement `login` handler (call service, format response)
- [ ] Create `src/routes/auth.routes.ts`
- [ ] Apply registerLimiter to /register
- [ ] Apply authLimiter to /login
- [ ] Apply validate middleware with schemas

**Acceptance Criteria:**

- ✅ POST /api/auth/register → 201 + { user, token }
- ✅ POST /api/auth/login → 200 + { user, token }
- ✅ Invalid input → 400 with Zod error details
- ✅ Rate limit triggers after 5 login attempts

#### Hour 8: Auth Middleware & Testing (17:00 - 18:00)

**Tasks:**

- [ ] Create `src/middleware/auth.middleware.ts` (production version)
- [ ] Verify user exists in database (catch deleted accounts)
- [ ] Attach user object to req.user
- [ ] Test full auth flow with Postman/Thunder Client:
  - Register new user
  - Login with credentials
  - Access protected route with token
  - Verify 401 without token
- [ ] **Commit**: `feat: implement JWT authentication`

**Acceptance Criteria:**

- ✅ Valid token → req.userId and req.user populated
- ✅ Missing token → 401 MISSING_TOKEN
- ✅ Invalid token → 401 INVALID_TOKEN
- ✅ Expired token → 401 TOKEN_EXPIRED
- ✅ Deleted user token → 401 USER_NOT_FOUND

### Phase 4: Games API (Day 2 Evening - 3 hours)

#### Hour 9: Games Service (18:00 - 19:00)

**Tasks:**

- [ ] Create `src/schemas/games.schema.ts` with filter schemas
- [ ] Create `src/services/games.service.ts`
- [ ] Implement `getGames(filters)` with pagination
- [ ] Build dynamic Prisma where clause from filters
- [ ] Implement `getGameById(id)`
- [ ] Calculate totalPages from count

**Acceptance Criteria:**

- ✅ No filters → returns all 40 games (paginated)
- ✅ type=SPORTS → returns only sports matches
- ✅ sport=Cricket → returns only cricket matches
- ✅ provider=Evolution → returns only Evolution games
- ✅ search=Mumbai → returns matches containing "Mumbai"
- ✅ Pagination returns correct page/totalPages

#### Hour 10: Games Controller & Routes (19:00 - 20:00)

**Tasks:**

- [ ] Create `src/controllers/games.controller.ts`
- [ ] Implement `getGames` handler with query param parsing
- [ ] Implement `getGameById` handler
- [ ] Create `src/routes/games.routes.ts`
- [ ] Apply authMiddleware to all routes
- [ ] Apply validate middleware for query params

**Acceptance Criteria:**

- ✅ GET /api/games → 200 + { games, pagination }
- ✅ GET /api/games?type=CASINO → filtered results
- ✅ GET /api/games/:id → 200 + single game
- ✅ GET /api/games/:invalidId → 404 NOT_FOUND
- ✅ All routes require valid JWT

#### Hour 11: Games API Testing (20:00 - 21:00)

**Tasks:**

- [ ] Test all filter combinations in Postman
- [ ] Test pagination (page=1, page=2, limit=5)
- [ ] Test search with partial matches
- [ ] Test combined filters (type + sport)
- [ ] Verify response format matches API spec
- [ ] **Commit**: `feat: implement games API with filtering`

**Acceptance Criteria:**

- ✅ All filter combinations work correctly
- ✅ Pagination calculates totalPages correctly
- ✅ Search is case-insensitive
- ✅ Empty results return empty array (not error)

### Phase 5: Favorites API (Day 3 Morning - 3 hours)

#### Hour 1: Favorites Service (9:00 - 10:00)

**Tasks:**

- [ ] Create `src/services/favorites.service.ts`
- [ ] Implement `getFavorites(userId)` → favorites with game data
- [ ] Implement `addFavorite(userId, gameId)` → favorite
- [ ] Implement `removeFavorite(userId, gameId)` → void
- [ ] Handle game not found (throw NotFoundError)
- [ ] Handle duplicate favorite (throw ConflictError)

**Acceptance Criteria:**

- ✅ getFavorites returns array with nested game objects
- ✅ addFavorite creates favorite and returns it
- ✅ addFavorite with invalid gameId → 404
- ✅ addFavorite duplicate → 409 CONFLICT
- ✅ removeFavorite deletes the record
- ✅ removeFavorite with non-existent → 404

#### Hour 2: Favorites Controller & Routes (10:00 - 11:00)

**Tasks:**

- [ ] Create `src/controllers/favorites.controller.ts`
- [ ] Implement `getFavorites`, `addFavorite`, `removeFavorite` handlers
- [ ] Create `src/routes/favorites.routes.ts`
- [ ] Apply authMiddleware to all routes
- [ ] Apply favoritesLimiter to POST/DELETE
- [ ] Apply validate middleware for gameId param

**Acceptance Criteria:**

- ✅ GET /api/favorites → 200 + user's favorites
- ✅ POST /api/favorites/:gameId → 201 + new favorite
- ✅ DELETE /api/favorites/:gameId → 200 + success message
- ✅ Invalid UUID format → 400 validation error
- ✅ Rate limit triggers after 30 toggles/minute

#### Hour 3: Integration & Full Backend Test (11:00 - 12:00)

**Tasks:**

- [ ] Mount all routes in `src/index.ts`
- [ ] Test complete user flow:
  1. Register new user
  2. Login and get token
  3. Fetch games list
  4. Add game to favorites
  5. Fetch favorites (should include game)
  6. Remove from favorites
  7. Fetch favorites (should be empty)
- [ ] Test error scenarios (401, 404, 409)
- [ ] **Commit**: `feat: implement favorites API`

**Acceptance Criteria:**

- ✅ Complete CRUD flow works end-to-end
- ✅ All error codes match API specification
- ✅ Response format consistent across all endpoints
- ✅ Backend ready for frontend integration

#### Day 2-3 Backend Checkpoint

```bash
# Full backend test sequence
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"new@test.com","password":"Test1234"}'
# → 201 { success: true, data: { user, token } }

# Use token for subsequent requests
TOKEN="<token from above>"

curl http://localhost:3001/api/games \
  -H "Authorization: Bearer $TOKEN"
# → 200 { success: true, data: { games: [...], pagination: {...} } }

curl http://localhost:3001/api/games?type=SPORTS&sport=Cricket \
  -H "Authorization: Bearer $TOKEN"
# → 200 filtered cricket matches

curl -X POST http://localhost:3001/api/favorites/<gameId> \
  -H "Authorization: Bearer $TOKEN"
# → 201 { success: true, data: { favorite: {...} } }
```

### Phase 6: Frontend Implementation (Day 3-4)

#### Day 3 Morning: Project Setup & Design System

- [ ] Initialize Vite + React + TypeScript project
- [ ] Install dependencies: `@tanstack/react-query`, `axios`, `react-router-dom`, `framer-motion`, `zod`, `tailwindcss`
- [ ] Configure Tailwind with custom theme (colors, fonts, shadows)
- [ ] Add custom fonts: Clash Display + Satoshi (Google Fonts or Fontsource)
- [ ] Create CSS variables in `index.css` for design tokens
- [ ] Set up path aliases in `vite.config.ts` (`@/` → `src/`)
- [ ] **Commit**: `feat: initialize frontend with design system`

#### Day 3 Afternoon: Core Infrastructure

- [ ] Create API client with Axios interceptors
- [ ] Implement `AuthContext` with token persistence
- [ ] Create `ToastContext` for notifications
- [ ] Set up React Query provider with default config
- [ ] Build `AuthGuard` component for protected routes
- [ ] Configure React Router with auth protection
- [ ] **Commit**: `feat: add auth context and API client`

#### Day 3 Evening: Auth Pages

- [ ] Build `Input` component with error states and animations
- [ ] Build `Button` component with variants (primary, secondary, ghost)
- [ ] Create `LoginForm` with Zod validation
- [ ] Create `RegisterForm` with password requirements
- [ ] Style `LoginPage` with centered card layout
- [ ] Style `RegisterPage` matching login aesthetic
- [ ] Add form submission loading states
- [ ] **Commit**: `feat: implement auth pages with validation`

#### Day 4 Morning: Games List

- [ ] Create `useGames` hook with infinite query
- [ ] Build `GameCard` component with hover effects
- [ ] Build `GameSkeleton` loading placeholder
- [ ] Create `GameList` with responsive grid
- [ ] Implement infinite scroll with `useInfiniteScroll` hook
- [ ] Add `EmptyState` for no results
- [ ] **Commit**: `feat: add games list with infinite scroll`

#### Day 4 Afternoon: Filters & Search

- [ ] Build `GameFilter` with tab/button styles
- [ ] Create `GameSearch` with debounced input
- [ ] Connect filters to URL query params
- [ ] Add filter persistence across navigation
- [ ] Style filter controls with neon accents
- [ ] **Commit**: `feat: implement game filtering and search`

#### Day 4 Evening: Favorites

- [ ] Create `useFavorites` hook with optimistic updates
- [ ] Build `FavoriteButton` with heart animation
- [ ] Create `FavoritesPage` with favorites grid
- [ ] Add "Show favorites only" filter toggle
- [ ] Wire up toast notifications for add/remove
- [ ] **Commit**: `feat: add favorites with optimistic updates`

#### Day 4 Night: Polish & Accessibility

- [ ] Add keyboard navigation to all interactive elements
- [ ] Ensure focus indicators are visible (cyan ring)
- [ ] Add `aria-label` to icon buttons
- [ ] Test with screen reader (VoiceOver/NVDA)
- [ ] Add responsive breakpoints (mobile nav)
- [ ] Performance audit with Lighthouse
- [ ] **Commit**: `feat: add accessibility and responsive design`

#### Accessibility Checklist (WCAG 2.1 AA)

- [ ] All interactive elements keyboard accessible
- [ ] Focus states clearly visible
- [ ] Color contrast ratio ≥ 4.5:1 for text
- [ ] Form inputs have associated labels
- [ ] Error messages linked to inputs with `aria-describedby`
- [ ] Loading states announced to screen readers
- [ ] Skip navigation link for keyboard users

#### Core Web Vitals Targets

- [ ] LCP (Largest Contentful Paint): < 2.5s
- [ ] FID (First Input Delay): < 100ms
- [ ] CLS (Cumulative Layout Shift): < 0.1

### Phase 7: Polish & Deployment (Day 5)

#### Morning: Final Polish (9:00 - 12:00)

- [ ] Review all error messages for user-friendliness
- [ ] Add loading skeletons to all data-fetching components
- [ ] Test responsive design on mobile viewport sizes
- [ ] Fix any console errors or warnings
- [ ] Verify all protected routes redirect correctly
- [ ] **Commit**: `fix: polish UI and error handling`

#### Afternoon: Documentation (13:00 - 16:00)

- [ ] Write comprehensive `README.md`:
  - Project description
  - Tech stack overview
  - Setup instructions (backend + frontend)
  - Environment variables list
  - API endpoints documentation
  - Screenshots (optional but recommended)
- [ ] Create `.env.example` files in both directories
- [ ] Review commit history for clarity
- [ ] **Commit**: `docs: add README and setup instructions`

#### Evening: Bonus Features (16:00 - 18:00) - Optional

- [ ] Docker setup with `docker-compose.yml`
- [ ] Simple unit tests (auth service, validation)
- [ ] Deploy backend to Render
- [ ] Deploy frontend to Vercel/Netlify
- [ ] **Commit**: `feat: add Docker and deployment config`

#### Final Checklist

- [ ] All core features working (auth, games, favorites)
- [ ] Filtering by sport/provider functional
- [ ] Favorites persist after refresh
- [ ] Loading, empty, and error states displayed
- [ ] Responsive on mobile
- [ ] README complete with setup instructions
- [ ] Clean commit history
- [ ] No secrets in git history

---

## Code Standards

- **TypeScript strict mode** - No `any` types, enable strict null checks
- **Consistent imports** - Absolute imports with path aliases
- **Error-first** - Validate early, fail fast
- **Type-safe** - Zod for runtime, TypeScript for compile-time
- **Meaningful names** - Descriptive function and variable names
- **Single responsibility** - Small, focused functions
- **DRY** - Extract reusable utilities and components

---

## Environment Variables

```bash
# backend/.env.example
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/arenaview
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
FRONTEND_URL=http://localhost:5173

# frontend/.env.example
VITE_API_URL=http://localhost:3001/api
```

---

## Seed Data (Complete)

```typescript
// prisma/seed.ts
import { PrismaClient, GameType } from "@prisma/client";

const prisma = new PrismaClient();

const sportsGames = [
  // === CRICKET - IPL (6 matches) ===
  {
    name: "Mumbai Indians vs Chennai Super Kings",
    type: GameType.SPORTS,
    sport: "Cricket",
    league: "IPL",
    teamA: "Mumbai Indians",
    teamB: "Chennai Super Kings",
    startTime: new Date("2026-01-15T14:00:00Z"),
    imageUrl: "/images/cricket/mi-csk.jpg",
  },
  {
    name: "Royal Challengers Bangalore vs Kolkata Knight Riders",
    type: GameType.SPORTS,
    sport: "Cricket",
    league: "IPL",
    teamA: "Royal Challengers Bangalore",
    teamB: "Kolkata Knight Riders",
    startTime: new Date("2026-01-16T14:00:00Z"),
    imageUrl: "/images/cricket/rcb-kkr.jpg",
  },
  {
    name: "Delhi Capitals vs Rajasthan Royals",
    type: GameType.SPORTS,
    sport: "Cricket",
    league: "IPL",
    teamA: "Delhi Capitals",
    teamB: "Rajasthan Royals",
    startTime: new Date("2026-01-17T18:00:00Z"),
    imageUrl: "/images/cricket/dc-rr.jpg",
  },
  // === CRICKET - BBL (4 matches) ===
  {
    name: "Sydney Sixers vs Melbourne Stars",
    type: GameType.SPORTS,
    sport: "Cricket",
    league: "BBL",
    teamA: "Sydney Sixers",
    teamB: "Melbourne Stars",
    startTime: new Date("2026-01-18T08:00:00Z"),
    imageUrl: "/images/cricket/sixers-stars.jpg",
  },
  {
    name: "Perth Scorchers vs Brisbane Heat",
    type: GameType.SPORTS,
    sport: "Cricket",
    league: "BBL",
    teamA: "Perth Scorchers",
    teamB: "Brisbane Heat",
    startTime: new Date("2026-01-19T10:00:00Z"),
    imageUrl: "/images/cricket/scorchers-heat.jpg",
  },
  {
    name: "Adelaide Strikers vs Hobart Hurricanes",
    type: GameType.SPORTS,
    sport: "Cricket",
    league: "BBL",
    teamA: "Adelaide Strikers",
    teamB: "Hobart Hurricanes",
    startTime: new Date("2026-01-20T09:30:00Z"),
    imageUrl: "/images/cricket/strikers-hurricanes.jpg",
  },
  {
    name: "Melbourne Renegades vs Sydney Thunder",
    type: GameType.SPORTS,
    sport: "Cricket",
    league: "BBL",
    teamA: "Melbourne Renegades",
    teamB: "Sydney Thunder",
    startTime: new Date("2026-01-21T08:00:00Z"),
    imageUrl: "/images/cricket/renegades-thunder.jpg",
  },
  // === FOOTBALL - EPL (5 matches) ===
  {
    name: "Manchester United vs Liverpool",
    type: GameType.SPORTS,
    sport: "Football",
    league: "EPL",
    teamA: "Manchester United",
    teamB: "Liverpool",
    startTime: new Date("2026-01-22T15:00:00Z"),
    imageUrl: "/images/football/manu-liv.jpg",
  },
  {
    name: "Arsenal vs Chelsea",
    type: GameType.SPORTS,
    sport: "Football",
    league: "EPL",
    teamA: "Arsenal",
    teamB: "Chelsea",
    startTime: new Date("2026-01-23T17:30:00Z"),
    imageUrl: "/images/football/ars-che.jpg",
  },
  {
    name: "Manchester City vs Tottenham Hotspur",
    type: GameType.SPORTS,
    sport: "Football",
    league: "EPL",
    teamA: "Manchester City",
    teamB: "Tottenham Hotspur",
    startTime: new Date("2026-01-24T20:00:00Z"),
    imageUrl: "/images/football/mci-tot.jpg",
  },
  {
    name: "Newcastle United vs Aston Villa",
    type: GameType.SPORTS,
    sport: "Football",
    league: "EPL",
    teamA: "Newcastle United",
    teamB: "Aston Villa",
    startTime: new Date("2026-01-25T15:00:00Z"),
    imageUrl: "/images/football/new-avl.jpg",
  },
  {
    name: "Brighton vs West Ham United",
    type: GameType.SPORTS,
    sport: "Football",
    league: "EPL",
    teamA: "Brighton & Hove Albion",
    teamB: "West Ham United",
    startTime: new Date("2026-01-26T14:00:00Z"),
    imageUrl: "/images/football/bri-whu.jpg",
  },
  // === FOOTBALL - LA LIGA (3 matches) ===
  {
    name: "Real Madrid vs Barcelona",
    type: GameType.SPORTS,
    sport: "Football",
    league: "La Liga",
    teamA: "Real Madrid",
    teamB: "FC Barcelona",
    startTime: new Date("2026-01-27T20:00:00Z"),
    imageUrl: "/images/football/rma-bar.jpg",
  },
  {
    name: "Atletico Madrid vs Sevilla",
    type: GameType.SPORTS,
    sport: "Football",
    league: "La Liga",
    teamA: "Atletico Madrid",
    teamB: "Sevilla FC",
    startTime: new Date("2026-01-28T18:00:00Z"),
    imageUrl: "/images/football/atm-sev.jpg",
  },
  {
    name: "Valencia vs Real Sociedad",
    type: GameType.SPORTS,
    sport: "Football",
    league: "La Liga",
    teamA: "Valencia CF",
    teamB: "Real Sociedad",
    startTime: new Date("2026-01-29T21:00:00Z"),
    imageUrl: "/images/football/val-rso.jpg",
  },
  // === TENNIS - ATP (4 matches) ===
  {
    name: "Djokovic vs Alcaraz",
    type: GameType.SPORTS,
    sport: "Tennis",
    league: "ATP Finals",
    teamA: "Novak Djokovic",
    teamB: "Carlos Alcaraz",
    startTime: new Date("2026-01-30T13:00:00Z"),
    imageUrl: "/images/tennis/djokovic-alcaraz.jpg",
  },
  {
    name: "Sinner vs Medvedev",
    type: GameType.SPORTS,
    sport: "Tennis",
    league: "ATP Finals",
    teamA: "Jannik Sinner",
    teamB: "Daniil Medvedev",
    startTime: new Date("2026-01-31T15:30:00Z"),
    imageUrl: "/images/tennis/sinner-medvedev.jpg",
  },
  {
    name: "Zverev vs Rublev",
    type: GameType.SPORTS,
    sport: "Tennis",
    league: "Australian Open",
    teamA: "Alexander Zverev",
    teamB: "Andrey Rublev",
    startTime: new Date("2026-02-01T09:00:00Z"),
    imageUrl: "/images/tennis/zverev-rublev.jpg",
  },
  {
    name: "Tsitsipas vs Fritz",
    type: GameType.SPORTS,
    sport: "Tennis",
    league: "Australian Open",
    teamA: "Stefanos Tsitsipas",
    teamB: "Taylor Fritz",
    startTime: new Date("2026-02-02T11:00:00Z"),
    imageUrl: "/images/tennis/tsitsipas-fritz.jpg",
  },
];

const casinoGames = [
  // === EVOLUTION - Live Casino (7 games) ===
  {
    name: "Lightning Roulette",
    type: GameType.CASINO,
    provider: "Evolution",
    category: "Live Casino",
    imageUrl: "/images/casino/lightning-roulette.jpg",
  },
  {
    name: "Crazy Time",
    type: GameType.CASINO,
    provider: "Evolution",
    category: "Live Casino",
    imageUrl: "/images/casino/crazy-time.jpg",
  },
  {
    name: "Immersive Roulette",
    type: GameType.CASINO,
    provider: "Evolution",
    category: "Live Casino",
    imageUrl: "/images/casino/immersive-roulette.jpg",
  },
  {
    name: "Dream Catcher",
    type: GameType.CASINO,
    provider: "Evolution",
    category: "Live Casino",
    imageUrl: "/images/casino/dream-catcher.jpg",
  },
  {
    name: "Monopoly Live",
    type: GameType.CASINO,
    provider: "Evolution",
    category: "Live Casino",
    imageUrl: "/images/casino/monopoly-live.jpg",
  },
  {
    name: "Lightning Blackjack",
    type: GameType.CASINO,
    provider: "Evolution",
    category: "Live Casino",
    imageUrl: "/images/casino/lightning-blackjack.jpg",
  },
  {
    name: "XXXtreme Lightning Roulette",
    type: GameType.CASINO,
    provider: "Evolution",
    category: "Live Casino",
    imageUrl: "/images/casino/xxxtreme-roulette.jpg",
  },
  // === PRAGMATIC PLAY - Slots (7 games) ===
  {
    name: "Sweet Bonanza",
    type: GameType.CASINO,
    provider: "Pragmatic Play",
    category: "Slots",
    imageUrl: "/images/casino/sweet-bonanza.jpg",
  },
  {
    name: "Gates of Olympus",
    type: GameType.CASINO,
    provider: "Pragmatic Play",
    category: "Slots",
    imageUrl: "/images/casino/gates-olympus.jpg",
  },
  {
    name: "The Dog House Megaways",
    type: GameType.CASINO,
    provider: "Pragmatic Play",
    category: "Slots",
    imageUrl: "/images/casino/dog-house.jpg",
  },
  {
    name: "Big Bass Bonanza",
    type: GameType.CASINO,
    provider: "Pragmatic Play",
    category: "Slots",
    imageUrl: "/images/casino/big-bass.jpg",
  },
  {
    name: "Starlight Princess",
    type: GameType.CASINO,
    provider: "Pragmatic Play",
    category: "Slots",
    imageUrl: "/images/casino/starlight-princess.jpg",
  },
  {
    name: "Sugar Rush",
    type: GameType.CASINO,
    provider: "Pragmatic Play",
    category: "Slots",
    imageUrl: "/images/casino/sugar-rush.jpg",
  },
  {
    name: "Fruit Party",
    type: GameType.CASINO,
    provider: "Pragmatic Play",
    category: "Slots",
    imageUrl: "/images/casino/fruit-party.jpg",
  },
  // === NETENT - Mixed (6 games) ===
  {
    name: "Starburst",
    type: GameType.CASINO,
    provider: "NetEnt",
    category: "Slots",
    imageUrl: "/images/casino/starburst.jpg",
  },
  {
    name: "Gonzo's Quest",
    type: GameType.CASINO,
    provider: "NetEnt",
    category: "Slots",
    imageUrl: "/images/casino/gonzos-quest.jpg",
  },
  {
    name: "Dead or Alive 2",
    type: GameType.CASINO,
    provider: "NetEnt",
    category: "Slots",
    imageUrl: "/images/casino/dead-or-alive.jpg",
  },
  {
    name: "Blackjack Professional",
    type: GameType.CASINO,
    provider: "NetEnt",
    category: "Table Games",
    imageUrl: "/images/casino/blackjack-pro.jpg",
  },
  {
    name: "European Roulette Pro",
    type: GameType.CASINO,
    provider: "NetEnt",
    category: "Table Games",
    imageUrl: "/images/casino/euro-roulette.jpg",
  },
  {
    name: "Baccarat Professional",
    type: GameType.CASINO,
    provider: "NetEnt",
    category: "Table Games",
    imageUrl: "/images/casino/baccarat-pro.jpg",
  },
];

async function main() {
  console.log("🌱 Starting seed...");

  // Clear existing data
  await prisma.favorite.deleteMany();
  await prisma.game.deleteMany();
  await prisma.user.deleteMany();
  console.log("✓ Cleared existing data");

  // Insert sports games
  const sportsResult = await prisma.game.createMany({
    data: sportsGames,
  });
  console.log(`✓ Created ${sportsResult.count} sports matches`);

  // Insert casino games
  const casinoResult = await prisma.game.createMany({
    data: casinoGames,
  });
  console.log(`✓ Created ${casinoResult.count} casino games`);

  // Create test user (password: "Test1234")
  const bcrypt = await import("bcrypt");
  const hashedPassword = await bcrypt.hash("Test1234", 12);

  await prisma.user.create({
    data: {
      name: "Test User",
      email: "test@example.com",
      password: hashedPassword,
    },
  });
  console.log("✓ Created test user (test@example.com / Test1234)");

  console.log("\n🎉 Seed completed successfully!");
  console.log(`   - ${sportsGames.length} sports matches`);
  console.log(`   - ${casinoGames.length} casino games`);
  console.log(`   - 1 test user`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

### Running the Seed

```bash
# Add to package.json scripts
"prisma": {
  "seed": "ts-node prisma/seed.ts"
}

# Run seed
npx prisma db seed

# Or run directly
npx ts-node prisma/seed.ts
```

### Seed Data Summary

| Type                  | League/Provider | Count  |
| --------------------- | --------------- | ------ |
| **Sports - Cricket**  | IPL             | 3      |
| **Sports - Cricket**  | BBL             | 4      |
| **Sports - Football** | EPL             | 5      |
| **Sports - Football** | La Liga         | 3      |
| **Sports - Tennis**   | ATP             | 4      |
| **Casino**            | Evolution       | 7      |
| **Casino**            | Pragmatic Play  | 7      |
| **Casino**            | NetEnt          | 6      |
| **Total**             |                 | **40** |

---

## Success Criteria

- [ ] User can register and login
- [ ] JWT authentication works correctly
- [ ] Games list displays with proper loading states
- [ ] Filtering by sport/provider works
- [ ] User can favorite/unfavorite games
- [ ] Favorites persist after page refresh
- [ ] Proper error handling throughout
- [ ] Responsive design on mobile
- [ ] Clean commit history
- [ ] Comprehensive README
