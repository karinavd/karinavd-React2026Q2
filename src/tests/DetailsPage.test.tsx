import { screen, waitFor } from '@testing-library/dom';
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import DetailsPage from '../components/DetailsPage';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/queryClient';
import userEvent from '@testing-library/user-event';

const mockdata = [
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
];

describe('DetailsPage component', () => {
  beforeEach(() => {
    queryClient.clear();
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockdata),
        })
      )
    );
  });

  it('renders DetailsPage component correctly', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/details/Luke Skywalker']}>
          <Routes>
            <Route path="/details/:id" element={<DetailsPage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
      expect(screen.getByText('Height: 172')).toBeInTheDocument();
    });
  });

  it('displays refresh button on details page', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/details/Luke Skywalker']}>
          <Routes>
            <Route path="/details/:id" element={<DetailsPage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Refresh/i })).toBeInTheDocument();
    });
  });

  it('refetches data when refresh button is clicked', async () => {
    const user = userEvent.setup();
    const fetchSpy = vi.mocked(globalThis.fetch);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/details/Luke Skywalker']}>
          <Routes>
            <Route path="/details/:id" element={<DetailsPage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });

    const initialCallCount = fetchSpy.mock.calls.length;

    const refreshBtn = screen.getByRole('button', { name: /Refresh/i });
    await user.click(refreshBtn);

    await waitFor(() => {
      expect(fetchSpy.mock.calls.length).toBeGreaterThan(initialCallCount);
    });
  });

  it('displays error message when fetch fails', async () => {
    queryClient.clear();
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.reject(new Error('Failed to fetch character')))
    );

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/details/Luke Skywalker']}>
          <Routes>
            <Route path="/details/:id" element={<DetailsPage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(
      () => {
        const errorElement = screen.queryByText(/Error:/i);
        expect(errorElement).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
