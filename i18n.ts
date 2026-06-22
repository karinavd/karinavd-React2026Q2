import { getRequestConfig } from 'next-intl/server';

const SUPPORTED_LOCALES = ['en', 'uk'];
const DEFAULT_LOCALE = 'en';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale =
    requested && SUPPORTED_LOCALES.includes(requested)
      ? requested
      : DEFAULT_LOCALE;
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
