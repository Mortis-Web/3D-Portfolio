import { useEffect } from 'react';
import useLenis from './SmoothScroll';

const ScrollToTop = () => {
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      // Force scroll to top
      lenis.scrollTo(0);
    } else {
      // Fallback for native scroll
      window.scrollTo(0, 0);
    }
  }, [lenis]);

  return null;
};

export default ScrollToTop;
