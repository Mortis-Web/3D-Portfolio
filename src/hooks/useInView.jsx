import { useEffect, useRef, useState } from 'react';

export function useInView(viewRef, options = { threshold: 0.2 }) {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    const element = viewRef?.current;
    if (!element) return;

    // Clean up previous observer if any
    if (observerRef.current) observerRef.current.disconnect();

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      options
    );

    observer.observe(element);
    observerRef.current = observer;

    return () => observer.disconnect();
  }, [viewRef, options.threshold, options.root, options.rootMargin, options]);

  return isVisible;
}
