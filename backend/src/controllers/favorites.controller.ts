import { Request, Response, NextFunction } from "express";
import { FavoritesService } from "../services/favorites.service";
import { successResponse } from "../utils/response";

export const getFavorites = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const favorites = await FavoritesService.getFavorites(userId);
    successResponse(res, { favorites }, "Favorites retrieved");
  } catch (error) {
    next(error);
  }
};

export const addFavorite = async (
  req: Request<{ gameId: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const { gameId } = req.params;
    const favorite = await FavoritesService.addFavorite(userId, gameId);
    successResponse(res, { favorite }, "Game added to favorites", 201);
  } catch (error) {
    next(error);
  }
};

export const removeFavorite = async (
  req: Request<{ gameId: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const { gameId } = req.params;
    await FavoritesService.removeFavorite(userId, gameId);
    successResponse(res, {}, "Game removed from favorites");
  } catch (error) {
    next(error);
  }
};
