import {useEffect} from 'react';
import useTimeout from '../2-useTimeout/useTimeout';

export default function useDebounce(
  callback: () => void,
  delay: number,
  dependencies: Array<number>
) {
  const {reset, clear} = useTimeout(callback, delay);

  useEffect(reset, [...dependencies, reset]);
  useEffect(clear, []);
}

