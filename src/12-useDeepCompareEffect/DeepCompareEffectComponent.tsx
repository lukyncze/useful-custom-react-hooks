import {useEffect, useState, useRef, RefObject} from 'react';
import useDeepCompareEffect from './useDeepCompareEffect';

interface Person {
  name: string;
  age: number;
}

export default function DeepCompareEffectComponent() {
  const [age, setAge] = useState<number>(0);
  const [otherCount, setOtherCount] = useState<number>(0);
  const useEffectCountRef = useRef<HTMLSpanElement>(null);
  const useDeepCompareEffectCountRef = useRef<HTMLSpanElement>(null);

  const person: Person = {name: 'Kyle', age};

  const updateRefTextContent = (ref: RefObject<HTMLSpanElement>) => {
    if (ref.current) {
      const newTextContent = (parseInt(ref.current.textContent || '0') + 1).toString();
      ref.current.textContent = newTextContent;
    }
  };

  useEffect(() => updateRefTextContent(useEffectCountRef), [person]);

  useDeepCompareEffect(() => updateRefTextContent(useDeepCompareEffectCountRef), [person]);

  return (
    <div>
      <div>
        useEffect: <span ref={useEffectCountRef}>0</span>
      </div>
      <div>
        useDeepCompareEffect: <span ref={useDeepCompareEffectCountRef}>0</span>
      </div>
      <div>Other Count: {otherCount}</div>
      <div>{JSON.stringify(person)}</div>
      <button onClick={() => setAge(currentAge => currentAge + 1)}>Increment Age</button>
      <button onClick={() => setOtherCount(count => count + 1)}>Increment Other Count</button>
    </div>
  );
}

