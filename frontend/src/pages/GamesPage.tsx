import type React from "react";
import { useCallback } from "react";
import { useToast } from "@/context/ToastContext";
import { FilterBar } from "@/components/filters/FilterBar";
import GameList from "@/components/games/GameList";
import { GameCardHero } from "@/components/games/GameCardHero";
import { useGames, type Game } from "@/hooks/useGames";
import { useFavorites } from "@/hooks/useFavorites";
import { useFilters } from "@/hooks/useFilters";

const GamesPage: React.FC = () => {
  const { showToast } = useToast();
  const { filters, clearAllFilters } = useFilters();

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
    search: filters.search,
    type: (filters.type as "SPORTS" | "CASINO" | undefined) || undefined,
    sport: filters.sport,
  });

  // Manage favorites
  const { isFavorite, toggleFavorite, isToggling } = useFavorites();

  const handleLoadMore = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const handleFilterChange = () => {
    // Reset to first page when filters change
    fetchNextPage();
  };

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
    showToast(`Launching ${game.name}...`, "info");
  };

  // Map games with favorite status
  const gamesWithFavorites = games.map((game) => ({
    ...game,
    isFavorite: isFavorite(game.id),
  }));

  // Get featured game (first game or highest rated)
  const featuredGame = gamesWithFavorites[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="container-page pb-0 pt-8 sm:pt-12">
        <div className="space-y-4 mb-8">
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-bold font-display text-gradient-primary">
              Game Arena
            </h1>
            <p className="text-lg text-slate-600">
              Discover{" "}
              <span className="font-semibold text-slate-900">
                premium gaming
              </span>{" "}
              experiences with our curated collection of sports and casino
              games.
            </p>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-4 py-4">
            <div className="card-base backdrop-blur-xl">
              <div className="text-2xl font-bold text-cyan-600">
                {games.length}+
              </div>
              <p className="text-sm text-slate-600">Games Available</p>
            </div>
            <div className="card-base backdrop-blur-xl">
              <div className="text-2xl font-bold text-violet-600">24/7</div>
              <p className="text-sm text-slate-600">Live Streaming</p>
            </div>
            <div className="card-base backdrop-blur-xl">
              <div className="text-2xl font-bold text-emerald-600">100K+</div>
              <p className="text-sm text-slate-600">Active Players</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar Section */}
      <section className="container-page sticky top-20 z-30 py-6 bg-gradient-to-b from-slate-100/95 to-transparent backdrop-blur-md">
        <FilterBar onFiltersChange={handleFilterChange} />
      </section>

      {/* Featured Game Section */}
      {featuredGame && !filters.type && !filters.sport && !filters.search && (
        <section className="container-page py-8">
          <h2 className="text-2xl font-bold mb-6">Featured Game</h2>
          <GameCardHero
            game={featuredGame}
            onPlay={() => handlePlayGame(featuredGame)}
            onFavorite={() => handleFavoriteToggle(featuredGame.id)}
            isFavorite={featuredGame.isFavorite}
            featured
          />
        </section>
      )}

      {/* Main Content */}
      <main className="container-page py-8">
        {error && (
          <div
            role="alert"
            className="mb-8 p-4 bg-red-50/50 border border-red-200/50 rounded-2xl glass animate-slide-down"
          >
            <p className="text-red-700 font-medium">
              ⚠️ Failed to load games. Please try again later.
            </p>
          </div>
        )}

        {/* Games List/Grid */}
        {gamesWithFavorites.length > 0 ? (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">
                {filters.type || filters.sport || filters.search
                  ? "Search Results"
                  : "All Games"}
              </h2>
              <GameList
                games={gamesWithFavorites}
                isLoading={isLoading}
                isFetchingNextPage={isFetchingNextPage}
                hasMore={hasMore}
                onLoadMore={handleLoadMore}
                onFavoriteToggle={handleFavoriteToggle}
                onPlay={handlePlayGame}
                isLoadingFavorite={isToggling ? games[0]?.id ?? null : null}
              />
            </div>
          </div>
        ) : isLoading ? (
          // Loading skeleton
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="card-base h-80 animate-pulse" />
            ))}
          </div>
        ) : (
          // Empty state
          <div className="text-center py-16 px-6">
            <div className="inline-block p-4 mb-4 glass rounded-full">
              <div className="text-4xl">🎮</div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              No games found
            </h3>
            <p className="text-slate-600 mb-6">
              {filters.type || filters.sport || filters.search
                ? "Try adjusting your search or filters"
                : "No games available at the moment"}
            </p>
            {(filters.type || filters.sport || filters.search) && (
              <button onClick={clearAllFilters} className="btn-primary">
                Clear Filters
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default GamesPage;
