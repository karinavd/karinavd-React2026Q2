import type { DownloadProps } from '../interfaces/DownloadProps';
import useItemStore from '../useItemStore';
import ButtonComponent from './FlyoutButton';
const Flyout = () => {
  const { selectedItems, unselectItem } = useItemStore();
  const downloadFile = ({ data, fileName, fileType }: DownloadProps) => {
    const blob = new Blob([data], { type: fileType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.download = fileName;
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };
  const exportToCsv = () => {
    const headers = ['Id,Name,Gender,Birth year'];
    const usersCsv = selectedItems.reduce((acc: string[], user) => {
      const { id, name, gender, birth_year } = user;
      acc.push(
        [`"${id}"`, `"${name}"`, `"${gender}"`, `"${birth_year}"`].join(',')
      );
      return acc;
    }, []);

    downloadFile({
      data: [...headers, ...usersCsv].join('\n'),
      fileName: `${selectedItems.length}_items.csv`,
      fileType: 'text/csv;charset=utf-8;',
    });
  };
  return (
    <div className="sticky bottom-0 left-0 w-full text-white flex justify-between p-3  items-center z-1">
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
          handleClick={exportToCsv}
        />
      </div>
    </div>
  );
};

export default Flyout;
