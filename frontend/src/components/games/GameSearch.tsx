import React, { useCallback, useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

interface GameSearchProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

/**
 * GameSearch - Search input with debounced search callback
 * Accessible with proper ARIA labels and keyboard navigation
 */
const GameSearch: React.FC<GameSearchProps> = ({
  onSearch,
  isLoading = false,
  placeholder = "Search games by name, sport, or provider...",
}) => {
  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(input, 300);

  // Trigger search when debounced value changes
  useEffect(() => {
    onSearch(debouncedInput);
  }, [debouncedInput, onSearch]);

  const handleClear = useCallback(() => {
    setInput("");
  }, []);

  return (
    <fieldset className="w-full">
      <legend className="sr-only">Search games</legend>
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none"
          size={20}
          aria-hidden="true"
        />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          disabled={isLoading}
          className="
            w-full pl-12 pr-10 py-3
            bg-white border border-slate-300 rounded-lg
            text-slate-900 text-base
            placeholder:text-slate-400
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-offset-2
            focus:border-cyan-400 focus:ring-cyan-400
            disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed
          "
          aria-label="Search games"
          aria-describedby={input ? "search-results" : undefined}
        />
        {input && (
          <button
            onClick={handleClear}
            disabled={isLoading}
            type="button"
            className="
              absolute right-4 top-1/2 transform -translate-y-1/2
              p-1 text-slate-400 hover:text-slate-600
              transition-colors duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded
            "
            aria-label="Clear search input"
          >
            <X size={18} aria-hidden="true" />
          </button>
        )}
      </div>
      <div
        id="search-results"
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      >
        {input && `Showing results for "${input}"`}
      </div>
    </fieldset>
  );
};

export default GameSearch;
