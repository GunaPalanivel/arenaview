import React, { useState } from "react";
import { useToast } from "@/context/ToastContext";
import GameList from "@/components/games/GameList";
import { useGames, type Game } from "@/hooks/useGames";

const GamesPage: React.FC = () => {
  const { showToast } = useToast();
  const [loadingFavorite, setLoadingFavorite] = useState<string | null>(null);

  // Fetch games with infinite scroll
  const {
    games,
    hasMore,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    error,
  } = useGames({
    limit: 12,
  });

  const handleLoadMore = () => {
    fetchNextPage();
  };

  const handleFavoriteToggle = async (gameId: string) => {
    setLoadingFavorite(gameId);
    try {
      // TODO: Implement favorite toggle with API
      const game = games.find((g) => g.id === gameId);
      if (game) {
        showToast(
          game.isFavorite ? "Removed from favorites" : "Added to favorites",
          game.isFavorite ? "info" : "success"
        );
      }
    } catch (err) {
      showToast("Failed to update favorite status", "error");
    } finally {
      setLoadingFavorite(null);
    }
  };

  const handlePlayGame = (game: Game) => {
    // TODO: Implement game launch
    showToast(`Launching ${game.name}...`, "info");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold text-slate-900">Games</h1>
            <p className="text-slate-600">
              Explore our collection of{" "}
              {games.length > 0 ? games.length : "amazing"} sports and casino
              games
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">
              Failed to load games. Please try again later.
            </p>
          </div>
        )}

        <GameList
          games={games}
          isLoading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
          onFavoriteToggle={handleFavoriteToggle}
          onPlay={handlePlayGame}
          isLoadingFavorite={loadingFavorite}
          emptyMessage="No games available at the moment. Check back soon!"
        />
      </div>
    </div>
  );
};

export default GamesPage;
