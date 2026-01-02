import React from "react";
import { Heart } from "lucide-react";
import { Game } from "@/hooks/useGames";
import Button from "@/components/ui/Button";

interface GameCardProps {
  game: Game;
  onFavoriteToggle?: (gameId: string) => void;
  onPlay?: (game: Game) => void;
  isLoadingFavorite?: boolean;
}

/**
 * GameCard - Displays a single game with image, info, and actions
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

  return (
    <div className="group h-full flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden border border-slate-100 hover:border-cyan-400">
      {/* Game Image */}
      <div className="relative w-full h-48 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
        {game.imageUrl ? (
          <img
            src={game.imageUrl}
            alt={game.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-slate-400 text-center">
              <div className="text-2xl font-bold opacity-50">
                {game.name.charAt(0)}
              </div>
              <div className="text-xs mt-1">No Image</div>
            </div>
          </div>
        )}

        {/* Favorite Button - Fixed position overlay */}
        <button
          onClick={handleFavoriteClick}
          disabled={isLoadingFavorite}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/90 shadow-md hover:bg-white hover:shadow-lg transition-all duration-200 disabled:opacity-50"
          aria-label="Toggle favorite"
        >
          <Heart
            size={20}
            className={`transition-colors duration-200 ${
              game.isFavorite
                ? "fill-red-500 text-red-500"
                : "text-slate-400 hover:text-red-500"
            }`}
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
        <div className="flex gap-2 mb-3">
          <span
            className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
              game.type === "sports"
                ? "bg-cyan-100 text-cyan-700"
                : "bg-violet-100 text-violet-700"
            }`}
          >
            {game.type === "sports" ? "🏆 Sports" : "🎰 Casino"}
          </span>

          {game.sport && (
            <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-slate-100 text-slate-700">
              {game.sport}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 line-clamp-2 mb-3 flex-1">
          {game.description || "No description available"}
        </p>

        {/* Footer Info */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-3 pb-3 border-t border-slate-100">
          <span className="font-medium">{game.provider}</span>
          {game.rtp && (
            <span className="text-cyan-600 font-semibold">
              RTP: {game.rtp}%
            </span>
          )}
        </div>

        {/* Play Button */}
        <Button
          onClick={handlePlayClick}
          variant="primary"
          size="sm"
          className="w-full"
        >
          Play Now
        </Button>
      </div>
    </div>
  );
};

export default GameCard;
