import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormStore } from '../useFormState';
import { type ChangeEvent } from 'react';
import { toBase64 } from '../fileToBase64';
import { InputField } from './UniversalInputField/InputField';
import { SelectField } from './UniversalInputField/SelectField';
import { DatalistField } from './UniversalInputField/DataList';
import { CheckboxField } from './UniversalInputField/Checkbox';
import { formSchema, type FormSchema } from '../formSchema.ts';
import { getPasswordStrength } from '../getPasswordStrength';
import { passwordRequirements } from './passwordRequirements/passwordRequirements';
export const ReactHookFormComponent: React.FC<{ onSuccess: () => void }> = ({
  onSuccess,
}) => {
  const { countries, addSubmission } = useFormStore();
  const schema = formSchema(countries);
  const [imageError, setImageError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const passwordValue = watch('password', '');
  const strength = getPasswordStrength(passwordValue);
  const requirementsList = passwordRequirements(passwordValue);
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setImageError('');
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setImageError('Only PNG or JPEG allowed');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setImageError('File size must be less than 2MB');
      return;
    }

    const base64 = await toBase64(file);
    setValue('image', base64 as string, { shouldValidate: true });
  };

  const onSubmit = (data: FormSchema) => {
    console.log('Valid data:', data);
    addSubmission(data);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2.5">
      <InputField
        label="Name"
        id="rhf-name"
        error={errors.name?.message}
        {...register('name')}
      />
      <InputField
        label="Age"
        id="rhf-age"
        type="number"
        error={errors.age?.message}
        {...register('age', { valueAsNumber: true })}
      />
      <InputField
        label="Email"
        id="rhf-email"
        type="email"
        error={errors.email?.message}
        {...register('email')}
      />

      <SelectField
        label="Gender"
        id="rhf-gender"
        error={errors.gender?.message}
        options={[
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
          { value: 'other', label: 'Other' },
        ]}
        {...register('gender')}
      />

      <DatalistField
        label="Country"
        id="rhf-country"
        options={countries}
        error={errors.country?.message}
        {...register('country')}
      />
      <InputField
        label="Profile Image"
        id="rhf-image"
        type="file"
        accept="image/png, image/jpeg"
        error={imageError || errors.image?.message}
        onChange={handleImageChange}
      />

      <div>
        <InputField
          label="Password"
          id="rhf-password"
          type="password"
          error={errors.password?.message}
          {...register('password')}
        />

        <div className="flex flex-col gap-1 text-xs -mt-1 mb-4">
          {requirementsList.map((req, index) => (
            <div
              key={index}
              className={`flex items-center gap-1 ${req.met ? 'text-green-600' : 'text-gray-400'}`}
            >
              <span>{req.text}</span>
            </div>
          ))}
        </div>
      </div>

      <InputField
        label="Confirm Password"
        id="rhf-confirm"
        type="password"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />

      <CheckboxField
        label="I accept terms and conditions"
        id="rhf-terms"
        error={errors.terms?.message}
        {...register('terms')}
      />
      <button
        type="submit"
        disabled={!isValid}
        className="mt-2 w-full rounded-md bg-blue-50 py-2.5 px-4 text-black cursor-pointer border font-medium transition-colors disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        Submit
      </button>
    </form>
  );
};
