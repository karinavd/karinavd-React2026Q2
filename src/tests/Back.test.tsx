import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Back from '../components/Back';
import { MemoryRouter } from 'react-router-dom';

describe('Back component', () => {
  it('renders Back component correctly', () => {
    render(
      <MemoryRouter>
        <Back />
      </MemoryRouter>
    );

    const linkEl = screen.getByRole('link', { name: /back/i });
    expect(linkEl).toBeInTheDocument();
    expect(linkEl).toHaveAttribute('href', '/');
  });
});
