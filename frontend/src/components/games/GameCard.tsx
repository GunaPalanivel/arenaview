import React from "react";
import { Heart, Play } from "lucide-react";
import type { Game } from "@/hooks/useGames";
import { cn } from "@/utils/cn";

interface GameCardProps {
  game: Game;
  onFavoriteToggle?: (gameId: string) => void;
  onPlay?: (game: Game) => void;
  isLoadingFavorite?: boolean;
}

/**
 * GameCard - Enhanced with glassmorphism and gradients
 * Displays a single game with modern design patterns
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

  const isSports = game.type === "SPORTS";

  return (
    <article
      className={cn(
        "group h-full flex flex-col rounded-2xl overflow-hidden",
        "transition-all duration-300 cursor-pointer",
        "hover:shadow-elevated hover:scale-105",
        "glass-accent border border-white/20",
        "focus-within:ring-2 focus-within:ring-cyan-400"
      )}
      role="region"
      aria-label={`${game.name} game card`}
    >
      {/* Game Image with Gradient Overlay */}
      <div
        className={cn(
          "relative w-full h-40 overflow-hidden bg-gradient-to-br",
          isSports
            ? "from-cyan-600/80 to-blue-700/80"
            : "from-violet-600/80 to-pink-700/80"
        )}
      >
        {game.imageUrl ? (
          <img
            src={game.imageUrl}
            alt={`${game.name} game cover image`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            aria-hidden="true"
          >
            <div className="text-white/50 text-center">
              <div className="text-4xl font-bold">
                {game.name.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        )}

        {/* Overlay Gradient */}
        <div
          className={cn(
            "absolute inset-0 opacity-30 group-hover:opacity-10 transition-opacity",
            isSports
              ? "bg-gradient-to-t from-cyan-900 to-transparent"
              : "bg-gradient-to-t from-violet-900 to-transparent"
          )}
        />

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          disabled={isLoadingFavorite}
          className={cn(
            "absolute top-3 right-3 p-2 rounded-full",
            "transition-all duration-200 backdrop-blur-md",
            "hover:scale-110 active:scale-95 disabled:opacity-50",
            "focus:outline-none focus:ring-2 focus:ring-red-400",
            game.isFavorite
              ? "bg-red-500/40 border border-red-400/50 text-red-200 hover:bg-red-500/60"
              : "bg-white/20 border border-white/30 text-white/80 hover:bg-white/30"
          )}
          aria-label={favoriteAriaLabel}
          {...(game.isFavorite && { "aria-pressed": "true" })}
        >
          <Heart
            size={18}
            className="transition-colors duration-200"
            fill={game.isFavorite ? "currentColor" : "none"}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Game Info */}
      <div className="flex-1 p-4 flex flex-col space-y-3">
        {/* Type Badges */}
        <div className="flex gap-2 flex-wrap">
          <span
            className={cn(
              "inline-flex px-2.5 py-1 text-xs font-bold rounded-full",
              "backdrop-blur-sm border",
              isSports
                ? "bg-cyan-400/20 border-cyan-300/30 text-cyan-600"
                : "bg-violet-400/20 border-violet-300/30 text-violet-600"
            )}
            aria-label={`Game type: ${isSports ? "Sports" : "Casino"}`}
          >
            {isSports ? "🏆 Sports" : "🎰 Casino"}
          </span>

          {game.sport && (
            <span
              className="inline-flex px-2.5 py-1 text-xs font-semibold rounded-full badge-glass"
              aria-label={`Sport: ${game.sport}`}
            >
              {game.sport}
            </span>
          )}

          {game.provider && (
            <span
              className="inline-flex px-2.5 py-1 text-xs font-semibold rounded-full badge-glass"
              aria-label={`Provider: ${game.provider}`}
            >
              {game.provider}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-bold text-slate-900 text-base line-clamp-2 leading-tight">
          {game.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-600 line-clamp-2 flex-1">
          {game.teamA && game.teamB
            ? `${game.teamA} vs ${game.teamB}`
            : game.category || "Ready to play"}
        </p>

        {/* Play Button */}
        <button
          onClick={handlePlayClick}
          className={cn(
            "w-full flex items-center justify-center gap-2",
            "px-4 py-2.5 rounded-lg font-semibold text-sm",
            "bg-gradient-primary text-white",
            "hover:shadow-glow-primary hover:scale-105",
            "transition-all duration-200 active:scale-95",
            "focus:outline-none focus:ring-2 focus:ring-cyan-400"
          )}
          aria-label={`Play ${game.name}`}
        >
          <Play size={16} />
          Play Now
        </button>
      </div>
    </article>
  );
};

export default GameCard;
