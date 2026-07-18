export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}) {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
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
    <nav aria-label="Pagination" className="flex items-center justify-center gap-2 py-8">
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="min-w-[44px] min-h-[44px] flex items-center justify-center px-3 md:px-4 bg-surface border border-border rounded-xl text-body text-sm font-medium hover:bg-surface-hover hover:text-ink hover:border-accent/30 disabled:opacity-30 disabled:pointer-events-none transition-all duration-200 active:scale-95"
        aria-label="Previous page"
      >
        <svg className="w-4 h-4 md:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="hidden md:inline">Prev</span>
      </button>

      <div className="flex items-center gap-1.5">
        {pages.map((page) => (
          <button
            type="button"
            key={page}
            onClick={() => handlePageChange(page)}
            className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-200 active:scale-95 ${
              page === currentPage
                ? "bg-accent text-canvas font-bold shadow-lg shadow-accent/20"
                : "bg-surface border border-border text-body hover:bg-surface-hover hover:text-ink"
            }`}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className="min-w-[44px] min-h-[44px] flex items-center justify-center px-3 md:px-4 bg-surface border border-border rounded-xl text-body text-sm font-medium hover:bg-surface-hover hover:text-ink hover:border-accent/30 disabled:opacity-30 disabled:pointer-events-none transition-all duration-200 active:scale-95"
        aria-label="Next page"
      >
        <span className="hidden md:inline">Next</span>
        <svg className="w-4 h-4 md:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  );
}
