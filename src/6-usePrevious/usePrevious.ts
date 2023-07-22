import {MutableRefObject, useRef} from 'react';
import {Maybe} from '../types';

type Value = string | number | boolean;

export default function usePrevious(value: Value): Maybe<Value> {
  const currentRef = useRef(value);
  const previousRef: MutableRefObject<Maybe<Value>> = useRef();

  if (currentRef.current !== value) {
    previousRef.current = currentRef.current;
    currentRef.current = value;
  }

  return previousRef.current;
}

