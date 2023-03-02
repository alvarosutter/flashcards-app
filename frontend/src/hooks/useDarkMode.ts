import useLocalStorage from './useLocalStorage';

export default function useDarkMode() {
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme:dark)').matches;
  const [darkMode, setMode] = useLocalStorage('darkMode', prefersDarkMode);
  const enabled = darkMode ?? prefersDarkMode;

  return [enabled, setMode];
}
