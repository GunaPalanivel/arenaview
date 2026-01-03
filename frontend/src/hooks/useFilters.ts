import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export interface FilterState {
  type?: string;
  sport?: string;
  provider?: string;
  search?: string;
}

/**
 * Hook for managing filter state with URL parameter sync
 *
 * Automatically synchronizes filter state with URL search parameters for
 * bookmarkable and shareable filtered views.
 *
 * @returns {Object} Filter management interface
 * @returns {FilterState} filters - Current filter values
 * @returns {Function} updateFilter - Update a specific filter value
 * @returns {Function} clearFilter - Clear a specific filter value
 * @returns {Function} clearAllFilters - Clear all filters at once
 * @returns {Function} getActiveFilterCount - Get the number of active filters
 *
 * @example
 * const { filters, updateFilter, clearAllFilters } = useFilters();
 *
 * // Get current filters
 * console.log(filters.type); // 'SPORTS' or undefined
 *
 * // Update a filter
 * updateFilter('sport', 'Cricket');
 *
 * // Clear a specific filter
 * clearFilter('provider');
 *
 * // Clear all filters
 * clearAllFilters();
 */
export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(() => ({
    type: searchParams.get("type") || undefined,
    sport: searchParams.get("sport") || undefined,
    provider: searchParams.get("provider") || undefined,
    search: searchParams.get("search") || undefined,
  }));

  // Sync filters to URL whenever they change
  useEffect(() => {
    const newParams = new URLSearchParams();
    if (filters.type) newParams.set("type", filters.type);
    if (filters.sport) newParams.set("sport", filters.sport);
    if (filters.provider) newParams.set("provider", filters.provider);
    if (filters.search) newParams.set("search", filters.search);

    setSearchParams(newParams, { replace: true });
  }, [filters, setSearchParams]);

  const updateFilter = useCallback(
    (key: keyof FilterState, value: string | undefined) => {
      setFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  const clearFilter = useCallback((key: keyof FilterState) => {
    setFilters((prev) => ({
      ...prev,
      [key]: undefined,
    }));
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters({});
  }, []);

  const getActiveFilterCount = useCallback(() => {
    return Object.values(filters).filter(Boolean).length;
  }, [filters]);

  return {
    filters,
    updateFilter,
    clearFilter,
    clearAllFilters,
    getActiveFilterCount,
  };
};
