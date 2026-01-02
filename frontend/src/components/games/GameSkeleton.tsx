import React from "react";

/**
 * GameSkeleton - Loading placeholder for GameCard
 * Shows a skeleton while game data is loading
 */
const GameSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-48 bg-slate-300" />

      {/* Content skeleton */}
      <div className="p-4">
        {/* Name skeleton */}
        <div className="h-6 bg-slate-300 rounded mb-2 w-3/4" />

        {/* Type badge skeleton */}
        <div className="h-5 bg-slate-300 rounded w-20 mb-3" />

        {/* Description skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-slate-300 rounded w-full" />
          <div className="h-4 bg-slate-300 rounded w-5/6" />
        </div>

        {/* Footer skeleton */}
        <div className="flex justify-between items-center">
          <div className="h-4 bg-slate-300 rounded w-24" />
          <div className="h-10 bg-slate-300 rounded w-10" />
        </div>
      </div>
    </div>
  );
};

export default GameSkeleton;
