import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useFormStore } from '../useFormState';
import MainPage from '../components/MainPage.tsx';

vi.mock('../useFormState', () => ({
  useFormStore: vi.fn(),
}));

vi.mock('../components/Modal', () => ({
  Modal: ({ isOpen, onClose, title, children }: any) => {
    if (!isOpen) return null;
    return (
      <div data-testid="mock-modal">
        <h2>{title}</h2>
        <button data-testid="close-modal-btn" onClick={onClose}>Close</button>
        {children}
      </div>
    );
  }
}));

vi.mock('../components/ReactHookFormComponent', () => ({
  ReactHookFormComponent: ({ onSuccess }: any) => (
    <div data-testid="rhf-mock">
      <button data-testid="rhf-success-btn" onClick={onSuccess}>RHF Success</button>
    </div>
  )
}));

vi.mock('../components/UncontrolledForm', () => ({
  UncontrolledForm: ({ onSuccess }: any) => (
    <div data-testid="unc-mock">
      <button data-testid="unc-success-btn" onClick={onSuccess}>Unc Success</button>
    </div>
  )
}));

describe('MainPage Component', () => {
  const mockSubmissions = [
    {
      id: '1',
      name: 'John Doe',
      age: 25,
      email: 'john@example.com',
      gender: 'male',
      country: 'USA',
      image: 'test-image.jpg',
    },
  ];

  beforeEach(() => {
    vi.mocked(useFormStore).mockImplementation((selector: any) => 
      selector({ submissions: mockSubmissions })
    );
  });

  it('renders headings, buttons, and submission history by default', () => {
    render(<MainPage />);

    expect(screen.getByText('React Forms')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'RHF Form' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Uncontrolled Form' })).toBeInTheDocument();
    
    expect(screen.queryByTestId('mock-modal')).toBeNull();

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('opens React Hook Form modal when the corresponding button is clicked', async () => {
    const user = userEvent.setup();
    render(<MainPage />);

    const rhfButton = screen.getByRole('button', { name: 'RHF Form' });
    await user.click(rhfButton);

    expect(screen.getByTestId('mock-modal')).toBeInTheDocument();
    expect(screen.getByText('React Hook Form')).toBeInTheDocument();
    expect(screen.getByTestId('rhf-mock')).toBeInTheDocument();
  });

  it('opens Uncontrolled Form modal when the corresponding button is clicked', async () => {
    const user = userEvent.setup();
    render(<MainPage />);

    const uncButton = screen.getByRole('button', { name: 'Uncontrolled Form' });
    await user.click(uncButton);

    expect(screen.getByTestId('mock-modal')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Uncontrolled Form' })).toBeInTheDocument();
    expect(screen.getByTestId('unc-mock')).toBeInTheDocument();
  });

  it('closes the modal when onClose is called (clicking the close button)', async () => {
    const user = userEvent.setup();
    render(<MainPage />);

    await user.click(screen.getByRole('button', { name: 'RHF Form' }));
    expect(screen.getByTestId('mock-modal')).toBeInTheDocument();

    await user.click(screen.getByTestId('close-modal-btn'));
    expect(screen.queryByTestId('mock-modal')).toBeNull();
  });

  it('closes the modal on successful form submission (onSuccess call)', async () => {
    const user = userEvent.setup();
    render(<MainPage />);

    await user.click(screen.getByRole('button', { name: 'Uncontrolled Form' }));
    
    await user.click(screen.getByTestId('unc-success-btn'));
    
    expect(screen.queryByTestId('mock-modal')).toBeNull();
  });
});