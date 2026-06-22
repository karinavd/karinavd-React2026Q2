'use client';

import { generateCSV } from '@/lib/actions';
import { useItemStore } from '@/app/store/itemStore';
import { ButtonComponent } from './ButtonComponent';

export function Flyout() {
  const { selectedItems, unselectItem } = useItemStore();

  const downloadFile = (data: string, fileName: string, fileType: string) => {
    const blob = new Blob([data], { type: fileType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.download = fileName;
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportToCsv = async () => {
    try {
      const csv = await generateCSV(selectedItems);
      downloadFile(
        csv,
        `${selectedItems.length}_items.csv`,
        'text/csv;charset=utf-8;'
      );
    } catch (error) {
      console.error('Failed to export CSV:', error);
    }
  };

  return (
    <div className="sticky bottom-0 left-0 w-full text-white flex justify-between p-3 items-center z-10 bg-white dark:bg-[#131212]">
      <p className="text-black dark:text-white font-medium text-xl">
        Selected characters: {selectedItems.length}
      </p>
      <div className="flex gap-5">
        <ButtonComponent
          text="Unselect items"
          componentStyle="text-red-600 p-1 font-medium border-red-600 border-3"
          handleClick={unselectItem}
        />
        <ButtonComponent
          text="Export to CSV"
          componentStyle="text-blue-600 p-1 font-medium border-blue-600 border-3"
          handleClick={handleExportToCsv}
        />
      </div>
    </div>
  );
}
