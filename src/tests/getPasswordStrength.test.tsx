import { describe, it, expect } from 'vitest';
import { getPasswordStrength } from '../getPasswordStrength';

describe('getPasswordStrength utility', () => {
  it('returns all false for an empty string', () => {
    const result = getPasswordStrength('');
    expect(result).toEqual({
      hasNumber: false,
      hasUpperCase: false,
      hasLowerCase: false,
      hasSpecialChar: false,
    });
  });

  it('detects only lowercase letters', () => {
    const result = getPasswordStrength('password');
    expect(result).toEqual({
      hasNumber: false,
      hasUpperCase: false,
      hasLowerCase: true,
      hasSpecialChar: false,
    });
  });

  it('detects only uppercase letters', () => {
    const result = getPasswordStrength('PASSWORD');
    expect(result).toEqual({
      hasNumber: false,
      hasUpperCase: true,
      hasLowerCase: false,
      hasSpecialChar: false,
    });
  });

  it('detects only numbers', () => {
    const result = getPasswordStrength('12345678');
    expect(result).toEqual({
      hasNumber: true,
      hasUpperCase: false,
      hasLowerCase: false,
      hasSpecialChar: false,
    });
  });

  it('detects only special characters', () => {
    const result = getPasswordStrength('!@#$%^');
    expect(result).toEqual({
      hasNumber: false,
      hasUpperCase: false,
      hasLowerCase: false,
      hasSpecialChar: true,
    });
  });

  it('returns all true for a strong password', () => {
    const result = getPasswordStrength('StrongPass123!');
    expect(result).toEqual({
      hasNumber: true,
      hasUpperCase: true,
      hasLowerCase: true,
      hasSpecialChar: true,
    });
  });
});