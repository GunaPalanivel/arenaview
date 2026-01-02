import { useInfiniteQuery } from "@tanstack/react-query";
import { apiClient } from "@/api/client";

export interface Game {
  id: string;
  name: string;
  type: "SPORTS" | "CASINO";
  sport?: string | null;
  league?: string | null;
  teamA?: string | null;
  teamB?: string | null;
  startTime?: string | null;
  provider?: string | null;
  category?: string | null;
  imageUrl?: string | null;
  isActive: boolean;
  isFavorite?: boolean;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    games: Game[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

interface UseGamesOptions {
  type?: "SPORTS" | "CASINO";
  search?: string;
  sport?: string;
  limit?: number;
}

const GAMES_LIMIT = 12;

/**
 * Hook to fetch games with infinite scroll support
 */
export function useGames(options: UseGamesOptions = {}) {
  const { type, search, sport, limit = GAMES_LIMIT } = options;

  const query = useInfiniteQuery({
    queryKey: ["games", { type, search, sport }],
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams({
        page: String(pageParam),
        limit: String(limit),
      });
      if (type) params.set("type", type);
      if (search) params.set("search", search);
      if (sport) params.set("sport", sport);

      const response = await apiClient.get<ApiResponse>(
        `/games?${params.toString()}`
      );
      return response.data.data; // Extract the nested data
    },
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;
      if (page < totalPages) {
        return page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  // Flatten all games from all pages
  const games = query.data?.pages.flatMap((page) => page.games) ?? [];
  const hasMore = query.hasNextPage ?? false;
  const total =
    query.data?.pages[query.data.pages.length - 1]?.pagination.total ?? 0;

  return {
    games,
    hasMore,
    total,
    isLoading: query.isLoading,
    isFetchingNextPage: query.isFetchingNextPage,
    hasNextPage: query.hasNextPage,
    fetchNextPage: query.fetchNextPage,
    error: query.error,
    refetch: query.refetch,
  };
}
