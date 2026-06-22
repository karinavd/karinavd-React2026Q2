import { getTranslations } from 'next-intl/server';
import { Card } from './Card';
import type { CardListProps } from '@/app/types';

export async function CardList({ items, q, currentPage }: CardListProps) {
  const t = await getTranslations('search');

  if (items.length === 0) {
    return (
      <div className="text-black dark:text-white p-5">{t('noResults')}</div>
    );
  }

  return (
    <div className="p-3 grid grid-cols-3 gap-5 w-full">
      {items.map((item) => (
        <Card key={item.id} item={item} q={q} currentPage={currentPage} />
      ))}
    </div>
  );
}
