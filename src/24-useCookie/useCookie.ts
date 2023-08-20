import {useState, useCallback} from 'react';
import Cookies from 'js-cookie';
import {Maybe} from '../types';

interface CookieAttributes {
  [property: string]: unknown;
  expires?: number | Maybe<Date>;
  path?: Maybe<string>;
  domain?: Maybe<string>;
  secure?: Maybe<boolean>;
  sameSite?: Maybe<'strict' | 'Strict' | 'lax' | 'Lax' | 'none' | 'None'>;
}

type CookieHookResult = [
  string,
  (newValue: string, options?: CookieAttributes) => void,
  () => void
];

export default function useCookie(name: string, defaultValue: string): CookieHookResult {
  const [value, setValue] = useState(() => {
    const cookie = Cookies.get(name);
    if (cookie) return cookie;
    Cookies.set(name, defaultValue);
    return defaultValue;
  });

  const updateCookie = useCallback(
    (newValue: string, options?: CookieAttributes) => {
      Cookies.set(name, newValue, options);
      setValue(newValue);
    },
    [name]
  );

  const deleteCookie = useCallback(() => {
    Cookies.remove(name);
    setValue(defaultValue);
  }, [name, defaultValue]);

  return [value, updateCookie, deleteCookie];
}

