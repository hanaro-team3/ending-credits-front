import { useEffect, useRef, useCallback } from 'react';

interface UseInfiniteScrollProps {
  threshold?: number;
  rootMargin?: string;
  onIntersect: () => void;
}

export const useInfiniteScroll = ({
  threshold = 0.5,
  rootMargin = '0px',
  onIntersect
}: UseInfiniteScrollProps) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      });
    },
    [onIntersect]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      threshold,
      rootMargin
    });

    const currentTarget = targetRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [observerCallback, threshold, rootMargin]);

  return targetRef;
};