'use client';

import { useEffect, useState, type ReactNode } from 'react';
import type { Theme } from '@/app/types';
import { ThemeContext } from '../ThemeContext';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currTheme, setCurrTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light';
    return (localStorage.getItem('theme') as Theme) || 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', currTheme === 'dark');
    localStorage.setItem('theme', currTheme);
  }, [currTheme]);

  const toggleTheme = () => {
    setCurrTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme: currTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
