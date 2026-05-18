import { useEffect, useState } from 'react';
import type { ItemProps } from '../../interfaces/ItemProps';
import { useLocalStorage } from '../../useLocalStorage';
import { CardList } from '../CardList';
import { Outlet, useSearchParams } from 'react-router-dom';
import { fetchDataCharacters } from '../../fetchData';
import Header from './Header';
import Pagination from './Pagination';

export const MainPage = () => {
  const [items, setItems] = useState<ItemProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [savedSearchItem] = useLocalStorage<string>('savedSearchItem', '');
  const [seachParam, setSearchParam] = useSearchParams();
  const currPage = seachParam.get('page') || '1';
  const itemsInPage = 12;
  const totalPages = Math.ceil(items.length / itemsInPage);
  const paginatetedItems = items.slice(
    (Number(currPage) - 1) * itemsInPage,
    Number(currPage) * itemsInPage
  );
  const fetchData = async (item: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchDataCharacters(item);
      setItems(data);
      setIsLoading(false);
    } catch (e) {
      const err = e instanceof Error ? e.message : 'Unknown error';
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const load = async () => {
      await fetchData(savedSearchItem);
    };

    void load();
  }, [savedSearchItem]);

  const handleSearch = (item: string) => {
    seachParam.set('page', '1');
    setSearchParam(seachParam);
    fetchData(item);
  };
  const triggerErr = () => {
    setIsError(true);
  };

  const handlePage = (item: number) => {
    seachParam.set('page', item.toString());
    setSearchParam(seachParam);
  };

  if (isError) {
    throw new Error(
      'This is a test critical error for checking ErrorBoundary!'
    );
  }

  return (
    <div className="bg-[#131212] min-h-screen w-full text-white">
      <Header
        handleSearch={handleSearch}
        isLoading={isLoading}
        triggerErr={triggerErr}
      />
      <main className="overflow-y-auto min-h-[calc(100vh-140px)]  flex w-full p-3">
        <section className="w-[80%] p-4">
          <CardList
            items={paginatetedItems}
            isLoading={isLoading}
            error={error}
          />
        </section>
        <section className="w-[20%]">
          <Outlet />
        </section>
      </main>
      {!isLoading && items.length > 0 && (
        <Pagination
          currentPage={Number(currPage)}
          totalPages={totalPages}
          onPageChange={handlePage}
        />
      )}
    </div>
  );
};
