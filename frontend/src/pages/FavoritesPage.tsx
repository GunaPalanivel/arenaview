import React from "react";
import { Heart, ArrowRight } from "lucide-react";
import { useToast } from "@/context/ToastContext";
import GameCard from "@/components/games/GameCard";
import GameSkeleton from "@/components/games/GameSkeleton";
import { useFavorites } from "@/hooks/useFavorites";
import { useGames, type Game } from "@/hooks/useGames";
import { useNavigate } from "react-router-dom";

const FavoritesPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const {
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container-page py-8 sm:py-12">
          <div className="space-y-2 mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold font-display text-gradient-secondary">
              My Favorites
            </h1>
            <p className="text-lg text-slate-600">
              Loading your favorite games...
            </p>
          </div>
        </div>
        <div className="container-page">
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
        <div className="container-page py-8 sm:py-12">
          <h1 className="text-4xl sm:text-5xl font-bold font-display text-gradient-secondary">
            My Favorites
          </h1>
          <p className="text-lg text-slate-600 mt-2">
            Games you've marked as favorites
          </p>
        </div>

        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center space-y-6 max-w-md">
            <div className="inline-block p-6 glass rounded-full">
              <Heart size={48} className="text-red-500 mx-auto" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">
                No Favorites Yet
              </h2>
              <p className="text-slate-600">
                Start exploring games and click the heart icon to add your
                favorites!
              </p>
            </div>
            <button
              onClick={() => navigate("/games")}
              className="btn-primary inline-flex items-center gap-2"
            >
              Browse Games
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="container-page py-8 sm:py-12">
        <div className="space-y-2 mb-8">
          <div className="flex items-center gap-3">
            <Heart className="text-red-500" size={32} fill="currentColor" />
            <h1 className="text-4xl sm:text-5xl font-bold font-display text-gradient-secondary">
              My Favorites
            </h1>
          </div>
          <p className="text-lg text-slate-600">
            {favoriteGames.length}{" "}
            {favoriteGames.length === 1 ? "game" : "games"} in your collection
          </p>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-4">
          <div className="card-base backdrop-blur-xl">
            <div className="text-2xl font-bold text-red-500">
              {favoriteGames.length}
            </div>
            <p className="text-sm text-slate-600">Favorite Games</p>
          </div>
          <div className="card-base backdrop-blur-xl">
            <div className="text-2xl font-bold text-cyan-600">
              {new Set(favoriteGames.map((g) => g.type)).size}
            </div>
            <p className="text-sm text-slate-600">Game Types</p>
          </div>
        </div>
      </div>

      {/* Favorites Grid */}
      <main className="container-page pb-12">
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
      </main>
    </div>
  );
};

export default FavoritesPage;
