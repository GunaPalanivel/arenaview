import { prisma } from "../config/database";
import { NotFoundError, ConflictError } from "../utils/errors";

export class FavoritesService {
  /**
   * Get all favorites for a user with game data
   */
  static async getFavorites(userId: string) {
    const favorites = await prisma.favorite.findMany({
      where: { userId },
      include: {
        game: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return favorites;
  }

  /**
   * Add a game to user's favorites
   */
  static async addFavorite(userId: string, gameId: string) {
    // Check if game exists
    const game = await prisma.game.findUnique({
      where: { id: gameId },
    });

    if (!game) {
      throw new NotFoundError("Game not found");
    }

    // Check if favorite already exists
    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_gameId: {
          userId,
          gameId,
        },
      },
    });

    if (existingFavorite) {
      throw new ConflictError("This game is already in your favorites");
    }

    // Create favorite
    const favorite = await prisma.favorite.create({
      data: {
        userId,
        gameId,
      },
      include: {
        game: true,
      },
    });

    return favorite;
  }

  /**
   * Remove a game from user's favorites
   */
  static async removeFavorite(userId: string, gameId: string) {
    // Check if favorite exists
    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_gameId: {
          userId,
          gameId,
        },
      },
    });

    if (!favorite) {
      throw new NotFoundError("Favorite not found");
    }

    // Delete favorite
    await prisma.favorite.delete({
      where: {
        userId_gameId: {
          userId,
          gameId,
        },
      },
    });

    return null;
  }
}
