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

// ************************************************************ Authentication

export async function getMovies(movieName) {
  if (!movieName) return null;

  const url =
    (`https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`,
    options);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function getMovieDetail(movieId) {
  if (!movieId) return null;

  const url =
    (`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
