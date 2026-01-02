import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/api/client";

interface Favorite {
  id: string;
  gameId: string;
  userId: string;
  createdAt: string;
}

/**
 * Hook to manage user's favorite games
 */
export function useFavorites() {
  const queryClient = useQueryClient();

  // Fetch user's favorite games
  const favoritesQuery = useQuery<Favorite[]>({
    queryKey: ["favorites"],
    queryFn: async () => {
      const response = await apiClient.get<Favorite[]>("/favorites");
      return response.data;
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
        // Remove from favorites
        const favorite = favoritesQuery.data?.find(
          (fav) => fav.gameId === gameId
        );
        if (favorite) {
          await apiClient.delete(`/favorites/${favorite.id}`);
        }
      } else {
        // Add to favorites
        await apiClient.post("/favorites", { gameId });
      }
    },
    onSuccess: (_, gameId) => {
      // Update the favorites list optimistically
      queryClient.setQueryData<Favorite[]>(["favorites"], (old) => {
        if (!old) return old;
        const isFavorited = favoriteGameIds.has(gameId);
        if (isFavorited) {
          return old.filter((fav) => fav.gameId !== gameId);
        } else {
          return [
            ...old,
            {
              id: `${gameId}-${Date.now()}`,
              gameId,
              userId: "",
              createdAt: new Date().toISOString(),
            },
          ];
        }
      });

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
