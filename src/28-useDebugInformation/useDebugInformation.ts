import {useEffect, useRef} from 'react';
import useRenderCount from '../27-useRenderCount/useRenderCount';

export interface DebugInformationProps {
  componentName: string;
  boolean: boolean;
  count: number;
  [key: string]: unknown;
}

interface UseDebugInformationReturnType {
  count: number;
  changedProps: {[key: string]: {previous: unknown, current: unknown}};
  timeSinceLastRender: number;
  lastRenderTimestamp: number;
}

export default function useDebugInformation(props: DebugInformationProps): UseDebugInformationReturnType{
  const count = useRenderCount();
  const changedProps = useRef({});
  const previousProps = useRef(props);
  const lastRenderTimestamp = useRef(Date.now());

  const propKeys = Object.keys({...props, ...previousProps});
  changedProps.current = propKeys.reduce((obj, key) => {
    if (props[key] === previousProps.current[key]) return obj;
    return {...obj, [key]: {previous: previousProps.current[key], current: props[key]}};
  }, {});
  const info: UseDebugInformationReturnType = {
    count,
    changedProps: changedProps.current,
    timeSinceLastRender: Date.now() - lastRenderTimestamp.current,
    lastRenderTimestamp: lastRenderTimestamp.current,
  };

  useEffect(() => {
    previousProps.current = props;
    lastRenderTimestamp.current = Date.now();
    console.log('[debug-info]', props.componentName, info);
  });

  return info;
}

