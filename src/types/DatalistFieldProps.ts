export type DatalistFieldProps = {
  label: string;
  error?: string;
  id: string;
  options: string[];
} & React.InputHTMLAttributes<HTMLInputElement>;
