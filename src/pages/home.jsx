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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const inputText = inputRef.current?.value.trim();
    if (!inputText) return; // Exit if input is empty

    setSearchQuery(inputText.toLowerCase().trim());
    setCurrentPage(1); // Reset to first page on new search
    inputRef.current.value = "";
  };

  useEffect(() => {
    if (!searchQuery) return; // Exit if query is empty

    const fetchMovies = async () => {
      setLoading(true);

      try {
        const data = await getMovie(searchQuery, currentPage);
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (error) {
        console.error(error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [searchQuery, currentPage]);

  useEffect(() => {
    if (!debouncedSearch) return;
    setSearchQuery(debouncedSearch.toLowerCase().trim());
    setCurrentPage(1);
  }, [debouncedSearch]);

  const handleCardClick = (event) => {
    const card = event.target.closest("article");
    if (!card) return;
    const movieId = card.id;
    console.log("Clicked movie ID:", movieId);
    // Handle card click logic
  };

  return (
    <>
      <main>
        <section>
          <SearchBar
            handleSubmit={handleSubmit}
            inputRef={inputRef}
            searchInput={searchInput}
            onSearchInput={setSearchInput}
          />
        </section>
        <section id="movies-section" onClick={handleCardClick}>
          {movies !== [] &&
            movies.map((movie) => (
              <Link
                key={movie.id}
                to={`/${movie.media_type || "movie"}/${movie.id}`}
              >
                <ResultCard key={movie.id} movie={movie} />
              </Link>
            ))}
        </section>
        <section>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </section>
      </main>
    </>
  );
}
