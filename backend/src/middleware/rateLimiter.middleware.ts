import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

// Extend Express Request type to include rateLimit
declare global {
  namespace Express {
    interface Request {
      rateLimit?: {
        limit: number;
        current: number;
        remaining: number;
        resetTime?: Date;
      };
    }
  }
}

// Custom key generator - use IP + user agent fingerprint
const keyGenerator = (req: Request): string => {
  const ip = req.ip || req.socket.remoteAddress || "unknown";
  const userAgent = req.get("user-agent") || "unknown";
  return `${ip}-${userAgent.slice(0, 50)}`;
};

// Custom error response
const rateLimitResponse = (req: Request, res: Response) => {
  res.status(429).json({
    success: false,
    message: "Too many requests, please try again later",
    retryAfter: req.rateLimit?.resetTime,
  });
};

// Strict limiter for auth endpoints (prevent brute force)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  keyGenerator,
  handler: rateLimitResponse,
  skipSuccessfulRequests: false, // Count all requests
  message: "Too many login attempts, please try again later",
});

// Stricter limiter for registration (prevent spam accounts)
export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 requests per window
  keyGenerator,
  handler: rateLimitResponse,
  message: "Too many registration attempts, please try again later",
});

// General API limiter (prevent abuse)
export const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // 100 requests per window
  keyGenerator,
  skipSuccessfulRequests: false,
  message: "Too many requests from this IP, please try again later",
});

// Favorites limiter (30 toggles per minute for POST/DELETE)
export const favoritesLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30, // 30 requests per window
  keyGenerator,
  handler: rateLimitResponse,
  skipSuccessfulRequests: false,
  message: "Too many favorite toggles, please try again later",
});
