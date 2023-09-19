import {useLocalStorage} from '../8-useStorage/useStorage';
import * as translations from './translations';

type StorageValue<T> = T | undefined;

type UseTranslationReturnType = {
  language: StorageValue<string>;
  setLanguage: (language: string) => void;
  fallbackLanguage: StorageValue<string>;
  setFallbackLanguage: (language: string) => void;
  t: (key: string) => string;
};

export default function useTranslation(): UseTranslationReturnType {
  const [language, setLanguage] = useLocalStorage<string>('language', 'en');
  const [fallbackLanguage, setFallbackLanguage] = useLocalStorage<string>('fallbackLanguage', 'en');

  const translate = (key: string): string => {
    const keys = key.split('.');

    return (
      getNestedTranslation(language, keys) ?? getNestedTranslation(fallbackLanguage, keys) ?? key
    );
  };

  return {
    language,
    setLanguage,
    fallbackLanguage,
    setFallbackLanguage,
    t: translate,
  };
}

function getNestedTranslation(language: StorageValue<string>, keys: Array<string>): string {
  if (!language) return '';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return keys.reduce((obj, key) => obj?.[key], (translations as any)[language]);
}

