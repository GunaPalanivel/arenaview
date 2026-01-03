import { Heart, Play } from "lucide-react";
import type { Game } from "@/hooks/useGames";
import { cn } from "../../utils/cn";

interface GameCardHeroProps {
  game: Game;
  onPlay?: () => void;
  onFavorite?: () => void;
  isFavorite?: boolean;
  featured?: boolean;
}

/**
 * Large hero card for featured games
 * Used in bento grid for prominent game display
 */
export const GameCardHero = ({
  game,
  onPlay,
  onFavorite,
  isFavorite,
  featured,
}: GameCardHeroProps) => {
  return (
    <div
      className={cn(
        "relative group h-full rounded-2xl overflow-hidden",
        "transition-all duration-300 cursor-pointer",
        "hover:shadow-elevated hover:scale-105",
        "glass-dark backdrop-blur-xl border border-white/20"
      )}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        <div
          className={cn(
            "absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-300",
            game.type === "SPORTS"
              ? "bg-gradient-to-br from-cyan-500/20 to-blue-500/20"
              : "bg-gradient-to-br from-violet-500/20 to-pink-500/20"
          )}
        />
        {/* Shimmer effect on hover */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-shimmer opacity-0 group-hover:opacity-100",
            "transition-opacity duration-500"
          )}
        />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-6 text-white">
        {/* Top Section */}
        <div className="space-y-3">
          {/* Badge */}
          <div className="inline-flex">
            <span
              className={cn(
                "px-3 py-1 rounded-full text-xs font-bold",
                "backdrop-blur-sm border",
                game.type === "SPORTS"
                  ? "bg-cyan-500/20 border-cyan-400/30 text-cyan-200"
                  : "bg-violet-500/20 border-violet-400/30 text-violet-200"
              )}
            >
              {game.type === "SPORTS"
                ? `${game.sport} • SPORTS`
                : `${game.provider} • CASINO`}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-2xl lg:text-3xl font-bold font-display leading-tight line-clamp-3">
            {game.name}
          </h3>
        </div>

        {/* Bottom Section */}
        <div className="flex items-center justify-between gap-3">
          {/* Play Button */}
          <button
            type="button"
            onClick={onPlay}
            className={cn(
              "flex-1 flex items-center justify-center gap-2",
              "px-4 py-3 rounded-lg font-semibold text-sm",
              "bg-gradient-primary text-white",
              "hover:shadow-glow-primary hover:scale-105",
              "transition-all duration-200 active:scale-95",
              "group-hover:shadow-lg"
            )}
          >
            <Play size={18} />
            Play Now
          </button>

          {/* Favorite Button */}
          <button
            type="button"
            onClick={onFavorite}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
            className={cn(
              "p-3 rounded-lg transition-all duration-200",
              "hover:scale-110 active:scale-95",
              isFavorite
                ? "bg-red-500/30 border border-red-400/50 text-red-300 hover:bg-red-500/40"
                : "bg-white/10 border border-white/20 text-white/70 hover:bg-white/20"
            )}
          >
            <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      {/* Glow effect for featured */}
      {featured && (
        <div className="absolute inset-0 rounded-2xl shadow-glow-primary pointer-events-none" />
      )}
    </div>
  );
};
