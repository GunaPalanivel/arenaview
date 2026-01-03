import type React from "react";

interface EmptyGameStateProps {
  hasFilters: boolean;
  onClearFilters: () => void;
}

export const EmptyGameState: React.FC<EmptyGameStateProps> = ({
  hasFilters,
  onClearFilters,
}) => {
  return (
    <div className="text-center py-16 px-6">
      <div className="inline-block p-4 mb-4 glass rounded-full">
        <div className="text-4xl">🎮</div>
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-2">No games found</h3>
      <p className="text-slate-600 mb-6">
        {hasFilters
          ? "Try adjusting your search or filters"
          : "No games available at the moment"}
      </p>
      {hasFilters && (
        <button onClick={onClearFilters} className="btn-primary">
          Clear Filters
        </button>
      )}
    </div>
  );
};
