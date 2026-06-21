import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getPasswordStrength } from '../getPasswordStrength';
import { passwordRequirements } from '../components/passwordRequirements/passwordRequirements';

vi.mock('../getPasswordStrength');

describe('passwordRequirements utility', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns all requirements as not met when getPasswordStrength returns all false', () => {
    vi.mocked(getPasswordStrength).mockReturnValue({
      hasNumber: false,
      hasUpperCase: false,
      hasLowerCase: false,
      hasSpecialChar: false,
    });

    const result = passwordRequirements('weak');

    expect(getPasswordStrength).toHaveBeenCalledWith('weak');
    expect(result).toEqual([
      { met: false, text: '1 number' },
      { met: false, text: '1 uppercase' },
      { met: false, text: '1 lowercase' },
      { met: false, text: '1 special character' },
    ]);
  });

  it('returns all requirements as met when getPasswordStrength returns all true', () => {
    vi.mocked(getPasswordStrength).mockReturnValue({
      hasNumber: true,
      hasUpperCase: true,
      hasLowerCase: true,
      hasSpecialChar: true,
    });

    const result = passwordRequirements('Strong1!');

    expect(getPasswordStrength).toHaveBeenCalledWith('Strong1!');
    expect(result).toEqual([
      { met: true, text: '1 number' },
      { met: true, text: '1 uppercase' },
      { met: true, text: '1 lowercase' },
      { met: true, text: '1 special character' },
    ]);
  });

  it('correctly maps mixed validation results', () => {
    vi.mocked(getPasswordStrength).mockReturnValue({
      hasNumber: true,
      hasUpperCase: false,
      hasLowerCase: true,
      hasSpecialChar: false,
    });

    const result = passwordRequirements('pass123');

    expect(getPasswordStrength).toHaveBeenCalledWith('pass123');
    expect(result).toEqual([
      { met: true, text: '1 number' },
      { met: false, text: '1 uppercase' },
      { met: true, text: '1 lowercase' },
      { met: false, text: '1 special character' },
    ]);
  });
});