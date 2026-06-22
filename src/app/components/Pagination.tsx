import { getTranslations } from 'next-intl/server';
import { Link } from '@/lib/navigation';
import type { PaginationProps } from '@/app/types';

export async function Pagination({
  currentPage,
  totalPages,
  q,
  selected,
}: PaginationProps) {
  const t = await getTranslations('pagination');

  const buildHref = (page: number) => {
    const params = new URLSearchParams({ q, page: String(page) });
    if (selected) params.set('selected', selected);
    return `/?${params.toString()}`;
  };

  return (
    <div className="flex justify-center text-black dark:text-white items-center gap-3 ">
      {currentPage > 1 ? (
        <Link href={buildHref(currentPage - 1)} className="cursor-pointer">
          {t('previous')}
        </Link>
      ) : (
        <span className="opacity-50">{t('previous')}</span>
      )}
      <p>
        {currentPage} of {totalPages}
      </p>
      {currentPage < totalPages ? (
        <Link href={buildHref(currentPage + 1)} className="cursor-pointer">
          {t('next')}
        </Link>
      ) : (
        <span className="opacity-50">{t('next')}</span>
      )}
    </div>
  );
}
