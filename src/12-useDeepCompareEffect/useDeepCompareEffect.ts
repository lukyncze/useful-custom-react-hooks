import {MutableRefObject, useEffect, useRef} from 'react';
import isEqual from 'lodash/fp/isEqual';
import {Maybe} from '../types';

export default function useDeepCompareEffect(callback: () => void, dependencies: Array<unknown>) {
  const currentDependenciesRef: MutableRefObject<Maybe<Array<unknown>>> = useRef();

  if (!isEqual(currentDependenciesRef.current, dependencies)) {
    currentDependenciesRef.current = dependencies;
  }

  useEffect(callback, [currentDependenciesRef.current]);
}

