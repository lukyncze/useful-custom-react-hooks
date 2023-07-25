import {MutableRefObject, useRef} from 'react';
import {Maybe} from '../types';

export default function usePrevious<T>(value: T): Maybe<T> {
  const currentRef = useRef(value);
  const previousRef: MutableRefObject<Maybe<T>> = useRef();

  if (currentRef.current !== value) {
    previousRef.current = currentRef.current;
    currentRef.current = value;
  }

  return previousRef.current;
}

