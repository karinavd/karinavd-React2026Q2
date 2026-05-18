import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import About from '../components/About';

describe('About component', () => {
  it('renders About component correctly', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
    expect(screen.getByText('About the application')).toBeInTheDocument();
    expect(screen.getByText('Karyna')).toBeInTheDocument();
  });
});
