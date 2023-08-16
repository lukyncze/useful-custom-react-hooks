import {Dispatch, SetStateAction, useEffect} from 'react';
import useMediaQuery from '../16-useMediaQuery/useMediaQuery';
import {useLocalStorage} from '../8-useStorage/useStorage';
import {Maybe} from '../types';

type DarkModeHookReturnType = [boolean, Dispatch<SetStateAction<Maybe<boolean>>>];

export default function useDarkMode(): DarkModeHookReturnType {
  const [darkMode, setDarkMode] = useLocalStorage<boolean>('useDarkMode', false);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const enabled = darkMode ?? prefersDarkMode;

  useEffect(() => {
    document.body.classList.toggle('dark-mode', enabled);
  }, [enabled]);

  return [enabled, setDarkMode];
}

