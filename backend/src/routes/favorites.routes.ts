import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { favoritesLimiter } from "../middleware/rateLimiter.middleware";
import { gameIdParamSchema } from "../schemas/favorites.schema";
import * as favoritesController from "../controllers/favorites.controller";

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// GET /api/favorites - Get user's favorites
router.get("/", favoritesController.getFavorites);

// POST /api/favorites/:gameId - Add game to favorites
router.post(
  "/:gameId",
  favoritesLimiter,
  validate(gameIdParamSchema, "params"),
  favoritesController.addFavorite
);

// DELETE /api/favorites/:gameId - Remove game from favorites
router.delete(
  "/:gameId",
  favoritesLimiter,
  validate(gameIdParamSchema, "params"),
  favoritesController.removeFavorite
);

export default router;
