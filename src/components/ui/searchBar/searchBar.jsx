export default function SearchBar({
  inputRef,
  handleSubmit,
  searchInput,
  onSearchInput,
}) {
  return (
    <form onSubmit={handleSubmit} role="search" className="w-full">
      <div className="relative flex items-center">
        <svg
          className="absolute left-4 w-5 h-5 text-muted pointer-events-none shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <input
          ref={inputRef}
          id="search-input"
          type="text"
          value={searchInput}
          onChange={(event) => onSearchInput(event.target.value)}
          placeholder="Search for a movie or series..."
          required
          className="w-full h-12 md:h-14 pl-12 pr-4 bg-surface border border-border rounded-xl text-ink placeholder:text-muted/60 font-body text-base md:text-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all duration-200"
        />
        <button
          type="submit"
          className="absolute right-1.5 h-10 md:h-12 px-4 md:px-6 bg-accent hover:bg-accent-hover text-canvas font-display font-bold text-sm md:text-base rounded-lg transition-all duration-200 active:scale-95 hover:shadow-lg hover:shadow-accent/20"
        >
          Search
        </button>
      </div>
    </form>
  );
}
