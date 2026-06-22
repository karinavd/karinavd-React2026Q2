import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from '@/app/components/ThemeProvider';
import { ErrorBoundary } from '@/app/components/ErrorBoundary';
import type { LocaleLayoutProps } from '@/app/types';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Search Application',
  description: 'A search application built with Next.js',
};

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'uk' }];
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html locale={locale} suppressHydrationWarning>
      <body>
        <ErrorBoundary>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider>
              {children}
            </ThemeProvider>
          </NextIntlClientProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
