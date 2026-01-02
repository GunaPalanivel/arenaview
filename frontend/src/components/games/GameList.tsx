import React from "react";
import GameCard from "./GameCard";
import GameSkeleton from "./GameSkeleton";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { Game } from "@/hooks/useGames";

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <GameSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Show empty state
  if (games.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-96 text-center">
        <div>
          <div className="text-5xl mb-4">🎮</div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            No Games Found
          </h3>
          <p className="text-slate-600">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Games Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {games.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            onFavoriteToggle={onFavoriteToggle}
            onPlay={onPlay}
            isLoadingFavorite={isLoadingFavorite === game.id}
          />
        ))}
      </div>

      {/* Loading more indicator */}
      {isFetchingNextPage && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400" />
        </div>
      )}

      {/* Intersection observer target for infinite scroll */}
      {hasMore && (
        <div
          ref={observerTarget}
          className="h-px"
          aria-label="Load more games indicator"
        />
      )}

      {/* No more games message */}
      {!hasMore && games.length > 0 && (
        <div className="text-center py-8">
          <p className="text-slate-600 font-medium">
            You've reached the end of the list
          </p>
        </div>
      )}
    </div>
  );
};

export default GameList;
