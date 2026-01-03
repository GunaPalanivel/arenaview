import { useEffect, useState } from "react";

/**
 * Hook to debounce a value
 *
 * Delays updating a value until the provided value hasn't changed for the specified delay.
 * Useful for search inputs and other frequently changing values to reduce expensive operations.
 *
 * @template T - The type of value being debounced
 * @param {T} value - The value to debounce
 * @param {number} [delay=500] - The debounce delay in milliseconds (default: 500ms)
 *
 * @returns {T} The debounced value that updates after the delay period
 *
 * @example
 * // Debounce a search input
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearchTerm = useDebounce(searchTerm, 300);
 *
 * // Use debouncedSearchTerm in a query effect
 * useEffect(() => {
 *   if (debouncedSearchTerm) {
 *     fetchSearchResults(debouncedSearchTerm);
 *   }
 * }, [debouncedSearchTerm]);
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
