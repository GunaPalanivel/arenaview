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

  const hasActiveFilters =
    selectedFilters.type || selectedFilters.sport;

  return (
    <div className="flex flex-col gap-4">
      {/* Type Filter */}
      <div className="relative">
        <button
          onClick={() => setIsTypeOpen(!isTypeOpen)}
          disabled={isLoading}
          className="
            w-full sm:w-auto px-4 py-3 
            bg-white border border-slate-300 rounded-lg
            flex items-center justify-between gap-2
            text-slate-900 font-medium text-sm
            hover:border-cyan-400 hover:bg-slate-50
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-cyan-400
            disabled:opacity-50 disabled:cursor-not-allowed
          "
          aria-label="Filter by game type"
          aria-expanded={isTypeOpen}
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
          />
        </button>

        {/* Type Dropdown */}
        {isTypeOpen && (
          <div className="
            absolute top-full left-0 mt-2 w-full sm:w-auto
            bg-white border border-slate-300 rounded-lg
            shadow-lg z-20
          ">
            <button
              onClick={() => handleTypeChange("")}
              className="
                w-full text-left px-4 py-3
                hover:bg-slate-50
                transition-colors duration-200
                border-b border-slate-100 last:border-b-0
                text-sm
              "
            >
              All Types
            </button>
            <button
              onClick={() => handleTypeChange("sports")}
              className={`
                w-full text-left px-4 py-3
                hover:bg-slate-50
                transition-colors duration-200
                border-b border-slate-100 last:border-b-0
                text-sm
                ${
                  selectedFilters.type === "sports"
                    ? "bg-cyan-50 text-cyan-700 font-semibold"
                    : ""
                }
              `}
            >
              🏆 Sports
            </button>
            <button
              onClick={() => handleTypeChange("casino")}
              className={`
                w-full text-left px-4 py-3
                hover:bg-slate-50
                transition-colors duration-200
                text-sm
                ${
                  selectedFilters.type === "casino"
                    ? "bg-violet-50 text-violet-700 font-semibold"
                    : ""
                }
              `}
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
            className="
              w-full sm:w-auto px-4 py-3 
              bg-white border border-slate-300 rounded-lg
              flex items-center justify-between gap-2
              text-slate-900 font-medium text-sm
              hover:border-cyan-400 hover:bg-slate-50
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-cyan-400
              disabled:opacity-50 disabled:cursor-not-allowed
            "
            aria-label="Filter by sport"
            aria-expanded={isSportOpen}
          >
            <span>{selectedFilters.sport || "Select Sport"}</span>
            <ChevronDown
              size={18}
              className={`transition-transform duration-200 ${
                isSportOpen ? "transform rotate-180" : ""
              }`}
            />
          </button>

          {/* Sport Dropdown */}
          {isSportOpen && (
            <div className="
              absolute top-full left-0 mt-2 w-full sm:w-auto min-w-48
              bg-white border border-slate-300 rounded-lg
              shadow-lg z-20
              max-h-64 overflow-y-auto
            ">
              <button
                onClick={() => handleSportChange("")}
                className="
                  w-full text-left px-4 py-3
                  hover:bg-slate-50
                  transition-colors duration-200
                  border-b border-slate-100
                  text-sm
                  ${
                    !selectedFilters.sport
                      ? "bg-cyan-50 text-cyan-700 font-semibold"
                      : ""
                  }
                "
              >
                All Sports
              </button>
              {SPORTS.map((sport) => (
                <button
                  key={sport}
                  onClick={() => handleSportChange(sport)}
                  className={`
                    w-full text-left px-4 py-3
                    hover:bg-slate-50
                    transition-colors duration-200
                    border-b border-slate-100 last:border-b-0
                    text-sm
                    ${
                      selectedFilters.sport === sport
                        ? "bg-cyan-50 text-cyan-700 font-semibold"
                        : ""
                    }
                  `}
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
          className="
            w-full sm:w-auto px-4 py-2
            text-sm font-medium
            text-slate-600 hover:text-slate-900
            border border-slate-300 rounded-lg
            hover:bg-slate-50
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-cyan-400
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default GameFilter;
