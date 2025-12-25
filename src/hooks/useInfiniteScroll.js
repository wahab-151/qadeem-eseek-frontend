import { useEffect, useRef, useCallback } from "react";

// Simple IntersectionObserver-based infinite scroll hook
// - Pass `loading` to avoid duplicate fetches while a request is in-flight
// - Pass `hasMore` to stop observing when there are no more pages
// - Provide `onLoadMore` to trigger the next page fetch
export default function useInfiniteScroll({ loading, hasMore, onLoadMore, root = null, rootMargin = "0px", threshold = 0.1 }) {
  const observerRef = useRef(null);
  const sentinelRef = useRef(null);

  const attachObserver = useCallback(
    (node) => {
      sentinelRef.current = node;
      if (!node) return;

      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting && !loading && hasMore) {
            onLoadMore?.();
          }
        },
        { root, rootMargin, threshold }
      );

      observerRef.current.observe(node);
    },
    [loading, hasMore, onLoadMore, root, rootMargin, threshold]
  );

  useEffect(() => {
    // Re-attach observer when loading state changes to avoid stale closures
    const node = sentinelRef.current;
    if (!node) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !loading && hasMore) {
          onLoadMore?.();
        }
      },
      { root, rootMargin, threshold }
    );

    observerRef.current.observe(node);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [loading, hasMore, onLoadMore, root, rootMargin, threshold]);

  return { setSentinel: attachObserver };
}


