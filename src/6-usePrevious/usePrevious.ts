import {MutableRefObject, useRef} from 'react';

type Value = string | number | boolean | Array<string> | Array<number> | Array<boolean>;

export default function usePrevious(value: Value) {
  const currentRef = useRef(value);
  const previousRef: MutableRefObject<Value | undefined> = useRef();

  if (currentRef.current !== value) {
    previousRef.current = currentRef.current;
    currentRef.current = value;
  }

  return previousRef.current;
}

