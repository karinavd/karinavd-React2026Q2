import { create } from 'zustand';
import type { FormState } from './types/FormState';
import type { FormSubmitType } from './types/FormSubmitType';

export const useFormStore = create<FormState>((set) => ({
  submissions: [],
  countries: [
    'Ukraine',
    'India',
    'Canada',
    'USA',
    'Germany',
    'France',
    'Japan',
    'United Kingdom',
    'Spain',
  ],
  addSubmission: (data: Omit<FormSubmitType, 'id'>) =>
    set((state: FormState) => ({
      submissions: [
        ...state.submissions,
        {
          ...data,
          id: crypto.randomUUID(),
          submittedAt: Date.now(),
        },
      ],
    })),
}));
