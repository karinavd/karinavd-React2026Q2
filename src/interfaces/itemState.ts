import type { ItemProps } from './ItemProps';

export interface ItemState {
  selectedItems: ItemProps[];
  selectItem: (item: ItemProps) => void;
  unselectItem: () => void;
}
