import {useState, useEffect} from 'react';
import useEventListener from '../13-useEventListener/useEventListener';

export default function useMediaQuery(mediaQuery: string) {
  const [isMatch, setIsMatch] = useState(false);
  const [mediaQueryList, setMediaQueryList] = useState<MediaQueryList | null>(null);

  useEffect(() => {
    const list = window.matchMedia(mediaQuery);
    setMediaQueryList(list);
    setIsMatch(list.matches);
  }, [mediaQuery]);

  useEventListener<MediaQueryListEvent>('change', e => setIsMatch(e.matches), mediaQueryList);

  return isMatch;
}

