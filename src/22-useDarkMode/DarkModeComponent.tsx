import {Maybe} from '../types';
import './body.css';
import useDarkMode from './useDarkMode';

export default function DarkModeComponent() {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <button
      onClick={() => setDarkMode((prevDarkMode: Maybe<boolean>) => !prevDarkMode)}
      style={{
        border: `1px solid ${darkMode ? 'white' : 'black'}`,
        background: 'none',
        color: darkMode ? 'white' : 'black',
      }}
    >
      Toggle Dark Mode
    </button>
  );
}

