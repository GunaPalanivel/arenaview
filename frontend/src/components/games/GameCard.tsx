import React from "react";
import { Heart } from "lucide-react";
import { type Game } from "@/hooks/useGames";
import Button from "@/components/ui/Button";

interface GameCardProps {
  game: Game;
  onFavoriteToggle?: (gameId: string) => void;
  onPlay?: (game: Game) => void;
  isLoadingFavorite?: boolean;
}

/**
 * GameCard - Displays a single game with image, info, and actions
 * Accessible with proper ARIA labels, keyboard navigation, and semantic HTML
 */
const GameCard: React.FC<GameCardProps> = ({
  game,
  onFavoriteToggle,
  onPlay,
  isLoadingFavorite = false,
}) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onFavoriteToggle?.(game.id);
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onPlay?.(game);
  };

  const favoriteAriaLabel = game.isFavorite
    ? `Remove ${game.name} from favorites`
    : `Add ${game.name} to favorites`;

  return (
    <article
      className="group h-full flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden border border-slate-100 hover:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400 focus-within:ring-offset-2"
      role="region"
      aria-label={`${game.name} game card`}
    >
      {/* Game Image */}
      <div className="relative w-full h-48 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
        {game.imageUrl ? (
          <img
            src={game.imageUrl}
            alt={`${game.name} game cover image`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            aria-hidden="true"
          >
            <div className="text-slate-400 text-center">
              <div className="text-2xl font-bold opacity-50">
                {game.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-xs mt-1">No Image</div>
            </div>
          </div>
        )}

        {/* Favorite Button - Fixed position overlay */}
        <button
          onClick={handleFavoriteClick}
          disabled={isLoadingFavorite}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/90 shadow-md hover:bg-white hover:shadow-lg transition-all duration-200 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-red-400"
          aria-label={favoriteAriaLabel}
          {...(game.isFavorite && { "aria-pressed": "true" })}
        >
          <Heart
            size={20}
            className={`transition-colors duration-200 ${
              game.isFavorite
                ? "fill-red-500 text-red-500"
                : "text-slate-400 hover:text-red-500"
            }`}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Game Info */}
      <div className="flex-1 p-4 flex flex-col">
        {/* Title */}
        <h3 className="font-bold text-slate-900 text-base line-clamp-2 mb-2">
          {game.name}
        </h3>

        {/* Type Badge */}
        <div className="flex gap-2 mb-3 flex-wrap">
          <span
            className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
              game.type === "SPORTS"
                ? "bg-cyan-100 text-cyan-700"
                : "bg-violet-100 text-violet-700"
            }`}
            aria-label={`Game type: ${
              game.type === "SPORTS" ? "Sports" : "Casino"
            }`}
          >
            {game.type === "SPORTS" ? "🏆 Sports" : "🎰 Casino"}
          </span>

          {game.sport && (
            <span
              className="inline-block px-2 py-1 text-xs font-medium rounded bg-slate-100 text-slate-700"
              aria-label={`Sport: ${game.sport}`}
            >
              {game.sport}
            </span>
          )}
        </div>

        {/* Provider & Teams */}
        <p className="text-sm text-slate-600 line-clamp-2 mb-3 flex-1">
          {game.teamA && game.teamB
            ? `${game.teamA} vs ${game.teamB}`
            : game.category || game.provider || "No description available"}
        </p>

        {/* Footer Info */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-3 pt-3 border-t border-slate-100 flex-wrap gap-2">
          {game.provider && (
            <span
              className="font-medium"
              aria-label={`Provider: ${game.provider}`}
            >
              {game.provider}
            </span>
          )}
          {game.league && (
            <span
              className="text-cyan-600 font-semibold"
              aria-label={`League: ${game.league}`}
            >
              {game.league}
            </span>
          )}
        </div>

        {/* Play Button */}
        <Button
          onClick={handlePlayClick}
          variant="primary"
          size="sm"
          className="w-full"
          aria-label={`Play ${game.name}`}
        >
          Play Now
        </Button>
      </div>
    </article>
  );
};

export default GameCard;
