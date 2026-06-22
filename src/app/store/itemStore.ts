import { create } from 'zustand';
import type { ItemProps, ItemState } from '@/app/types';

export const useItemStore = create<ItemState>((set) => ({
  selectedItems: [],
  selectItem: (item) =>
    set((state) => {
      const isSelected = state.selectedItems.some((x) => x.id === item.id);
      return {
        selectedItems: isSelected
          ? state.selectedItems.filter((i) => i.id !== item.id)
          : [...state.selectedItems, item],
      };
    }),
  unselectItem: () => set(() => ({ selectedItems: [] })),
}));
