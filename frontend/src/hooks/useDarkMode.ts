import useLocalStorage from './useLocalStorage';

export default function useDarkMode() {
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme:dark)').matches;
  const { value: darkMode, setValue: setMode } = useLocalStorage('darkMode', prefersDarkMode) as {
    value: boolean;
    setValue: React.Dispatch<React.SetStateAction<boolean>>;
  };
  const enabled = darkMode ?? prefersDarkMode;

  return [enabled, setMode] as const;
}
