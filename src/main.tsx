import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { App } from './App.tsx';
import ThemeProvider from './components/ThemeProvider.tsx';
import { queryClient } from './lib/queryClient.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>
);
