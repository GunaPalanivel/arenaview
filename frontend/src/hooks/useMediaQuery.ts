import { useState, useEffect } from "react";

/**
 * Hook for responsive design breakpoints
 * Matches Tailwind breakpoints: sm=640px, md=768px, lg=1024px, xl=1280px
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
};

/**
 * Responsive breakpoint helpers
 */
export const useBreakpoint = () => {
  const isMobile = useMediaQuery("(max-width: 639px)");
  const isSmall = useMediaQuery("(min-width: 640px) and (max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isLaptop = useMediaQuery("(min-width: 1024px) and (max-width: 1279px)");
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  return {
    isMobile,
    isSmall,
    isTablet,
    isLaptop,
    isDesktop,
    isTabletOrSmaller: isMobile || isSmall || isTablet,
    isLaptopOrLarger: isLaptop || isDesktop,
  };
};
