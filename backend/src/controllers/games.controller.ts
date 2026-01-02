import { Request, Response, NextFunction } from "express";
import { GamesService } from "../services/games.service";
import { GamesFilterInput } from "../schemas/games.schema";
import { successResponse } from "../utils/response";

export const getGames = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filters = req.query as unknown as GamesFilterInput;
    const data = await GamesService.getGames(filters);
    successResponse(res, data, "Games retrieved");
  } catch (error) {
    next(error);
  }
};

export const getGameById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const game = await GamesService.getGameById(id);
    successResponse(res, { game }, "Game retrieved");
  } catch (error) {
    next(error);
  }
};
