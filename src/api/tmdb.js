const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + API_KEY,
  },
};

fetch("https://api.themoviedb.org/3/authentication", options)
  .then((res) => res.json())
  .then((res) => console.log(res))
  .catch((err) => console.error(err));

// ************************************************************ Search

export async function getMovie(movieName) {
  if (!movieName) return null;

  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movieName)}&include_adult=false&language=en-US&page=1`;
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log("getMovie response:", data); // Log the response for debugging

  return data;
}

export async function getMovieDetail(movieId) {
  if (!movieId) return null;

  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log("getMovieDetail response:", data); // Log the response for debugging

  return data;
}
