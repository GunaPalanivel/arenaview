import { useState, useEffect } from "react";

/**
 * Hook for responsive design breakpoints
 * Matches Tailwind breakpoints: sm=640px, md=768px, lg=1024px, xl=1280px
 *
 * @param {string} query - CSS media query string to match against
 * @returns {boolean} Whether the media query currently matches
 *
 * @example
 * const isLargeScreen = useMediaQuery('(min-width: 1024px)');
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
 *
 * Provides convenient boolean flags for all Tailwind breakpoints.
 * Combines related breakpoints for easier conditional rendering.
 *
 * @returns {Object} Breakpoint flags and combinations
 * @returns {boolean} isMobile - Screen width < 640px (mobile)
 * @returns {boolean} isSmall - Screen width 640px-767px (small tablet)
 * @returns {boolean} isTablet - Screen width 768px-1023px (tablet)
 * @returns {boolean} isLaptop - Screen width 1024px-1279px (laptop)
 * @returns {boolean} isDesktop - Screen width >= 1280px (desktop)
 * @returns {boolean} isTabletOrSmaller - Combines mobile, small, and tablet
 * @returns {boolean} isLaptopOrLarger - Combines laptop and desktop
 *
 * @example
 * const { isMobile, isTabletOrSmaller } = useBreakpoint();
 *
 * return (
 *   <>
 *     {isMobile && <MobileMenu />}
 *     {!isTabletOrSmaller && <DesktopMenu />}
 *   </>
 * );
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
