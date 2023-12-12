import { useCallback, useState, useEffect } from 'react';

function getSavedValue(key: string, initialValue: string | number | boolean | object) {
  const jsonValue = localStorage.getItem(key);
  if (jsonValue != null) {
    return JSON.parse(jsonValue) as typeof initialValue;
  }

  return initialValue;
}

function useLocalStorage(key: string, initialValue: string | number | boolean | object) {
  const [value, setValue] = useState(() => getSavedValue(key, initialValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  const remove = useCallback(() => {
    localStorage.removeItem(key);
  }, []);

  return { value, setValue, remove };
}

export default useLocalStorage;
