// context/ScrollContext.jsx
import { createContext, useContext } from 'react';

const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
  const scrollToSection = id => {
    const section = document.getElementById(id);
    if (section && window.Lenis) {
      // Smooth scroll with Lenis instead of native
      window.Lenis.scrollTo(section, {
        offset: 0, // adjust if you want a top gap
        immediate: false,
        lock: false,
      });
    }
  };

  return (
    <ScrollContext.Provider value={{ scrollToSection }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => useContext(ScrollContext);
