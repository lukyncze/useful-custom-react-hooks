import {useEffect, useRef} from 'react';

export default function useEventListener<E extends Event>(
  eventType: string,
  callback: (e: E) => void,
  element: EventTarget | null = window
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (element == null) return;
    const handler = (e: E) => callbackRef.current(e);
    element.addEventListener(eventType, handler as EventListener);

    return () => element.removeEventListener(eventType, handler as EventListener);
  }, [eventType, element]);
}

