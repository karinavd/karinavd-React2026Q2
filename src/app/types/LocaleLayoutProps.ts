import type { ReactNode } from 'react';

export interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}
