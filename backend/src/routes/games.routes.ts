import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { apiLimiter } from "../middleware/rateLimiter.middleware";
import { gamesFilterSchema, gameIdSchema } from "../schemas/games.schema";
import * as gamesController from "../controllers/games.controller";

const router = Router();

// GET /api/games - List games with filtering and pagination
router.get(
  "/",
  apiLimiter,
  authMiddleware,
  validate(gamesFilterSchema, "query"),
  gamesController.getGames
);

// GET /api/games/:id - Get single game by ID
router.get(
  "/:id",
  authMiddleware,
  validate(gameIdSchema, "params"),
  gamesController.getGameById
);

export default router;
