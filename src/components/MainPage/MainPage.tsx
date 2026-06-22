import { useState } from 'react';
import { useLocalStorage } from '../../useLocalStorage';
import { CardList } from '../CardList';
import { Outlet, useSearchParams } from 'react-router-dom';
import Header from './Header';
import Pagination from './Pagination';
import Flyout from '../Flyout';
import {
  useCharactersQuery,
  useInvalidateCharactersCache,
} from '../../hooks/useCharactersQuery';

export const MainPage = () => {
  const [savedSearchItem] = useLocalStorage<string>('savedSearchItem', '');
  const [seachParam, setSearchParam] = useSearchParams();
  const currPage = seachParam.get('page') || '1';
  const itemsInPage = 12;

  const { data: items = [], isLoading, error } = useCharactersQuery(
    savedSearchItem
  );
  const invalidateCharactersCache = useInvalidateCharactersCache();

  const [isError, setIsError] = useState(false);

  const totalPages = Math.ceil(items.length / itemsInPage);
  const paginatetedItems = items.slice(
    (Number(currPage) - 1) * itemsInPage,
    Number(currPage) * itemsInPage
  );

  const handleSearch = () => {
    seachParam.set('page', '1');
    setSearchParam(seachParam);
  };

  const triggerErr = () => {
    setIsError(true);
  };

  const handlePage = (pageNum: number) => {
    seachParam.set('page', pageNum.toString());
    setSearchParam(seachParam);
  };

  const handleRefresh = async () => {
    await invalidateCharactersCache();
  };

  if (isError) {
    throw new Error(
      'This is a test critical error for checking ErrorBoundary!'
    );
  }

  const errorMessage = error ? error.message : null;

  return (
    <div className=" dark:bg-[#131212] min-h-screen w-full text-white">
      <Header
        handleSearch={handleSearch}
        isLoading={isLoading}
        triggerErr={triggerErr}
      />
      <main className="overflow-y-auto min-h-[calc(100vh-150px)]  flex flex-col w-full p-3">
        <div className="flex gap-3 mb-3">
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded transition"
          >
            {isLoading ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>
        <div className="flex">
          <section className="w-[80%] p-4">
            <CardList
              items={paginatetedItems}
              isLoading={isLoading}
              error={errorMessage}
            />
          </section>
          <section className="w-[20%]">
            <Outlet />
          </section>
        </div>
        {!isLoading && items.length > 0 && (
          <Pagination
            currentPage={Number(currPage)}
            totalPages={totalPages}
            onPageChange={handlePage}
          />
        )}
      </main>

      <Flyout />
    </div>
  );
};
