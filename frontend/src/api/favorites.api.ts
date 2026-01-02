import { apiClient } from "./client";
import type { Game } from "./games.api";

export interface Favorite {
  id: string;
  userId: string;
  gameId: string;
  game: Game;
  createdAt: string;
}

export interface FavoritesResponse {
  success: boolean;
  data: {
    favorites: Favorite[];
  };
}

export interface FavoriteResponse {
  success: boolean;
  data: {
    favorite: Favorite;
  };
}

export interface RemoveFavoriteResponse {
  success: boolean;
  data: {
    message: string;
  };
}

export const favoritesApi = {
  getFavorites: async (): Promise<FavoritesResponse> => {
    const response = await apiClient.get<FavoritesResponse>("/favorites");
    return response.data;
  },

  addFavorite: async (gameId: string): Promise<FavoriteResponse> => {
    const response = await apiClient.post<FavoriteResponse>(
      `/favorites/${gameId}`
    );
    return response.data;
  },

  removeFavorite: async (gameId: string): Promise<RemoveFavoriteResponse> => {
    const response = await apiClient.delete<RemoveFavoriteResponse>(
      `/favorites/${gameId}`
    );
    return response.data;
  },
};
