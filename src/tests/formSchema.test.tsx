import { describe, it, expect } from 'vitest';
import { formSchema } from '../formSchema';

describe('formSchema validation', () => {
  const validCountries = ['USA', 'Canada', 'Ukraine'];
  const schema = formSchema(validCountries);

  const validData = {
    name: 'John',
    age: 25,
    email: 'john@example.com',
    gender: 'male',
    country: 'USA',
    image: 'base64-mock-string',
    password: 'Password123!',
    confirmPassword: 'Password123!',
    terms: true,
  };

  it('passes validation with correct data', () => {
    const result = schema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('fails if name is empty', () => {
    const result = schema.safeParse({ ...validData, name: '' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.name).toContain('Name is required');
    }
  });

  it('fails if name does not start with a capital letter', () => {
    const result = schema.safeParse({ ...validData, name: 'john' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.name).toContain('Name must start with a capital letter');
    }
  });

  it('fails if age is not a number', () => {
    const result = schema.safeParse({ ...validData, age: '25' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.age).toContain('Age must be a valid number');
    }
  });

  it('fails if age is negative', () => {
    const result = schema.safeParse({ ...validData, age: -5 });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.age).toContain('Age cannot be negative');
    }
  });

  it('fails if age exceeds 130', () => {
    const result = schema.safeParse({ ...validData, age: 135 });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.age).toContain('Please enter a valid age');
    }
  });

  it('fails if email does not contain @', () => {
    const result = schema.safeParse({ ...validData, email: 'john.example.com' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.email).toContain('Please enter a valid email address');
    }
  });

  it('fails if email has no local part before @', () => {
    const result = schema.safeParse({ ...validData, email: '@example.com' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.email).toContain('Please enter a valid email address');
    }
  });

  it('fails if email domain does not contain a dot', () => {
    const result = schema.safeParse({ ...validData, email: 'john@examplecom' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.email).toContain('Please enter a valid email address');
    }
  });

  it('fails if gender is invalid', () => {
    const result = schema.safeParse({ ...validData, gender: 'other' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.gender).toContain('Select gender');
    }
  });

  it('fails if country is not in the validCountries array', () => {
    const result = schema.safeParse({ ...validData, country: 'Germany' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.country).toContain('Select a valid country');
    }
  });

  it('fails if image is empty', () => {
    const result = schema.safeParse({ ...validData, image: '' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.image).toContain('Image is required');
    }
  });

  it('fails if password is empty', () => {
    const result = schema.safeParse({ ...validData, password: '' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.password).toContain('Password is required');
    }
  });

  it('fails if terms are false', () => {
    const result = schema.safeParse({ ...validData, terms: false });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.terms).toContain('You must accept Terms and Conditions');
    }
  });

  it('fails and targets confirmPassword if passwords do not match', () => {
    const result = schema.safeParse({ ...validData, confirmPassword: 'DifferentPassword123!' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.confirmPassword).toContain('Passwords do not match');
    }
  });
});