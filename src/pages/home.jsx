import { useRef, useState, useEffect } from "react";
import { Link } from "react-router";
import SearchBar from "../components/ui/searchBar/searchBar.jsx";
import ResultCard from "../components/ui/resultCard/resultCard.jsx";
import Pagination from "../components/ui/pagination/pagination.jsx";
import { getMovie } from "../api/tmdb.js";
import useDebounce from "../hooks/useDebounce.js";

export default function Home() {
  const inputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 400);

  const handleSubmit = (event) => {
    event.preventDefault();
    const inputText = inputRef.current?.value.trim();
    if (!inputText) return;
    const query = inputText.toLowerCase().trim();
    setSearchQuery(query);
    setCurrentPage(1);
    setLoading(true);
    getMovie(query, 1)
      .then((data) => {
        setMovies(data.results || []);
        setTotalPages(Math.min(data.total_pages || 1, 500));
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setMovies([]);
        setError("Something went wrong. Please try again.");
        setLoading(false);
      });
    inputRef.current.value = "";
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setLoading(true);
    getMovie(searchQuery, page)
      .then((data) => {
        setMovies(data.results || []);
        setTotalPages(Math.min(data.total_pages || 1, 500));
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setMovies([]);
        setError("Something went wrong. Please try again.");
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!debouncedSearch) return;
    const query = debouncedSearch.toLowerCase().trim();
    getMovie(query, 1)
      .then((data) => {
        setSearchQuery(query);
        setCurrentPage(1);
        setMovies(data.results || []);
        setTotalPages(Math.min(data.total_pages || 1, 500));
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setMovies([]);
        setError("Something went wrong. Please try again.");
      });
  }, [debouncedSearch]);

  const displayQuery = debouncedSearch || searchQuery;
  const hasSearched = debouncedSearch !== "" || searchQuery !== "";

  return (
    <div className="min-h-screen bg-canvas">
      <section className="px-4 pt-6 md:pt-10 pb-4 max-w-3xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <h1 className="font-display text-ink mb-2">
            {hasSearched ? "Results" : "Discover films"}
          </h1>
          <p className="text-body max-w-lg mx-auto">
            {hasSearched
              ? `Showing results for "${displayQuery}"`
              : "Search thousands of movies and series from TMDB"}
          </p>
        </div>
        <SearchBar
          handleSubmit={handleSubmit}
          inputRef={inputRef}
          searchInput={searchInput}
          onSearchInput={setSearchInput}
        />
      </section>

      <section className="px-4 pb-8 max-w-7xl mx-auto">
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            <p className="text-muted text-sm">Searching...</p>
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-20">
            <p className="text-danger text-base mb-2 font-medium">{error}</p>
            <p className="text-muted text-sm">Check your connection and try again.</p>
          </div>
        )}

        {!loading && !error && hasSearched && movies.length === 0 && (
          <div className="text-center py-20">
            <p className="text-body text-lg mb-1">No results found</p>
            <p className="text-muted text-sm">Try a different search term</p>
          </div>
        )}

        {!loading && !error && movies.length > 0 && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {movies.map((movie) => (
                <Link
                  key={movie.id}
                  to={`/${movie.media_type || "movie"}/${movie.id}`}
                  className="block"
                >
                  <ResultCard movie={movie} />
                </Link>
              ))}
            </div>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}

        {!hasSearched && !loading && (
          <div className="text-center py-16 md:py-24">
            <div className="text-muted/30 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
              </svg>
            </div>
            <p className="text-muted text-base">Start typing to explore movies and series</p>
          </div>
        )}
      </section>
    </div>
  );
}
