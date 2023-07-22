import {MutableRefObject, useRef} from 'react';

type PreviousValue = string | number | boolean | Array<string> | Array<number> | Array<boolean>;

export default function usePrevious(value: PreviousValue) {
  const currentRef = useRef(value);
  const previousRef: MutableRefObject<PreviousValue | undefined> = useRef();

  if (currentRef.current !== value) {
    previousRef.current = currentRef.current;
    currentRef.current = value;
  }

  return previousRef.current;
}

