import React from "react";
import { useToast } from "@/context/ToastContext";
import GameCard from "@/components/games/GameCard";
import GameSkeleton from "@/components/games/GameSkeleton";
import { FavoritesHeader } from "@/components/favorites/FavoritesHeader";
import { EmptyFavoritesState } from "@/components/favorites/EmptyFavoritesState";
import { useFavorites } from "@/hooks/useFavorites";
import { useGames, type Game } from "@/hooks/useGames";

const FavoritesPage: React.FC = () => {
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
    return <EmptyFavoritesState />;
  }

  const gameTypeCount = new Set(favoriteGames.map((g) => g.type)).size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <FavoritesHeader
        favoriteCount={favoriteGames.length}
        gameTypeCount={gameTypeCount}
      />

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
