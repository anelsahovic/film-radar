import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';

type Props = {
  pageNumber: number;
  handlePageChange: (pageNumber: number) => void;
  totalPages: number;
};

export default function PagePagination({
  pageNumber,
  totalPages,
  handlePageChange,
}: Props) {
  const handlePreviousPage = () => {
    if (pageNumber > 1) handlePageChange(pageNumber - 1);
  };

  const handleNextPage = () => {
    if (pageNumber < totalPages) handlePageChange(pageNumber + 1);
  };

  const handlePageClick = (number: number) => {
    handlePageChange(number);
  };

  // Compute visible pages (sliding window of 3)
  const getPageNumbers = () => {
    const pages: number[] = [];

    if (pageNumber === 1) {
      pages.push(1, 2, 3);
    } else if (pageNumber === totalPages) {
      pages.push(totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(pageNumber - 1, pageNumber, pageNumber + 1);
    }

    // Remove invalid pages (e.g. negative or > totalPages)
    return pages.filter((p) => p >= 1 && p <= totalPages);
  };

  const pages = getPageNumbers();

  return (
    <Pagination>
      <PaginationContent className="flex flex-wrap justify-center">
        {/* Prev Button */}
        <PaginationItem>
          <PaginationPrevious
            onClick={handlePreviousPage}
            className={`cursor-pointer ${
              pageNumber === 1 ? 'pointer-events-none opacity-50' : ''
            }`}
          />
        </PaginationItem>

        {/* First page shortcut if not in view */}
        {pages[0] > 1 && (
          <>
            <PaginationItem>
              <PaginationLink
                className="cursor-pointer"
                onClick={() => handlePageClick(1)}
              >
                1
              </PaginationLink>
            </PaginationItem>
            {pages[0] > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}

        {/* Page numbers */}
        {pages.map((num) => (
          <PaginationItem key={num}>
            <PaginationLink
              onClick={() => handlePageClick(num)}
              isActive={num === pageNumber}
              className="cursor-pointer"
            >
              {num}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Last page shortcut if not in view */}
        {pages[pages.length - 1] < totalPages && (
          <>
            {pages[pages.length - 1] < totalPages - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink
                className="cursor-pointer"
                onClick={() => handlePageClick(totalPages)}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            onClick={handleNextPage}
            className={`cursor-pointer ${
              pageNumber === totalPages ? 'pointer-events-none opacity-50' : ''
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
