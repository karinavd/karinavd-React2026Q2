import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import NotFound from '../components/NotFound';

describe('Not Found component', () => {
  it('renders Not Found component correctly', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    expect(screen.getByText(/page not Found/i)).toBeInTheDocument();
  });
});
