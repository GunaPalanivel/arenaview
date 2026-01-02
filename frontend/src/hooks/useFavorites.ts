import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import type { Game } from "./useGames";

interface Favorite {
  id: string;
  gameId: string;
  userId: string;
  createdAt: string;
  game: Game;
}

interface FavoritesResponse {
  success: boolean;
  message: string;
  data: {
    favorites: Favorite[];
  };
}

/**
 * Hook to manage user's favorite games
 */
export function useFavorites() {
  const queryClient = useQueryClient();

  // Fetch user's favorite games
  const favoritesQuery = useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const response = await apiClient.get<FavoritesResponse>("/favorites");
      return response.data.data.favorites;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Get set of favorite game IDs for quick lookup
  const favoriteGameIds = new Set(
    favoritesQuery.data?.map((fav) => fav.gameId) ?? []
  );

  // Toggle favorite mutation
  const toggleFavoriteMutation = useMutation({
    mutationFn: async (gameId: string) => {
      const isFavorited = favoriteGameIds.has(gameId);
      if (isFavorited) {
        // Remove from favorites - use gameId directly
        await apiClient.delete(`/favorites/${gameId}`);
      } else {
        // Add to favorites - use gameId in path
        await apiClient.post(`/favorites/${gameId}`);
      }
    },
    onSuccess: () => {
      // Invalidate favorites to refetch
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      // Invalidate games query to refresh isFavorite status
      queryClient.invalidateQueries({ queryKey: ["games"] });
    },
  });

  const isFavorite = (gameId: string) => favoriteGameIds.has(gameId);

  return {
    favorites: favoritesQuery.data ?? [],
    isFavorite,
    toggleFavorite: toggleFavoriteMutation.mutate,
    isToggling: toggleFavoriteMutation.isPending,
    isLoading: favoritesQuery.isLoading,
    error: favoritesQuery.error || toggleFavoriteMutation.error,
    refetch: favoritesQuery.refetch,
  };
}
