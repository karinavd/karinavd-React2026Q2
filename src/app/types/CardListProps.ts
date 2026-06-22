import type { ItemProps } from './ItemProps';

export interface CardListProps {
  items: ItemProps[];
  q: string;
  currentPage: number;
}
