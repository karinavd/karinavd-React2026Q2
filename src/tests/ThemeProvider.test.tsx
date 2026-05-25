import { beforeEach, describe, expect, it, vi } from 'vitest';
import ThemeProvider from '../components/ThemeProvider';
import { fireEvent, render, screen } from '@testing-library/react';
import Header from '../components/MainPage/Header';
import { MemoryRouter } from 'react-router-dom';

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });
  it('renders with default light theme', () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Header
            handleSearch={vi.fn()}
            isLoading={false}
            triggerErr={vi.fn()}
          />
        </ThemeProvider>
      </MemoryRouter>
    );
    expect(document.documentElement.classList.contains('dark')).toBeFalsy();
  });

  it('toggles theme to dark and saves to localStorage', () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Header
            handleSearch={vi.fn()}
            isLoading={false}
            triggerErr={vi.fn()}
          />
        </ThemeProvider>
      </MemoryRouter>
    );

    const toggleButton = screen.getByText(/☾ Dark Mode/i);
    fireEvent.click(toggleButton);
    expect(document.documentElement.classList.contains('dark')).toBeTruthy();
    expect(localStorage.getItem('theme')).toBe('dark');
  });
});
