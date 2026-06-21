import { forwardRef } from 'react';
import type { DatalistFieldProps } from '../../types/DatalistFieldProps';

export const DatalistField = forwardRef<HTMLInputElement, DatalistFieldProps>(
  ({ label, error, id, options, ...props }, ref) => {
    const listId = `${id}-list`;
    return (
      <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <input id={id} list={listId} ref={ref} {...props} />
        <datalist id={listId}>
          {options.map((opt) => (
            <option key={opt} value={opt} />
          ))}
        </datalist>
        <div className="text-red-500 text-xs min-h-5">{error}</div>
      </div>
    );
  }
);
DatalistField.displayName = 'DatalistField';
