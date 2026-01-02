import { prisma } from "../config/database";
import { NotFoundError } from "../utils/errors";
import { GamesFilterInput } from "../schemas/games.schema";
import { Prisma } from "@prisma/client";

export class GamesService {
  /**
   * Build dynamic Prisma where clause from filters
   */
  private static buildWhereClause(
    filters: GamesFilterInput
  ): Prisma.GameWhereInput {
    const where: Prisma.GameWhereInput = {};

    // Filter by game type (SPORTS or CASINO)
    if (filters.type) {
      where.type = filters.type;
    }

    // Filter by sport (Cricket, Football, Tennis)
    if (filters.sport) {
      where.sport = {
        contains: filters.sport,
        mode: "insensitive",
      };
    }

    // Filter by provider (Evolution, Pragmatic Play, etc.)
    if (filters.provider) {
      where.provider = {
        contains: filters.provider,
        mode: "insensitive",
      };
    }

    // Search across multiple fields (team names, game name, league)
    if (filters.search) {
      where.OR = [
        {
          name: {
            contains: filters.search,
            mode: "insensitive",
          },
        },
        {
          teamA: {
            contains: filters.search,
            mode: "insensitive",
          },
        },
        {
          teamB: {
            contains: filters.search,
            mode: "insensitive",
          },
        },
        {
          league: {
            contains: filters.search,
            mode: "insensitive",
          },
        },
      ];
    }

    return where;
  }

  /**
   * Get games with filters and pagination
   */
  static async getGames(filters: GamesFilterInput) {
    const where = this.buildWhereClause(filters);

    // Get total count for pagination
    const total = await prisma.game.count({ where });

    // Calculate pagination
    const skip = (filters.page - 1) * filters.limit;
    const totalPages = Math.ceil(total / filters.limit);

    // Get paginated games
    const games = await prisma.game.findMany({
      where,
      skip,
      take: filters.limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      games,
      pagination: {
        page: filters.page,
        limit: filters.limit,
        total,
        totalPages,
      },
    };
  }

  /**
   * Get single game by ID
   */
  static async getGameById(id: string) {
    const game = await prisma.game.findUnique({
      where: { id },
    });

    if (!game) {
      throw new NotFoundError("Game not found");
    }

    return game;
  }
}
