import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useFormStore } from '../useFormState';

describe('useFormStore', () => {
  const mockTimestamp = 1700000000000;
  const mockUuid = '123e4567-e89b-12d3-a456-426614174000';

  beforeEach(() => {
    vi.spyOn(Date, 'now').mockReturnValue(mockTimestamp);
    
    vi.stubGlobal('crypto', {
      randomUUID: vi.fn().mockReturnValue(mockUuid),
    });

    useFormStore.setState({ submissions: [] });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('initializes with empty submissions and a list of countries', () => {
    const state = useFormStore.getState();
    
    expect(state.submissions).toEqual([]);
    expect(state.countries).toHaveLength(9);
    expect(state.countries).toContain('Ukraine');
    expect(state.countries).toContain('USA');
  });

  it('adds a submission with a generated id and timestamp', () => {
    const mockData = {
      name: 'John Doe',
      age: 25,
      email: 'john@example.com',
      gender: 'male'as  const,
      country: 'USA',
      terms: true,
      image: 'base64-string',
      password: 'Password1!',
      confirmPassword: 'Password1!',
    };

    useFormStore.getState().addSubmission(mockData);

    const state = useFormStore.getState();
    
    expect(state.submissions).toHaveLength(1);
    expect(state.submissions[0]).toEqual({
      ...mockData,
      id: mockUuid,
      submittedAt: mockTimestamp,
    });
  });

  it('appends new submissions to the existing list', () => {
    const initialSubmission = {
      id: 'existing-id',
      name: 'Jane Doe',
      age: 30,
      email: 'jane@example.com',
      gender: 'female' as const,
      country: 'Canada',
      terms: true,
      image: 'base64-string',
      password: 'Password1!',
      confirmPassword: 'Password1!',
      submittedAt: 1600000000000,
    };

    useFormStore.setState({ submissions: [initialSubmission] });

    const newData = {
      name: 'John Smith',
      age: 40,
      email: 'john.smith@example.com',
      gender: 'male' as const,
      country: 'UK',
      terms: true,
      image: 'base64-string2',
      password: 'Password2!',
      confirmPassword: 'Password2!',
    };

    useFormStore.getState().addSubmission(newData);

    const state = useFormStore.getState();
    
    expect(state.submissions).toHaveLength(2);
    expect(state.submissions[0]).toEqual(initialSubmission);
    expect(state.submissions[1].id).toBe(mockUuid);
    expect(state.submissions[1].name).toBe('John Smith');
  });
});