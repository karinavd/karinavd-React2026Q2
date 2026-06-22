export interface ButtonComponentProps {
  text: string;
  componentStyle: string;
  handleClick: () => void;
  disabled?: boolean;
}
