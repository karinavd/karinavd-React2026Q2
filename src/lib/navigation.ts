import { createNavigation } from 'next-intl/navigation';

export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales: ['en', 'uk'],
  defaultLocale: 'en',
  localePrefix: 'always',
});
