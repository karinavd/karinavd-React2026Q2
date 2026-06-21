import React, { useRef, useState, type SetStateAction } from 'react';
import { useFormStore } from '../useFormState';
import { getPasswordStrength } from '../getPasswordStrength';
import { toBase64 } from '../fileToBase64';
import { InputField } from './UniversalInputField/InputField';
import { SelectField } from './UniversalInputField/SelectField';
import { DatalistField } from './UniversalInputField/DataList';
import { CheckboxField } from './UniversalInputField/Checkbox';
import { formSchema } from '../formSchema.ts';
import { passwordRequirements } from './passwordRequirements/passwordRequirements';

export const UncontrolledForm: React.FC<{ onSuccess: () => void }> = ({
  onSuccess,
}) => {
  const { countries, addSubmission } = useFormStore();
  const schema = formSchema(countries);

  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [strength, setStrength] = useState(0);
  const [imageBase64, setImageBase64] = useState('');
  const [password, setPassword] = useState('');
  const requirementsList = passwordRequirements(password);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setStrength(Number(getPasswordStrength(e.target.value)));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setErrors((prev) => ({ ...prev, image: 'Only PNG or JPEG allowed' }));
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        image: 'File size must be less than 2MB',
      }));
      return;
    }

    const base64 = await toBase64(file);
    setImageBase64(base64 as SetStateAction<string>);
    setErrors((prev) => ({ ...prev, image: '' }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const rawData = {
      name: formData.get('name') as string,
      age: formData.get('age') ? Number(formData.get('age')) : NaN,
      email: formData.get('email'),
      gender: formData.get('gender'),
      country: formData.get('country'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
      terms: formData.get('terms') === 'on',
      image: imageBase64,
    };
    const result = schema.safeParse(rawData);
    if (result.success) {
      addSubmission(result.data);
      formRef.current?.reset();
      setErrors({});
      setPassword('');
      onSuccess();
    } else {
      const formattedErrors = result.error.flatten().fieldErrors;
      const fieldErrors: Record<string, string> = {};
      for (const key in formattedErrors) {
        const messages = formattedErrors[key as keyof typeof formattedErrors];
        if (messages && messages.length > 0) {
          fieldErrors[key] = messages[0];
        }
      }

      setErrors(fieldErrors);
    }
  };
  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex flex-col gap-2.5"
    >
      <InputField label="Name" id="unc-name" name="name" error={errors.name} />
      <InputField
        label="Age"
        id="unc-age"
        name="age"
        type="number"
        error={errors.age}
      />
      <InputField
        label="Email"
        id="unc-email"
        name="email"
        type="email"
        error={errors.email}
      />

      <SelectField
        label="Gender"
        id="unc-gender"
        name="gender"
        error={errors.gender}
        options={[
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
          { value: 'other', label: 'Other' },
        ]}
      />

      <DatalistField
        label="Country"
        id="unc-country"
        name="country"
        options={countries}
        error={errors.country}
      />
      <InputField
        label="Profile Image"
        id="unc-image"
        name="file"
        type="file"
        accept="image/png, image/jpeg"
        error={errors.image}
        onChange={handleImageChange}
      />
      <div>
        <InputField
          label="Password"
          id="unc-password"
          name="password"
          type="password"
          error={errors.password}
          onChange={handlePasswordChange}
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
        id="unc-confirm"
        name="confirmPassword"
        type="password"
        error={errors.confirmPassword}
      />
      <CheckboxField
        label="I accept terms and conditions"
        id="unc-terms"
        name="terms"
        error={errors.terms}
      />
      <button
        className="w-full border h-10 rounded-md font-medium cursor-pointer hover:bg-gray-200"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};
