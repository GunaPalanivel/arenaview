import React, { useState, useCallback } from "react";
import { useToast } from "@/context/ToastContext";
import GameSearch from "@/components/games/GameSearch";
import GameFilter, {
  type GameFilterOptions,
} from "@/components/games/GameFilter";
import GameList from "@/components/games/GameList";
import { useGames, type Game } from "@/hooks/useGames";
import { useFavorites } from "@/hooks/useFavorites";

const GamesPage: React.FC = () => {
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<GameFilterOptions>({});

  // Fetch games with infinite scroll, search, and filters
  const {
    games,
    hasMore,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    error,
  } = useGames({
    limit: 12,
    search: searchQuery,
    type: (filters.type || undefined) as "sports" | "casino" | undefined,
    sport: filters.sport,
  });

  // Manage favorites
  const { isFavorite, toggleFavorite, isToggling } = useFavorites();

  const handleLoadMore = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleFilterChange = useCallback((newFilters: GameFilterOptions) => {
    setFilters(newFilters);
  }, []);

  const handleFavoriteToggle = async (gameId: string) => {
    try {
      toggleFavorite(gameId);
      const willBeFavorite = !isFavorite(gameId);
      showToast(
        willBeFavorite ? "Added to favorites" : "Removed from favorites",
        "success"
      );
    } catch (err) {
      showToast("Failed to update favorite status", "error");
    }
  };

  const handlePlayGame = (game: Game) => {
    // TODO: Implement game launch
    showToast(`Launching ${game.name}...`, "info");
  };

  // Map games with favorite status
  const gamesWithFavorites = games.map((game) => ({
    ...game,
    isFavorite: isFavorite(game.id),
  }));

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col gap-2 mb-6">
            <h1 className="text-4xl font-bold text-slate-900">Games</h1>
            <p className="text-slate-600">
              Explore our collection of{" "}
              {games.length > 0 ? games.length : "amazing"} sports and casino
              games
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="space-y-4">
            <GameSearch
              onSearch={handleSearch}
              isLoading={isLoading}
              placeholder="Search games by name, sport, or provider..."
            />
            <GameFilter
              onFilterChange={handleFilterChange}
              selectedFilters={filters}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {error && (
          <div
            role="alert"
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
          >
            <p className="text-red-700 font-medium">
              Failed to load games. Please try again later.
            </p>
          </div>
        )}

        <GameList
          games={gamesWithFavorites}
          isLoading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
          onFavoriteToggle={handleFavoriteToggle}
          onPlay={handlePlayGame}
          isLoadingFavorite={isToggling ? games[0]?.id ?? null : null}
          emptyMessage={
            searchQuery || filters.type || filters.sport
              ? "No games match your search or filters. Try adjusting your criteria."
              : "No games available at the moment. Check back soon!"
          }
        />
      </div>
    </div>
  );
};

export default GamesPage;
