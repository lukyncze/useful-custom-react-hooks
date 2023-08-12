import {useState, useEffect, RefObject} from 'react';

interface Size {
  width: number;
  height: number;
}

export default function useSize(ref: RefObject<HTMLElement>): Size {
  const [size, setSize] = useState<Size>({width: 0, height: 0});

  useEffect(() => {
    if (ref.current == null) return;

    const observer = new ResizeObserver(([entry]) => setSize(entry.contentRect));
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref]);

  return size;
}

