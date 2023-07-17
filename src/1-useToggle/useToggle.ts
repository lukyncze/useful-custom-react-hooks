import {useState, MouseEvent} from 'react';

export default function useToggle(defaultValue: boolean) {
  const [value, setValue] = useState(defaultValue);

  function toggleValue(event: MouseEvent<HTMLButtonElement> | boolean) {
    setValue(currentValue => (typeof event === 'boolean' ? event : !currentValue));
  }

  return [value, toggleValue] as const;
}

