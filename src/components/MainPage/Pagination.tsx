import type { PaginationProps } from '../../interfaces/PaginationProps';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  return (
    <div className="flex justify-center items-center gap-3">
      <button
        className="cursor-pointer"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </button>
      <p>
        {currentPage} of {totalPages}
      </p>
      <button
        className="cursor-pointer"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
