import type { handleButtonInterface } from '../interfaces/handleButtonInterface';

const ButtonComponent = ({
  text,
  componentStyle,
  handleClick,
}: handleButtonInterface) => {
  return (
    <button
      type="button"
      className={`bg-white min-w-20 cursor-pointer rounded-[5px] text-black p-1 border-black  border-2${componentStyle}`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default ButtonComponent;
