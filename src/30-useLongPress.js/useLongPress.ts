import {RefObject} from 'react';
import useEventListener from '../13-useEventListener/useEventListener';
import useTimeout from '../2-useTimeout/useTimeout';
import useEffectOnce from '../20-useEffectOnce/useEffectOnce';

interface UseLongPressOptions {
  delay?: number;
}

export default function useLongPress(
  ref: RefObject<HTMLElement>,
  cb: () => void,
  {delay = 250}: UseLongPressOptions = {}
) {
  const {reset, clear} = useTimeout(cb, delay);
  useEffectOnce(clear);

  useEventListener('mousedown', reset, ref.current);
  useEventListener('touchstart', reset, ref.current);

  useEventListener('mouseup', clear, ref.current);
  useEventListener('mouseleave', clear, ref.current);
  useEventListener('touchend', clear, ref.current);
}

