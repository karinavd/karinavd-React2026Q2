import type { ItemState } from './interfaces/itemState';
import { create } from 'zustand/react';

const useItemStore = create<ItemState>((set) => {
  return {
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
  };
});

export default useItemStore;
