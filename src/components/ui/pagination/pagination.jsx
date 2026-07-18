export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}) {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      console.log("Page changed to:", page);
      setCurrentPage(page);
    }
  };

  let start = currentPage - 2;
  let end = currentPage + 2;

  if (start < 1) {
    end += 1 - start;
    start = 1;
  }
  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - 4);
  }

  const pages = [];
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="pagination-container">
      <button type="button"
        disabled={currentPage <= 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Prev
      </button>
      {pages.map((page) => (
        <button type="button"
          key={page}
          className={page === currentPage ? "active" : ""}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}
      <button type="button"
        disabled={currentPage >= totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}
