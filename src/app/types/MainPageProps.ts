export interface MainPageProps {
  searchParams: Promise<{ q?: string; page?: string; selected?: string }>;
}
