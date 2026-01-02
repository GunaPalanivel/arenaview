import { apiClient } from "./client";

export interface Game {
  id: string;
  name: string;
  type: "SPORTS" | "CASINO";
  sport?: string | null;
  league?: string | null;
  provider?: string | null;
  homeTeam?: string | null;
  awayTeam?: string | null;
  matchDate?: string | null;
  createdAt: string;
}

export interface GamesFilters {
  type?: "SPORTS" | "CASINO";
  sport?: string;
  provider?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface GamesResponse {
  success: boolean;
  data: {
    games: Game[];
    pagination: {
      page: number;
      limit: number;
      totalGames: number;
      totalPages: number;
    };
  };
}

export interface GameResponse {
  success: boolean;
  data: {
    game: Game;
  };
}

export const gamesApi = {
  getGames: async (filters?: GamesFilters): Promise<GamesResponse> => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });
    }
    const response = await apiClient.get<GamesResponse>(
      `/games?${params.toString()}`
    );
    return response.data;
  },

  getGameById: async (id: string): Promise<GameResponse> => {
    const response = await apiClient.get<GameResponse>(`/games/${id}`);
    return response.data;
  },
};
