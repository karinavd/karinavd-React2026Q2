import type { FormSubmitType } from './FormSubmitType';

export type FormState = {
  submissions: FormSubmitType[];
  countries: string[];
  addSubmission: (submission: Omit<FormSubmitType, 'id'>) => void;
};
