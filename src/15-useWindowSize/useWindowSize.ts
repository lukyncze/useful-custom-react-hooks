import {useState} from 'react';
import useEventListener from '../13-useEventListener/useEventListener';

interface WindowSize {
  width: number;
  height: number;
}

export default function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEventListener('resize', () => {
    setWindowSize({width: window.innerWidth, height: window.innerHeight});
  });

  return windowSize;
}

