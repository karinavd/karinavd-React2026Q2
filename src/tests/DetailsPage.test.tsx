import { screen, waitFor } from '@testing-library/dom';
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import DetailsPage from '../components/DetailsPage';

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
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockdata),
        })
      )
    );
  });
  it('renders DetailsPage component correctly', async () => {
    render(
      <MemoryRouter initialEntries={['/details/Luke Skywalker']}>
        <Routes>
          <Route path="/details/:id" element={<DetailsPage />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
      expect(screen.getByText('Height: 172')).toBeInTheDocument();
    });
  });
});
