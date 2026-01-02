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
