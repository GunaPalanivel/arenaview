import { Router } from "express";
import {
  authLimiter,
  registerLimiter,
} from "../middleware/rateLimiter.middleware";
import { validate } from "../middleware/validate.middleware";
import { registerSchema, loginSchema } from "../schemas/auth.schema";
import * as authController from "../controllers/auth.controller";

const router = Router();

// POST /api/auth/register
router.post(
  "/register",
  registerLimiter,
  validate(registerSchema),
  authController.register
);

// POST /api/auth/login
router.post("/login", authLimiter, validate(loginSchema), authController.login);

export default router;
