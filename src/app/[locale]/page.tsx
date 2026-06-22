import { Suspense } from 'react';
import { fetchCharacters, fetchCharacterDetails } from '@/lib/actions';
import { Header } from '@/app/components/Header';
import { CardList } from '@/app/components/CardList';
import { DetailsPanel } from '@/app/components/DetailsPanel';
import { Pagination } from '@/app/components/Pagination';
import { Flyout } from '@/app/components/Flyout';
import type { MainPageProps } from '@/app/types';

const ITEMS_PER_PAGE = 12;

export default async function MainPage({ searchParams }: MainPageProps) {
  const { q = '', page = '1', selected = '' } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);

  const allItems = await fetchCharacters(q);
  const totalPages = Math.ceil(allItems.length / ITEMS_PER_PAGE);
  const paginatedItems = allItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const selectedItem = selected ? await fetchCharacterDetails(selected) : null;

  return (
    <div className="dark:bg-[#131212] min-h-screen w-full text-white flex flex-col">
      <Suspense>
        <Header />
      </Suspense>
      <main className="overflow-y-auto flex-1 flex flex-col w-full p-3">
<div className="flex flex-1">
          <section className="w-[80%] p-4">
            <CardList items={paginatedItems} q={q} currentPage={currentPage} />
          </section>
          <section className="w-[20%]">
            {selectedItem && <DetailsPanel item={selectedItem} />}
          </section>
        </div>
        {allItems.length > 0 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} q={q} selected={selected} />
        )}
      </main>
      <Flyout />
    </div>
  );
}
