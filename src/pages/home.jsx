import { useRef } from "react";
import SearchBar from "../components/ui/searchBar/searchBar.jsx";
import ResultCard from "../components/ui/resultCard/resultCard.jsx";
import Pagination from "../components/ui/pagination/pagination.jsx";
import Image from "../components/ui/image/image.jsx";

import { getMovie } from "../api/tmdb.js";

export default function Home() {
  const inputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const inputText = inputRef.current?.value.trim();
    console.log("Input text:", inputText); // Log the input text for debugging
    if (inputText) {
      getMovie(inputText.toLowerCase());
      inputRef.current.value = "";
    }
  };

  return (
    <>
      <main>
        <SearchBar handleSubmit={handleSubmit} inputRef={inputRef} />
      </main>
    </>
  );
}
