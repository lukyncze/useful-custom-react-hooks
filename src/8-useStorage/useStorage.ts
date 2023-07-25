import {useCallback, useState, useEffect, Dispatch, SetStateAction} from 'react';

type StorageValue<T> = T | undefined;
type DefaultValue<T> = T | Dispatch<SetStateAction<T>>;

type UseStorageReturnType<T> = [
  StorageValue<T>,
  Dispatch<SetStateAction<StorageValue<T>>>,
  () => void
];

export function useLocalStorage<T>(key: string, defaultValue: DefaultValue<T>) {
  return useStorage(key, defaultValue, window.localStorage);
}

export function useSessionStorage<T>(key: string, defaultValue: DefaultValue<T>) {
  return useStorage(key, defaultValue, window.sessionStorage);
}

function useStorage<T>(
  key: string,
  defaultValue: DefaultValue<T>,
  storageObject: Storage
): UseStorageReturnType<T> {
  const [value, setValue] = useState<StorageValue<T>>(() => {
    const jsonValue = storageObject.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);

    return typeof defaultValue === 'function' ? (defaultValue as () => T)() : defaultValue;
  });

  useEffect(() => {
    if (value === undefined) return storageObject.removeItem(key);
    storageObject.setItem(key, JSON.stringify(value));
  }, [key, value, storageObject]);

  const remove = useCallback(() => {
    setValue(undefined);
  }, []);

  return [value, setValue, remove];
}

