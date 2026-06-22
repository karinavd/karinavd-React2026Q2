import { QueryClient } from '@tanstack/react-query';

const cacheTTL = parseInt(import.meta.env.VITE_CACHE_TTL_MS || '5000', 10);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: cacheTTL,
      gcTime: cacheTTL * 3,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
