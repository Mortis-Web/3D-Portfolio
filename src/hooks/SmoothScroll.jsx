// hooks/useLenis.js
import { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';

export default function useLenis() {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    const lenisInstance = new Lenis({
      smoothWheel: true,
      smoothTouch: true,
      duration: 1.5,
      lerp: 0.05,
      direction: 'vertical',
    });

    setLenis(lenisInstance);

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenisInstance.destroy();
    };
  }, []);

  return lenis;
}
