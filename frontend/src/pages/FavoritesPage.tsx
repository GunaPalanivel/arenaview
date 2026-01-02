import React from "react";
import { useToast } from "@/context/ToastContext";
import GameCard from "@/components/games/GameCard";
import GameSkeleton from "@/components/games/GameSkeleton";
import { useFavorites } from "@/hooks/useFavorites";
import { useGames, type Game } from "@/hooks/useGames";

const FavoritesPage: React.FC = () => {
  const { showToast } = useToast();
  const {
    favorites,
    isFavorite,
    toggleFavorite,
    isLoading: isFavoritesLoading,
    isToggling,
  } = useFavorites();

  // Get all games to display favorite details
  const { games, isLoading: isGamesLoading } = useGames({ limit: 100 });

  const isLoading = isFavoritesLoading || isGamesLoading;

  // Filter games to only show favorites
  const favoriteGames = games
    .filter((game) => isFavorite(game.id))
    .map((game) => ({ ...game, isFavorite: true }));

  const handleFavoriteToggle = async (gameId: string) => {
    try {
      toggleFavorite(gameId);
      showToast("Removed from favorites", "success");
    } catch (err) {
      showToast("Failed to update favorite status", "error");
    }
  };

  const handlePlayGame = (game: Game) => {
    showToast(`Launching ${game.name}...`, "info");
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <h1 className="text-4xl font-bold text-slate-900">My Favorites</h1>
            <p className="text-slate-600 mt-2">
              Loading your favorite games...
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            role="status"
            aria-label="Loading favorites..."
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <GameSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (favoriteGames.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <h1 className="text-4xl font-bold text-slate-900">My Favorites</h1>
            <p className="text-slate-600 mt-2">
              Games you've marked as favorites
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div
            className="flex items-center justify-center min-h-96 text-center"
            role="status"
            aria-live="polite"
          >
            <div>
              <div className="text-6xl mb-4" aria-hidden="true">
                ❤️
              </div>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                No Favorites Yet
              </h2>
              <p className="text-slate-600 mb-6">
                Start exploring games and click the heart icon to add favorites!
              </p>
              <a
                href="/games"
                className="inline-flex items-center justify-center px-6 py-3 bg-cyan-400 text-white font-semibold rounded-lg hover:bg-cyan-500 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
              >
                Browse Games
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-slate-900">My Favorites</h1>
          <p className="text-slate-600 mt-2">
            {favoriteGames.length}{" "}
            {favoriteGames.length === 1 ? "game" : "games"} in your favorites
          </p>
        </div>
      </div>

      {/* Favorites Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <section
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          aria-label={`Favorites list showing ${favoriteGames.length} games`}
        >
          {favoriteGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onFavoriteToggle={handleFavoriteToggle}
              onPlay={handlePlayGame}
              isLoadingFavorite={isToggling}
            />
          ))}
        </section>
      </div>
    </div>
  );
};

export default FavoritesPage;
