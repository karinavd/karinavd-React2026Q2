import React, { useEffect, useState, type ReactNode } from 'react';
import { ThemeContext } from '../ThemeContext';

type Theme = 'light' | 'dark';
const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currTheme, setCurrTheme] = useState<Theme>(
    () => (localStorage.getItem('theme') as Theme) || 'light'
  );
  useEffect(() => {
    const root = document.documentElement;
    if (currTheme === 'light') {
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
    }
    localStorage.setItem('theme', currTheme);
  }, [currTheme]);
  const toggleTheme = () =>
    setCurrTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
  return (
    <ThemeContext.Provider value={{ theme: currTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
