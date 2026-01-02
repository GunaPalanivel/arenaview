import React from "react";
import GameCard from "./GameCard";
import GameSkeleton from "./GameSkeleton";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { type Game } from "@/hooks/useGames";

interface GameListProps {
  games: Game[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onFavoriteToggle?: (gameId: string) => void;
  onPlay?: (game: Game) => void;
  isLoadingFavorite?: string | null;
  emptyMessage?: string;
}

/**
 * GameList - Responsive grid of game cards with infinite scroll
 * Accessible with proper ARIA labels and semantic HTML
 */
const GameList: React.FC<GameListProps> = ({
  games,
  isLoading,
  isFetchingNextPage,
  hasMore,
  onLoadMore,
  onFavoriteToggle,
  onPlay,
  isLoadingFavorite,
  emptyMessage = "No games found. Try adjusting your filters.",
}) => {
  const observerTarget = useInfiniteScroll({
    onLoadMore,
    isLoading: isFetchingNextPage,
    hasMore,
    threshold: 200,
  });

  // Show skeleton while initial loading
  if (isLoading) {
    return (
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        role="status"
        aria-label="Loading games..."
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <GameSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Show empty state
  if (games.length === 0) {
    return (
      <div
        className="flex items-center justify-center min-h-96 text-center"
        role="status"
        aria-live="polite"
      >
        <div>
          <div className="text-5xl mb-4" aria-hidden="true">
            🎮
          </div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">
            No Games Found
          </h2>
          <p className="text-slate-600">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Games Grid */}
      <section
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        aria-label={`Games list showing ${games.length} games`}
      >
        {games.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            onFavoriteToggle={onFavoriteToggle}
            onPlay={onPlay}
            isLoadingFavorite={isLoadingFavorite === game.id}
          />
        ))}
      </section>

      {/* Loading more indicator */}
      {isFetchingNextPage && (
        <div
          className="flex justify-center py-8"
          role="status"
          aria-label="Loading more games..."
        >
          <div
            className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"
            aria-hidden="true"
          />
        </div>
      )}

      {/* Intersection observer target for infinite scroll */}
      {hasMore && (
        <div
          ref={observerTarget}
          className="h-px"
          role="status"
          aria-label="Scroll target for loading more games"
          aria-live="polite"
        />
      )}

      {/* No more games message */}
      {!hasMore && games.length > 0 && (
        <div className="text-center py-8" role="status" aria-live="polite">
          <p className="text-slate-600 font-medium">
            You've reached the end of the list
          </p>
        </div>
      )}
    </div>
  );
};

export default GameList;
