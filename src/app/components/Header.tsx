'use client';

import { useContext } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/lib/navigation';
import { SearchForm } from './SearchForm';
import { ButtonComponent } from './ButtonComponent';
import { ErrorTrigger } from './ErrorTrigger';
import { ThemeContext } from '../ThemeContext';

export function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const locale = useLocale();
  const t = useTranslations('common');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const toggleLocale = () => {
    const newLocale = locale === 'en' ? 'uk' : 'en';
    const qs = searchParams.toString();
    router.replace(pathname + (qs ? '?' + qs : ''), { locale: newLocale });
  };

  return (
    <header className="w-full p-4 bg-white dark:bg-[#131212] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.5)] text-white flex items-center justify-between">
      <h1 className="text-[35px] text-black dark:text-white">Star wars</h1>
      <SearchForm />
      <div className="flex gap-3 items-center justify-center">
        <Link href="/about" className="text-xl text-black dark:text-white">
          {t('about')}
        </Link>
        <ButtonComponent
          componentStyle=""
          text={theme === 'light' ? '☾ Dark Mode' : '☀︎ Light Mode'}
          handleClick={toggleTheme}
        />
        <ButtonComponent
          componentStyle=""
          text={locale === 'en' ? 'УК' : 'EN'}
          handleClick={toggleLocale}
        />
        <ErrorTrigger />
      </div>
    </header>
  );
}
