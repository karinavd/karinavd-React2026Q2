import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useForm } from 'react-hook-form';

import { useFormStore } from '../useFormState';
import { toBase64 } from '../fileToBase64';
import { getPasswordStrength } from '../getPasswordStrength';
import { formSchema } from '../formSchema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactHookFormComponent } from '../components/ReactHookFormComponent.tsx';
import { passwordRequirements } from '../components/passwordRequirements/passwordRequirements.tsx';

vi.mock('react-hook-form');
vi.mock('@hookform/resolvers/zod');
vi.mock('../useFormState');
vi.mock('../fileToBase64');
vi.mock('../getPasswordStrength');
vi.mock('../formSchema.ts');
vi.mock('../components/passwordRequirements/passwordRequirements.tsx');

describe('ReactHookFormComponent', () => {
  const mockOnSuccess = vi.fn();
  const mockAddSubmission = vi.fn();
  const mockSetValue = vi.fn();
  const mockWatch = vi.fn().mockReturnValue('MockPass123!');
  
  const mockHandleSubmit = vi.fn((fn) => (e: any) => {
    if (e && e.preventDefault) e.preventDefault();
    fn({ name: 'Valid User', age: 30 });
  });

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useFormStore).mockReturnValue({
      countries: ['USA', 'Ukraine'],
      addSubmission: mockAddSubmission,
    } as any);

    vi.mocked(formSchema).mockReturnValue({} as any);
    vi.mocked(zodResolver).mockReturnValue(vi.fn() as any);

    vi.mocked(useForm).mockReturnValue({
      register: vi.fn(),
      handleSubmit: mockHandleSubmit,
      watch: mockWatch,
      setValue: mockSetValue,
      formState: { errors: {}, isValid: true },
    } as any);

    vi.mocked(getPasswordStrength).mockReturnValue({
      hasNumber: true,
      hasUpperCase: true,
      hasLowerCase: true,
      hasSpecialChar: true,
    } as any);

    vi.mocked(toBase64).mockResolvedValue('mock-base64-string');
    
    vi.mocked(passwordRequirements).mockReturnValue([
      { text: 'Mock Requirement', met: true },
    ]);
  });

  it('renders the form and watches password', () => {
    render(<ReactHookFormComponent onSuccess={mockOnSuccess} />);

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(mockWatch).toHaveBeenCalledWith('password', '');
    expect(getPasswordStrength).toHaveBeenCalledWith('MockPass123!');
    expect(passwordRequirements).toHaveBeenCalledWith('MockPass123!');
    expect(screen.getByText('Mock Requirement')).toBeInTheDocument();
  });

  it('displays validation errors and disables submit button', () => {
    vi.mocked(useForm).mockReturnValue({
      register: vi.fn(),
      handleSubmit: mockHandleSubmit,
      watch: mockWatch,
      setValue: mockSetValue,
      formState: {
        errors: { name: { message: 'Name is required' } },
        isValid: false,
      },
    } as any);

    render(<ReactHookFormComponent onSuccess={mockOnSuccess} />);
    
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
  });

  describe('Image upload handling', () => {
    it('stops execution if no file is selected', () => {
      render(<ReactHookFormComponent onSuccess={mockOnSuccess} />);
      const fileInput = screen.getByLabelText(/profile image/i);
      
      fireEvent.change(fileInput, { target: { files: [] } });

      expect(toBase64).not.toHaveBeenCalled();
      expect(mockSetValue).not.toHaveBeenCalled();
    });

    it('displays an error if the uploaded file is not an image', async () => {
      render(<ReactHookFormComponent onSuccess={mockOnSuccess} />);
      const fileInput = screen.getByLabelText(/profile image/i);
      const invalidFile = new File(['text'], 'test.txt', { type: 'text/plain' });
      
      fireEvent.change(fileInput, { target: { files: [invalidFile] } });

      expect(await screen.findByText('Only PNG or JPEG allowed')).toBeInTheDocument();
    });

    it('displays an error if the image exceeds 2MB', async () => {
      render(<ReactHookFormComponent onSuccess={mockOnSuccess} />);
      const fileInput = screen.getByLabelText(/profile image/i);
      const largeFile = new File(['a'], 'large.png', { type: 'image/png' });
      Object.defineProperty(largeFile, 'size', { value: 3 * 1024 * 1024 }); 
      
      fireEvent.change(fileInput, { target: { files: [largeFile] } });

      expect(await screen.findByText('File size must be less than 2MB')).toBeInTheDocument();
    });

    it('successfully converts a valid image and calls setValue', async () => {
      render(<ReactHookFormComponent onSuccess={mockOnSuccess} />);
      const fileInput = screen.getByLabelText(/profile image/i);
      const validFile = new File(['image-content'], 'test.png', { type: 'image/png' });
      
      fireEvent.change(fileInput, { target: { files: [validFile] } });

      await waitFor(() => {
        expect(toBase64).toHaveBeenCalledWith(validFile);
      });
      expect(mockSetValue).toHaveBeenCalledWith('image', 'mock-base64-string', { shouldValidate: true });
    });
  });

  describe('Form submission', () => {
    it('submits valid data, calls addSubmission and onSuccess', async () => {
      const user = userEvent.setup();
      render(<ReactHookFormComponent onSuccess={mockOnSuccess} />);
      
      const submitBtn = screen.getByRole('button', { name: /submit/i });
      await user.click(submitBtn);

      expect(mockAddSubmission).toHaveBeenCalledWith({ name: 'Valid User', age: 30 });
      expect(mockOnSuccess).toHaveBeenCalledTimes(1);
    });
  });
});