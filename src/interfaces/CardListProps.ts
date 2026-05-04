import type { ItemProps } from './ItemProps';

export type CardListProps = {
  items: ItemProps[];
  isLoading: boolean;
  error: string | null;
};
