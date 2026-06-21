import { forwardRef } from 'react';
import type { SelectFieldProps } from '../../types/SelectFieldProps';

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, error, id, options, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <label
          htmlFor={id}
          className="flex flex-col text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <select id={id} ref={ref} {...props}>
          <option value="">Select...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="text-red-500 text-xs min-h-5">{error}</div>
      </div>
    );
  }
);

SelectField.displayName = 'SelectField';
