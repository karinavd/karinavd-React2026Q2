import { forwardRef } from 'react';
import type { InputFieldProps } from '../../types/InputField';

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>

        <input
          id={id}
          ref={ref}
          {...props}
          style={{
            border: '1px solid #ccc',
            borderRadius: '6px',
            padding: '8px 12px',
            fontSize: '16px',
            outline: 'none',
            width: '100%',
          }}
        />

        <div className="text-red-500 text-xs min-h-5">{error}</div>
      </div>
    );
  }
);

InputField.displayName = 'InputField';
