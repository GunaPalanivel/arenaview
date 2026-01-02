import { Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { prisma } from "../config/database";
import { UnauthorizedError } from "../utils/errors";

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
      user?: { id: string; name: string; email: string };
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedError("Missing authorization header");
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      throw new UnauthorizedError("Invalid authorization header format");
    }

    // Verify token
    let payload: JWTPayload;
    try {
      payload = jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedError("Token expired");
      }
      if (error instanceof JsonWebTokenError) {
        throw new UnauthorizedError("Invalid token");
      }
      throw error;
    }

    // Fetch user from database
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, name: true, email: true },
    });

    if (!user) {
      throw new UnauthorizedError("User not found");
    }

    // Attach to request
    req.userId = user.id;
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

// Optional auth middleware for public routes
export const optionalAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next();
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      return next();
    }

    // Try to verify token
    try {
      const payload = jwt.verify(token, JWT_SECRET) as JWTPayload;

      const user = await prisma.user.findUnique({
        where: { id: payload.userId },
        select: { id: true, name: true, email: true },
      });

      if (user) {
        req.userId = user.id;
        req.user = user;
      }
    } catch {
      // Ignore errors, continue as unauthenticated
    }

    next();
  } catch (error) {
    next(error);
  }
};
