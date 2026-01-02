import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface GameFilterOptions {
  type?: "sports" | "casino" | "";
  sport?: string;
}

interface GameFilterProps {
  onFilterChange: (filters: GameFilterOptions) => void;
  selectedFilters?: GameFilterOptions;
  isLoading?: boolean;
}

const SPORTS = [
  "Football",
  "Basketball",
  "Tennis",
  "Cricket",
  "Baseball",
  "Golf",
  "Ice Hockey",
  "Rugby",
];

/**
 * GameFilter - Filter games by type and sport
 * Accessible with proper ARIA labels, semantic dropdowns, and keyboard navigation
 */
const GameFilter: React.FC<GameFilterProps> = ({
  onFilterChange,
  selectedFilters = {},
  isLoading = false,
}) => {
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isSportOpen, setIsSportOpen] = useState(false);

  const handleTypeChange = (type: "sports" | "casino" | "") => {
    const newFilters = {
      ...selectedFilters,
      type: type || undefined,
      sport: type === "casino" ? undefined : selectedFilters.sport,
    };
    onFilterChange(newFilters);
    setIsTypeOpen(false);
  };

  const handleSportChange = (sport: string) => {
    const newFilters = {
      ...selectedFilters,
      sport: sport === selectedFilters.sport ? undefined : sport,
    };
    onFilterChange(newFilters);
    setIsSportOpen(false);
  };

  const handleReset = () => {
    onFilterChange({});
    setIsTypeOpen(false);
    setIsSportOpen(false);
  };

  const hasActiveFilters = selectedFilters.type || selectedFilters.sport;

  const typeButtonClass =
    "w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors duration-200 border-b border-slate-100 last:border-b-0 text-sm";

  return (
    <fieldset className="flex flex-col gap-4">
      <legend className="sr-only">Filter games</legend>

      {/* Type Filter */}
      <div className="relative">
        <button
          onClick={() => setIsTypeOpen(!isTypeOpen)}
          disabled={isLoading}
          className="w-full sm:w-auto px-4 py-3 bg-white border border-slate-300 rounded-lg flex items-center justify-between gap-2 text-slate-900 font-medium text-sm hover:border-cyan-400 hover:bg-slate-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Filter by game type"
          {...(isTypeOpen && { "aria-expanded": "true" })}
          {...(!isTypeOpen && { "aria-expanded": "false" })}
          aria-controls="type-menu"
          aria-haspopup="true"
        >
          <span>
            {selectedFilters.type
              ? selectedFilters.type === "sports"
                ? "🏆 Sports"
                : "🎰 Casino"
              : "Game Type"}
          </span>
          <ChevronDown
            size={18}
            className={`transition-transform duration-200 ${
              isTypeOpen ? "transform rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </button>

        {/* Type Dropdown */}
        {isTypeOpen && (
          <div
            id="type-menu"
            className="absolute top-full left-0 mt-2 w-full sm:w-auto bg-white border border-slate-300 rounded-lg shadow-lg z-20"
            role="menu"
          >
            <button
              onClick={() => handleTypeChange("")}
              className={typeButtonClass}
              role="menuitem"
            >
              All Types
            </button>
            <button
              onClick={() => handleTypeChange("sports")}
              className={`${typeButtonClass} ${
                selectedFilters.type === "sports"
                  ? "bg-cyan-50 text-cyan-700 font-semibold"
                  : ""
              }`}
              role="menuitem"
            >
              🏆 Sports
            </button>
            <button
              onClick={() => handleTypeChange("casino")}
              className={`${typeButtonClass} ${
                selectedFilters.type === "casino"
                  ? "bg-violet-50 text-violet-700 font-semibold"
                  : ""
              }`}
              role="menuitem"
            >
              🎰 Casino
            </button>
          </div>
        )}
      </div>

      {/* Sport Filter - Only show for sports type */}
      {selectedFilters.type === "sports" && (
        <div className="relative">
          <button
            onClick={() => setIsSportOpen(!isSportOpen)}
            disabled={isLoading}
            className="w-full sm:w-auto px-4 py-3 bg-white border border-slate-300 rounded-lg flex items-center justify-between gap-2 text-slate-900 font-medium text-sm hover:border-cyan-400 hover:bg-slate-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Filter by sport"
            {...(isSportOpen && { "aria-expanded": "true" })}
            {...(!isSportOpen && { "aria-expanded": "false" })}
            aria-controls="sport-menu"
            aria-haspopup="true"
          >
            <span>{selectedFilters.sport || "Select Sport"}</span>
            <ChevronDown
              size={18}
              className={`transition-transform duration-200 ${
                isSportOpen ? "transform rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </button>

          {/* Sport Dropdown */}
          {isSportOpen && (
            <div
              id="sport-menu"
              className="absolute top-full left-0 mt-2 w-full sm:w-auto min-w-48 bg-white border border-slate-300 rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto"
              role="menu"
            >
              <button
                onClick={() => handleSportChange("")}
                className={`${typeButtonClass} ${
                  !selectedFilters.sport
                    ? "bg-cyan-50 text-cyan-700 font-semibold"
                    : ""
                }`}
                role="menuitem"
              >
                All Sports
              </button>
              {SPORTS.map((sport) => (
                <button
                  key={sport}
                  onClick={() => handleSportChange(sport)}
                  className={`${typeButtonClass} ${
                    selectedFilters.sport === sport
                      ? "bg-cyan-50 text-cyan-700 font-semibold"
                      : ""
                  }`}
                  role="menuitem"
                >
                  {sport}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Reset button - Only show if filters are active */}
      {hasActiveFilters && (
        <button
          onClick={handleReset}
          disabled={isLoading}
          className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Clear Filters
        </button>
      )}
    </fieldset>
  );
};

export default GameFilter;
