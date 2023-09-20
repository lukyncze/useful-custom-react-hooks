import {useState} from 'react';
import useEventListener from '../13-useEventListener/useEventListener';

type Online = boolean;

type UseOnlineStatusReturnType = Online;

export default function useOnlineStatus(): UseOnlineStatusReturnType {
  const [online, setOnline] = useState<Online>(navigator.onLine);

  useEventListener('online', () => setOnline(navigator.onLine));
  useEventListener('offline', () => setOnline(navigator.onLine));

  return online;
}

