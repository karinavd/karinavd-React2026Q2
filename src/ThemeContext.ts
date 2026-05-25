import { createContext } from 'react';
import type { ThemeContextType } from './interfaces/ThemeContext';

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
});
