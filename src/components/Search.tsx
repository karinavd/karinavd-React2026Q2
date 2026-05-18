import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { PropsSearch } from '../interfaces/PropsSearch';
import { useLocalStorage } from '../useLocalStorage';

export const Search = ({ onSearch, isLoading }: PropsSearch) => {
  const [savedSearchItem, setSavedSearchItem] = useLocalStorage<string>(
    'savedSearchItem',
    ''
  );
  const [searchTerm, setSearchTerm] = useState<string>(savedSearchItem);
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const handleForm = (e: FormEvent) => {
    e.preventDefault();
    const trimmedItem = searchTerm.trim();
    setSearchTerm(trimmedItem);
    setSavedSearchItem(trimmedItem);
    onSearch(trimmedItem);
  };
  return (
    <form onSubmit={handleForm} className="flex gap-3">
      <input
        className="bg-white text-black rounded-[5px] pl-2 h-7"
        type="text"
        value={searchTerm}
        onChange={handleInput}
        disabled={isLoading}
        placeholder="Enter your request"
      />
      <button
        type="submit"
        className="bg-white min-w-20 cursor-pointer rounded-[5px] text-black"
        disabled={isLoading}
      >
        {isLoading ? 'Wait' : 'Search'}
      </button>
    </form>
  );
};
