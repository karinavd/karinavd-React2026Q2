'use client';

import { Link } from '@/lib/navigation';
import type { CardProps } from '@/app/types';
import { useItemStore } from '@/app/store/itemStore';

export function Card({ item, q, currentPage }: CardProps) {
  const { selectedItems, selectItem } = useItemStore();
  const isChecked = selectedItems.some((i) => i.id === item.id);

  const params = new URLSearchParams({
    q,
    page: String(currentPage),
    selected: item.id,
  });

  return (
    <div className="relative border-2 w-full rounded-md p-2 text-black dark:text-white">
      <Link
        href={`/?${params.toString()}`}
        className="absolute inset-0 rounded-md"
        aria-label={item.name}
      />
      <div className="relative flex justify-between items-center mb-1">
        <p className="font-bold text-2xl">{item.name}</p>
        <input
          type="checkbox"
          checked={isChecked}
          onClick={(e) => e.stopPropagation()}
          onChange={() => selectItem(item)}
          className="w-6 h-6 cursor-pointer"
        />
      </div>
      <p>Gender: {item.gender}</p>
      <p>Birth year: {item.birth_year}</p>
    </div>
  );
}
