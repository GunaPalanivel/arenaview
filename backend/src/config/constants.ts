/**
 * Application-wide constants
 */

// Authentication & Security
export const SECURITY = {
  BCRYPT_SALT_ROUNDS: 12,
  JWT_EXPIRES_IN: "7d",
  PASSWORD_MAX_LENGTH: 128,
} as const;

// Rate Limiting (in milliseconds)
export const RATE_LIMITS = {
  AUTH_WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  AUTH_MAX_REQUESTS: 5, // 5 login attempts per window

  REGISTRATION_WINDOW_MS: 60 * 60 * 1000, // 1 hour
  REGISTRATION_MAX_REQUESTS: 3, // 3 registration attempts per window

  API_WINDOW_MS: 1 * 60 * 1000, // 1 minute
  API_MAX_REQUESTS: 100, // 100 requests per window

  FAVORITES_WINDOW_MS: 1 * 60 * 1000, // 1 minute
  FAVORITES_MAX_REQUESTS: 30, // 30 favorite toggles per window
} as const;

// Server Configuration
export const SERVER = {
  DEFAULT_PORT: 3001,
  DEFAULT_FRONTEND_URL: "http://localhost:5173",
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;
