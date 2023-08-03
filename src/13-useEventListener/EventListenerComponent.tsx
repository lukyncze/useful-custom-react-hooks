import {useState} from 'react';
import useEventListener from './useEventListener';

export default function EventListenerComponent() {
  const [key, setKey] = useState<string>('');

  useEventListener('keydown', (e: KeyboardEvent) => {
    setKey(e.key);
  });

  return <div>Last Key: {key}</div>;
}

