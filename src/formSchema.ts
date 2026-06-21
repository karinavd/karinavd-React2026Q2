import { z } from 'zod';
export const formSchema = (validCountries: string[]) =>
  z
    .object({
      name: z
        .string()
        .min(1, 'Name is required')
        .refine(
          (value) => value.length > 0 && value[0] === value[0].toUpperCase(),
          'Name must start with a capital letter'
        ),
      age: z
        .number({
          message: 'Age must be a valid number',
        })
        .min(0, 'Age cannot be negative')
        .max(130, 'Please enter a valid age'),
      email: z.string().refine((val) => {
        const parts = val.split('@');
        if (parts.length !== 2) return false;
        if (parts[0].length === 0) return false;
        if (!parts[1].includes('.')) return false;
        return true;
      }, 'Please enter a valid email address'),
      gender: z.enum(['male', 'female'], {
        message: 'Select gender',
      }),
      country: z
        .string()
        .refine(
          (val) => validCountries.includes(val),
          'Select a valid country'
        ),
      image: z.string().min(1, 'Image is required'),
      password: z.string().min(1, 'Password is required'),
      confirmPassword: z.string().min(1, 'Confirm password is required'),
      terms: z
        .boolean()
        .refine((val) => val === true, 'You must accept Terms and Conditions'),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    });
export type FormSchema = z.infer<ReturnType<typeof formSchema>>;
