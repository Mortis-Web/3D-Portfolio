import { useEffect, useState } from 'react';

export function useInView(viewRef, options = { threshold: 0.4 }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!viewRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      options
    );

    observer.observe(viewRef.current);
    return () => observer.disconnect();
  }, [viewRef, options]);

  return isVisible;
}
