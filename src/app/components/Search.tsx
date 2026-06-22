'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';

interface SearchProps {
  onSearch: (term: string) => void;
  isLoading: boolean;
}

export function Search({ onSearch, isLoading }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleForm = (e: FormEvent) => {
    e.preventDefault();
    const trimmedItem = searchTerm.trim();
    setSearchTerm(trimmedItem);
    onSearch(trimmedItem);
  };

  return (
    <form onSubmit={handleForm} className="flex gap-3">
      <input
        className="bg-white text-black border-2 rounded-[5px] pl-2 h-7"
        type="text"
        value={searchTerm}
        onChange={handleInput}
        disabled={isLoading}
        placeholder="Enter your request"
      />
      <button
        type="submit"
        className="bg-white min-w-20 cursor-pointer border-2 rounded-[5px] text-black"
        disabled={isLoading}
      >
        {isLoading ? 'Wait' : 'Search'}
      </button>
    </form>
  );
}
