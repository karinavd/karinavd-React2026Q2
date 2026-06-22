'use client';

import type { ButtonComponentProps } from '@/app/types';

export function ButtonComponent({
  text,
  componentStyle,
  handleClick,
  disabled = false,
}: ButtonComponentProps) {
  return (
    <button
      type="button"
      className={`bg-white min-w-20 cursor-pointer rounded-[5px] text-black p-1 border-black border-2 ${componentStyle} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
