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
 *
 * @param {UseGamesOptions} options - Configuration options for the games query
 * @param {string} [options.type] - Filter by game type (SPORTS or CASINO)
 * @param {string} [options.search] - Search query string to filter games by name
 * @param {string} [options.sport] - Filter by sport type (e.g., Cricket, Football)
 * @param {number} [options.limit] - Number of games per page (default: 12)
 *
 * @returns {Object} Game data and pagination helpers
 * @returns {Game[]} games - Array of all fetched games across pages
 * @returns {boolean} hasMore - Whether more games are available to load
 * @returns {number} total - Total count of games matching the filters
 * @returns {boolean} isLoading - Whether the initial query is loading
 * @returns {boolean} isFetchingNextPage - Whether the next page is being fetched
 * @returns {boolean} hasNextPage - Whether there is a next page available
 * @returns {Function} fetchNextPage - Function to fetch the next page of games
 * @returns {Error|null} error - Any error that occurred during fetching
 * @returns {Function} refetch - Function to refetch games with current options
 *
 * @example
 * const { games, hasMore, fetchNextPage, isLoading } = useGames({
 *   type: 'SPORTS',
 *   limit: 12
 * });
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
