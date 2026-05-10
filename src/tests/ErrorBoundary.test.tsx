import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ErrorBoundary } from '../components/ErrorBoundary';
import userEvent from '@testing-library/user-event';
import App from '../App';
const ErrComponent = () => {
  throw new Error('Test exception');
};
describe('Error Boundary Tests', () => {
  beforeEach(() => vi.spyOn(console, 'error').mockImplementation(() => {}));
  const user = userEvent.setup();
  describe('error Catching Tests', () => {
    it('catches and handles JavaScript errors in child components and  fallback UI ', () => {
      render(
        <ErrorBoundary>
          <ErrComponent />
        </ErrorBoundary>
      );
      expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /reload page/i })
      ).toBeInTheDocument();
    });
    it('Logs error to console', () => {
      render(
        <ErrorBoundary>
          <ErrComponent />
        </ErrorBoundary>
      );
      expect(console.error).toHaveBeenCalled();
    });
  });
  describe('Error Button Tests', () => {
    it('throws error when test button is clicked and triggers error boundary fallback UI', async () => {
      render(
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      );
      const errBtn = screen.getByRole('button', { name: /error button/i });
      await user.click(errBtn);
      expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    });
  });
  describe('ReloadButton component', () => {
  it('should call window.location.reload when button is clicked', async() => {
   
    const originalLocation = window.location;
    Object.defineProperty(window, 'location', {
      value: { reload: vi.fn() }
    });
    render(<ErrorBoundary>
      <App/>
      </ErrorBoundary>);
    const errBtn = screen.getByRole('button', { name: /error button/i });
      await user.click(errBtn);
    const reloadBtn = screen.getByRole('button', { name: /reload page/i });
      await user.click(reloadBtn);
    expect(window.location.reload).toHaveBeenCalled();
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: originalLocation,
    });
  });
});
});
