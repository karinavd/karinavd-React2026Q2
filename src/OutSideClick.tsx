import { useEffect, useState, type RefObject } from 'react';

export default function useOutsideClick<T extends HTMLElement>(
  ref: RefObject<T | null>
) {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (event.target instanceof Node) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsClicked(true);
        } else {
          setIsClicked(false);
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
  return isClicked;
}
