import { Search, X } from "lucide-react";
import { FilterPill } from "./FilterPill";
import { FilterDropdown, type FilterOption } from "./FilterDropdown";
import { useFilters } from "../../hooks/useFilters";
import { cn } from "../../utils/cn";

interface FilterBarProps {
  onFiltersChange?: () => void;
  typeOptions?: FilterOption[];
  sportOptions?: FilterOption[];
  providerOptions?: FilterOption[];
}

const DEFAULT_TYPE_OPTIONS: FilterOption[] = [
  { label: "All Types", value: "" },
  { label: "Sports", value: "SPORTS" },
  { label: "Casino", value: "CASINO" },
];

const DEFAULT_SPORT_OPTIONS: FilterOption[] = [
  { label: "All Sports", value: "" },
  { label: "Cricket", value: "Cricket" },
  { label: "Football", value: "Football" },
  { label: "Tennis", value: "Tennis" },
];

const DEFAULT_PROVIDER_OPTIONS: FilterOption[] = [
  { label: "All Providers", value: "" },
  { label: "Slots", value: "Slots" },
  { label: "Live", value: "Live" },
  { label: "Table", value: "Table" },
];

/**
 * Advanced filter bar component with dropdowns, search, and pill display
 * Supports type, sport, provider filters with URL synchronization
 */
export const FilterBar = ({
  onFiltersChange,
  typeOptions = DEFAULT_TYPE_OPTIONS,
  sportOptions = DEFAULT_SPORT_OPTIONS,
  providerOptions = DEFAULT_PROVIDER_OPTIONS,
}: FilterBarProps) => {
  const {
    filters,
    updateFilter,
    clearFilter,
    clearAllFilters,
    getActiveFilterCount,
  } = useFilters();

  const handleFilterChange = () => {
    onFiltersChange?.();
  };

  const activeCount = getActiveFilterCount();
  const isSports = filters.type === "SPORTS";

  return (
    <div className="space-y-4 animate-slide-down">
      {/* Search Bar */}
      <div className="relative">
        <Search
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
        />
        <input
          type="text"
          placeholder="Search games..."
          value={filters.search || ""}
          onChange={(e) => {
            updateFilter("search", e.target.value || undefined);
            handleFilterChange();
          }}
          className="input-base pl-10"
        />
      </div>

      {/* Filter Dropdowns */}
      <div className={cn("grid gap-3", "sm:grid-cols-2 lg:grid-cols-3")}>
        {/* Type Filter */}
        <FilterDropdown
          label="Type"
          options={typeOptions}
          selected={filters.type}
          onSelect={(value) => {
            updateFilter("type", value || undefined);
            // Clear sport filter when changing type
            if (value !== "SPORTS") updateFilter("sport", undefined);
            handleFilterChange();
          }}
          placeholder="All Types"
        />

        {/* Sport Filter (only visible when SPORTS type selected) */}
        {isSports && (
          <FilterDropdown
            label="Sport"
            options={sportOptions}
            selected={filters.sport}
            onSelect={(value) => {
              updateFilter("sport", value || undefined);
              handleFilterChange();
            }}
            placeholder="All Sports"
          />
        )}

        {/* Provider Filter (only visible when CASINO type selected) */}
        {filters.type === "CASINO" && (
          <FilterDropdown
            label="Provider"
            options={providerOptions}
            selected={filters.provider}
            onSelect={(value) => {
              updateFilter("provider", value || undefined);
              handleFilterChange();
            }}
            placeholder="All Providers"
          />
        )}
      </div>

      {/* Active Filters Display */}
      {activeCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 p-3 glass rounded-lg">
          {filters.type && filters.type !== "" && (
            <FilterPill
              label={`Type: ${filters.type}`}
              value={filters.type}
              onRemove={() => {
                clearFilter("type");
                handleFilterChange();
              }}
              variant="primary"
            />
          )}

          {filters.sport && filters.sport !== "" && (
            <FilterPill
              label={`Sport: ${filters.sport}`}
              value={filters.sport}
              onRemove={() => {
                clearFilter("sport");
                handleFilterChange();
              }}
              variant="secondary"
            />
          )}

          {filters.provider && filters.provider !== "" && (
            <FilterPill
              label={`Provider: ${filters.provider}`}
              value={filters.provider}
              onRemove={() => {
                clearFilter("provider");
                handleFilterChange();
              }}
              variant="accent"
            />
          )}

          {filters.search && (
            <FilterPill
              label={`Search: "${filters.search}"`}
              value={filters.search}
              onRemove={() => {
                clearFilter("search");
                handleFilterChange();
              }}
              variant="secondary"
            />
          )}

          {/* Clear All Button */}
          <button
            onClick={() => {
              clearAllFilters();
              handleFilterChange();
            }}
            className="ml-auto flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={14} />
            Clear All
          </button>
        </div>
      )}
    </div>
  );
};
