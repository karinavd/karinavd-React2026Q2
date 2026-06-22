import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'uk'],
  defaultLocale: 'en',
  localePrefix: 'always',
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
