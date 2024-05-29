import { useEffect, useState } from 'react';

const sizeValue = {
  largeScreen: 3,
  mediumScreen: 2,
  smallScreen: 1,
};

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
    mediaQuery.addListener(handler);

    return () => mediaQuery.removeListener(handler);
  }, [query]);

  return matches;
}

export default function useWindowSizeValue(): number {
  const [value, setValue] = useState(0);

  const isLargeScreen = useMediaQuery('(min-width: 1024px)');
  const isMediumScreen = useMediaQuery(
    '(min-width: 768px) and (max-width: 1023px)'
  );
  const isSmallScreen = useMediaQuery('(max-width: 767px)');

  useEffect(() => {
    if (isLargeScreen) {
      setValue(sizeValue.largeScreen);
    } else if (isMediumScreen) {
      setValue(sizeValue.mediumScreen);
    } else if (isSmallScreen) {
      setValue(sizeValue.smallScreen);
    }
  }, [isLargeScreen, isMediumScreen, isSmallScreen]);

  return value;
}
