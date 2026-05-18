import { useState } from 'react';

export const useLocalStorage = <T>(
  key: string,
  defaultValue: T
): [T, (newValue: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : defaultValue;
    } catch (err) {
      console.error(err);
      return defaultValue;
    }
  });

  const setValue = (newValue: T) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (err) {
      console.error(err);
    }
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};
