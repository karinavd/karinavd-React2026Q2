'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { searchAction } from '@/lib/actions';

export function SearchForm() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const tCommon = useTranslations('common');
  const tSearch = useTranslations('search');

  return (
    <form action={searchAction} className="flex gap-3">
      <input
        key={q}
        className="bg-white text-black border-2 rounded-[5px] pl-2 h-7"
        type="text"
        name="q"
        defaultValue={q}
        placeholder={tSearch('placeholder')}
      />
      <button
        type="submit"
        className="bg-white min-w-20 cursor-pointer border-2 rounded-[5px] text-black"
      >
        {tCommon('search')}
      </button>
    </form>
  );
}
