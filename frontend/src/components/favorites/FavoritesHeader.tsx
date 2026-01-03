import type React from "react";
import { Heart } from "lucide-react";

interface FavoritesHeaderProps {
  favoriteCount: number;
  gameTypeCount: number;
}

export const FavoritesHeader: React.FC<FavoritesHeaderProps> = ({
  favoriteCount,
  gameTypeCount,
}) => {
  return (
    <div className="container-page py-8 sm:py-12">
      <div className="space-y-2 mb-8">
        <div className="flex items-center gap-3">
          <Heart className="text-red-500" size={32} fill="currentColor" />
          <h1 className="text-4xl sm:text-5xl font-bold font-display text-gradient-secondary">
            My Favorites
          </h1>
        </div>
        <p className="text-lg text-slate-600">
          {favoriteCount} {favoriteCount === 1 ? "game" : "games"} in your
          collection
        </p>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-4">
        <div className="card-base backdrop-blur-xl">
          <div className="text-2xl font-bold text-red-500">{favoriteCount}</div>
          <p className="text-sm text-slate-600">Favorite Games</p>
        </div>
        <div className="card-base backdrop-blur-xl">
          <div className="text-2xl font-bold text-cyan-600">
            {gameTypeCount}
          </div>
          <p className="text-sm text-slate-600">Game Types</p>
        </div>
      </div>
    </div>
  );
};
