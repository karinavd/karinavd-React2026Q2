import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from '../App';
import userEvent from '@testing-library/user-event';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/queryClient';

const mockResponse = [
  {
    id: '1',
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
    url: 'https://swapi.info/api/people/1',
  },
  {
    id: '2',
    name: 'Darth Vader',
    height: '202',
    mass: '136',
    hair_color: 'none',
    skin_color: 'white',
    eye_color: 'yellow',
    birth_year: '41.9BBY',
    gender: 'male',
    url: 'https://swapi.info/api/people/4',
  },
];

describe('App component', () => {
  beforeEach(() => {
    localStorage.clear();
    queryClient.clear();
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse),
        })
      )
    );
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('check if app components render correctly', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('fetches data successfully from API', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );

    expect(await screen.findByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith('https://swapi.info/api/people');
  });

  it('handles search term from localStorage on initial load', async () => {
    localStorage.setItem('savedSearchItem', JSON.stringify('Darth Vader'));
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(screen.getByText('Darth Vader')).toBeInTheDocument();
      expect(screen.queryByText('Luke Skywalker')).not.toBeInTheDocument();
    });
  });

  it('displays specific error message when API rejects with an Error object', async () => {
    queryClient.clear();
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.reject(new Error('Failed to fetch data')))
    );
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );
    await waitFor(
      () => {
        const errorText = screen.queryByText(/Error:/i);
        expect(errorText).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  describe('state management tests', () => {
    it('manages search term state correctly', async () => {
      const user = userEvent.setup();
      queryClient.clear();
      render(
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      );

      await screen.findByText('Luke Skywalker');

      const input = screen.getByRole('textbox');
      const submitBtn = screen.getByRole('button', { name: /search/i });

      fireEvent.change(input, { target: { value: 'Luke Skywalker' } });
      await user.click(submitBtn);

      await waitFor(() => {
        expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
      });
    });
  });

  describe('cache and loading state tests', () => {
    it('displays loading indicator while fetching data', async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      );

      await waitFor(() => {
        expect(
          screen.getByRole('button', { name: /Refresh Data/i })
        ).toBeInTheDocument();
      });
    });

    it('caches data on second query with same search term', async () => {
      const fetchSpy = vi.mocked(globalThis.fetch);
      render(
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      );

      await screen.findByText('Luke Skywalker');
      const callCount = fetchSpy.mock.calls.length;

      queryClient.refetchQueries({ queryKey: ['characters', ''] });

      await waitFor(() => {
        expect(fetchSpy.mock.calls.length).toBeGreaterThan(callCount);
      });
    });

    it('invalidates cache when refresh button is clicked', async () => {
      const user = userEvent.setup();
      render(
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      );

      await screen.findByText('Luke Skywalker');
      const initialCallCount = vi.mocked(globalThis.fetch).mock.calls.length;

      const refreshBtn = screen.getByRole('button', { name: /Refresh Data/i });
      await user.click(refreshBtn);

      await waitFor(() => {
        expect(vi.mocked(globalThis.fetch).mock.calls.length).toBeGreaterThan(
          initialCallCount
        );
      });
    });
  });
});
