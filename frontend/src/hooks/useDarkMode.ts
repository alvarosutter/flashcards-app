import useLocalStorage from './useLocalStorage';

export default function useDarkMode() {
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme:dark)').matches;
  const [darkMode, setMode] = useLocalStorage('darkMode', prefersDarkMode) as [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
  ];
  const enabled = darkMode ?? prefersDarkMode;

  return [enabled, setMode] as const;
}
