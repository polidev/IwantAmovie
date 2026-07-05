import { useRef, useState, useEffect } from "react";
import SearchBar from "../components/ui/searchBar/searchBar.jsx";
import ResultCard from "../components/ui/resultCard/resultCard.jsx";
import Pagination from "../components/ui/pagination/pagination.jsx";

import { getMovie } from "../api/tmdb.js";

export default function Home() {
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const inputText = inputRef.current?.value.trim();
    if (!inputText) return; // Exit if input is empty

    setQuery(inputText.toLowerCase());
    setCurrentPage(1); // Reset to first page on new search
    inputRef.current.value = "";
  };

  useEffect(() => {
    if (!query) return; // Exit if query is empty

    const fetchMovies = async () => {
      setLoading(true);

      try {
        const data = await getMovie(query, currentPage);
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
  }, [query, currentPage]);

  return (
    <>
      <main>
        <section>
          <SearchBar handleSubmit={handleSubmit} inputRef={inputRef} />
        </section>
        <section>
          {movies !== [] &&
            movies.map((movie) => <ResultCard key={movie.id} movie={movie} />)}
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
