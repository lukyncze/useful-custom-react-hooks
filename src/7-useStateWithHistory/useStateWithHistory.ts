import {Dispatch, SetStateAction, useCallback, useRef, useState} from 'react';

type UseStateWithHistoryReturnType<T> = [T, Dispatch<SetStateAction<T>>, HistoryProps<T>];

interface HistoryProps<T> {
  history: T[];
  pointer: number;
  back: () => void;
  forward: () => void;
  go: (index: number) => void;
}

interface Capacity {
  capacity?: number;
}

export default function useStateWithHistory<T>(
  defaultValue: T,
  {capacity = 10}: Capacity = {}
): UseStateWithHistoryReturnType<T> {
  const [value, setValue] = useState<T>(defaultValue);
  const historyRef = useRef<T[]>([value]);
  const pointerRef = useRef<number>(0);

  const set = useCallback(
    (v: SetStateAction<T>) => {
      const resolvedValue = typeof v === 'function' ? (v as (prev: T) => T)(value) : v;

      if (historyRef.current[pointerRef.current] !== resolvedValue) {
        if (pointerRef.current < historyRef.current.length - 1) {
          historyRef.current.splice(pointerRef.current + 1);
        }
        historyRef.current.push(resolvedValue);

        while (historyRef.current.length > capacity) {
          historyRef.current.shift();
        }
        pointerRef.current = historyRef.current.length - 1;
      }
      setValue(resolvedValue);
    },
    [capacity, value]
  );

  const back = useCallback(() => {
    if (pointerRef.current <= 0) return;
    pointerRef.current--;
    setValue(historyRef.current[pointerRef.current]);
  }, []);

  const forward = useCallback(() => {
    if (pointerRef.current >= historyRef.current.length - 1) return;
    pointerRef.current++;
    setValue(historyRef.current[pointerRef.current]);
  }, []);

  const go = useCallback((index: number) => {
    if (index < 0 || index > historyRef.current.length - 1) return;
    pointerRef.current = index;
    setValue(historyRef.current[pointerRef.current]);
  }, []);

  const historyProps: HistoryProps<T> = {
    history: historyRef.current,
    pointer: pointerRef.current,
    back,
    forward,
    go,
  };

  return [value, set, historyProps];
}

