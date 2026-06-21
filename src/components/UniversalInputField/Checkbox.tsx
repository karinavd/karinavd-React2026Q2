import { forwardRef } from 'react';
import type { CheckboxFieldProps } from '../../types/CheckboxFieldProps';

export const CheckboxField = forwardRef<HTMLInputElement, CheckboxFieldProps>(
  ({ label, error, id, ...props }, ref) => (
    <div>
      <div className="flex  items-center gap-2">
        <input id={id} type="checkbox" ref={ref} {...props} />
        <label htmlFor={id} className="m-0">
          {label}
        </label>
      </div>
      <div className="text-red-500 text-xs min-h-5">{error}</div>
    </div>
  )
);
CheckboxField.displayName = 'CheckboxField';
