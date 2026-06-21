import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { UncontrolledForm } from '../components/UncontrolledForm.tsx';
import { useFormStore } from '../useFormState';
import { toBase64 } from '../fileToBase64';
import { getPasswordStrength } from '../getPasswordStrength';
import { formSchema } from '../formSchema.ts';
import { passwordRequirements } from '../components/passwordRequirements/passwordRequirements.tsx';

vi.mock('../useFormState');
vi.mock('../fileToBase64');
vi.mock('../getPasswordStrength');
vi.mock('../formSchema.ts');
vi.mock('../components/passwordRequirements/passwordRequirements.tsx');

describe('UncontrolledForm Component', () => {
  const mockOnSuccess = vi.fn();
  const mockAddSubmission = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useFormStore).mockReturnValue({
      countries: ['USA', 'Ukraine'],
      addSubmission: mockAddSubmission,
    } as any);

    vi.mocked(getPasswordStrength).mockReturnValue({
  hasNumber: true,
  hasUpperCase: true,
  hasLowerCase: true,
  hasSpecialChar: true,
});
    vi.mocked(toBase64).mockResolvedValue('mock-base64-string');
    vi.mocked(passwordRequirements).mockReturnValue([
      { text: 'Mock Requirement', met: true },
    ]);
  });

  it('renders the form with all fields', () => {
    vi.mocked(formSchema).mockReturnValue({ safeParse: vi.fn() } as any);
    
    render(<UncontrolledForm onSuccess={mockOnSuccess} />);

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('handles password change and calls validation utilities', async () => {
    vi.mocked(formSchema).mockReturnValue({ safeParse: vi.fn() } as any);
    const user = userEvent.setup();
    
    render(<UncontrolledForm onSuccess={mockOnSuccess} />);
    
    const passwordInput = screen.getByLabelText('Password');
    await user.type(passwordInput, 'MyPass123!');

    expect(getPasswordStrength).toHaveBeenCalledWith('MyPass123!');
    expect(passwordRequirements).toHaveBeenCalledWith('MyPass123!');
    expect(screen.getByText('Mock Requirement')).toBeInTheDocument();
  });

  describe('Image upload handling', () => {
    it('stops execution if no file is selected', () => {
      vi.mocked(formSchema).mockReturnValue({ safeParse: vi.fn() } as any);
      render(<UncontrolledForm onSuccess={mockOnSuccess} />);

      const fileInput = screen.getByLabelText(/profile image/i);
      fireEvent.change(fileInput, { target: { files: [] } });

      expect(toBase64).not.toHaveBeenCalled();
    });

    it('displays an error if the uploaded file is not an image', async () => {
    vi.mocked(formSchema).mockReturnValue({ safeParse: vi.fn() } as any);
    render(<UncontrolledForm onSuccess={mockOnSuccess} />);

    const fileInput = screen.getByLabelText(/profile image/i);
    const invalidFile = new File(['text'], 'test.txt', { type: 'text/plain' });
    
    fireEvent.change(fileInput, { target: { files: [invalidFile] } });

    expect(await screen.findByText('Only PNG or JPEG allowed')).toBeInTheDocument();
  });

  it('displays an error if the image exceeds 2MB', async () => {
    vi.mocked(formSchema).mockReturnValue({ safeParse: vi.fn() } as any);
    render(<UncontrolledForm onSuccess={mockOnSuccess} />);

    const fileInput = screen.getByLabelText(/profile image/i);
    const largeFile = new File(['a'], 'large.png', { type: 'image/png' });
    Object.defineProperty(largeFile, 'size', { value: 3 * 1024 * 1024 }); 
    
    fireEvent.change(fileInput, { target: { files: [largeFile] } });

    expect(await screen.findByText('File size must be less than 2MB')).toBeInTheDocument();
  });

    it('displays an error if the image exceeds 2MB', async () => {
      vi.mocked(formSchema).mockReturnValue({ safeParse: vi.fn() } as any);
      const user = userEvent.setup();
      render(<UncontrolledForm onSuccess={mockOnSuccess} />);

      const fileInput = screen.getByLabelText(/profile image/i);
      const largeFile = new File(['a'], 'large.png', { type: 'image/png' });
      Object.defineProperty(largeFile, 'size', { value: 3 * 1024 * 1024 }); 
      
      await user.upload(fileInput, largeFile);

      expect(screen.getByText('File size must be less than 2MB')).toBeInTheDocument();
    });

    it('successfully converts a valid image to base64', async () => {
      vi.mocked(formSchema).mockReturnValue({ safeParse: vi.fn() } as any);
      const user = userEvent.setup();
      render(<UncontrolledForm onSuccess={mockOnSuccess} />);

      const fileInput = screen.getByLabelText(/profile image/i);
      const validFile = new File(['image-content'], 'test.png', { type: 'image/png' });
      
      await user.upload(fileInput, validFile);

      expect(toBase64).toHaveBeenCalledWith(validFile);
    });
  });

  describe('Form submission', () => {
    it('displays errors if Zod validation fails', async () => {
      const user = userEvent.setup();
      
      const mockSafeParse = vi.fn().mockReturnValue({
        success: false,
        error: {
          flatten: () => ({
            fieldErrors: {
              name: ['Name is required'],
              age: [],
            }
          })
        }
      });
      vi.mocked(formSchema).mockReturnValue({ safeParse: mockSafeParse } as any);

      render(<UncontrolledForm onSuccess={mockOnSuccess} />);
      
      const submitBtn = screen.getByRole('button', { name: /submit/i });
      await user.click(submitBtn);

      expect(mockSafeParse).toHaveBeenCalled();
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(mockAddSubmission).not.toHaveBeenCalled();
    });

    it('successfully saves data, clears the form, and closes the modal', async () => {
      const user = userEvent.setup();
      
      const mockSafeParse = vi.fn().mockReturnValue({
        success: true,
        data: { name: 'Test User', age: 20 }
      });
      vi.mocked(formSchema).mockReturnValue({ safeParse: mockSafeParse } as any);

      render(<UncontrolledForm onSuccess={mockOnSuccess} />);
      
      const submitBtn = screen.getByRole('button', { name: /submit/i });
      await user.click(submitBtn);

      expect(mockAddSubmission).toHaveBeenCalledWith({ name: 'Test User', age: 20 });
      expect(mockOnSuccess).toHaveBeenCalledTimes(1);
    });
  });
});