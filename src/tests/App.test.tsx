import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App.tsx';
describe('App Component', () => {
  it('check whether the MainPage component renders', () => {
    render(<App />);
    const header = screen.getByText('React Forms');
    expect(header).toBeInTheDocument();
  });
});
