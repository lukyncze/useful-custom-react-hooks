import {useEffect, useRef} from 'react';

export default function useUpdateEffect(callback: () => void, dependencies: Array<number>) {
  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    return callback();
  }, dependencies);
}

