import type { ItemProps } from './ItemProps';
export type AppState = {
  items: ItemProps[];
  isLoading: boolean;
  error: string | null;
  isError: boolean;
};
