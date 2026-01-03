import { useEffect, useRef, useCallback } from "react";

interface UseInfiniteScrollOptions {
  onLoadMore: () => void;
  isLoading: boolean;
  hasMore: boolean;
  threshold?: number;
}

/**
 * Hook to handle infinite scroll with intersection observer
 *
 * Automatically triggers a callback when the user scrolls near the bottom of a list.
 * Uses the Intersection Observer API for efficient scroll detection.
 *
 * @param {UseInfiniteScrollOptions} options - Configuration for infinite scroll behavior
 * @param {Function} options.onLoadMore - Callback invoked when user scrolls near bottom
 * @param {boolean} options.isLoading - Whether data is currently being loaded
 * @param {boolean} options.hasMore - Whether there are more items to load
 * @param {number} [options.threshold=200] - Distance in pixels from bottom to trigger load
 *
 * @returns {React.RefObject<HTMLDivElement>} Ref to attach to the bottom sentinel element
 *
 * @example
 * const sentinelRef = useInfiniteScroll({
 *   onLoadMore: () => fetchNextPage(),
 *   isLoading: isFetching,
 *   hasMore: hasNextPage,
 *   threshold: 300
 * });
 *
 * return (
 *   <>
 *     <div>{items.map(item => <div key={item.id}>{item.name}</div>)}</div>
 *     <div ref={sentinelRef} />
 *   </>
 * );
 */
export function useInfiniteScroll({
  onLoadMore,
  isLoading,
  hasMore,
  threshold = 200,
}: UseInfiniteScrollOptions): React.RefObject<HTMLDivElement | null> {
  const observerTarget = useRef<HTMLDivElement>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && !isLoading && hasMore) {
        onLoadMore();
      }
    },
    [onLoadMore, isLoading, hasMore]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: `${threshold}px`,
    });

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [handleIntersection, threshold]);

  return observerTarget;
}
