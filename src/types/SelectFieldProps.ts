export type SelectFieldProps = {
  label: string;
  error?: string;
  id: string;
  options: { value: string; label: string }[];
} & React.SelectHTMLAttributes<HTMLSelectElement>;
