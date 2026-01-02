import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "@/api/client";

export interface Game {
  id: string;
  name: string;
  description: string;
  type: "sports" | "casino";
  sport?: string;
  provider: string;
  imageUrl?: string;
  rtp?: number;
  volatility?: "low" | "medium" | "high";
  minBet?: number;
  maxBet?: number;
  isFavorite?: boolean;
}

interface GamesResponse {
  data: Game[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

interface UseGamesOptions {
  type?: "sports" | "casino";
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

  const query = useInfiniteQuery<GamesResponse>({
    queryKey: ["games", { type, search, sport }],
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams({
        page: String(pageParam),
        limit: String(limit),
        ...(type && { type }),
        ...(search && { search }),
        ...(sport && { sport }),
      });

      const response = await api.get<GamesResponse>(
        `/games?${params.toString()}`
      );
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.hasMore) {
        return lastPage.pagination.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  // Flatten all games from all pages
  const games = query.data?.pages.flatMap((page) => page.data) ?? [];
  const hasMore =
    query.data?.pages[query.data.pages.length - 1]?.pagination.hasMore ?? true;
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
