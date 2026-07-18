const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + API_KEY,
  },
};

/**
 * Searches TMDB for movies matching the given name.
 *
 * @param {string} movieName - The search query (e.g. "avatar")
 * @param {number} [page=1]  - Page number for paginated results
 * @returns {Promise<{results: Array, total_pages: number, page: number, total_results: number}>}
 *
 * @example
 *   const data = await getMovie("the godfather", 1);
 *   // data.results → array of movie objects
 *   // data.total_pages → total pages available
 */
export async function getMovie(movieName, page = 1) {
  if (!movieName) return null;

  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movieName)}&include_adult=false&language=en-US&page=${page}`;
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log("Fetched movie data:", data); // Debugging log

  return data;
}

/**
 * Fetches full details for a single movie by its TMDB ID.
 *
 * @param {number|string} movieId - The numeric TMDB movie ID
 * @returns {Promise<Object>} The full movie detail object
 *
 * @example
 *   const movie = await getMovieDetail(550);
 *   // movie.title, movie.overview, movie.genres, etc.
 */
export async function getMovieDetail(type = "movie", movieId) {
  if (!movieId) return null;

  const url = `https://api.themoviedb.org/3/${type}/${encodeURIComponent(movieId)}?language=en-US`;
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log("Fetched movie detail:", data); // Debugging log

  return data;
}

/**
 * Builds a full TMDB image URL from a relative path.
 *
 * @param {string|null} path   - Relative image path (e.g. "/abc123.jpg")
 * @param {string}       [size="w500"] - Image size (w500, w780, original, etc.)
 * @returns {string|null} Full URL or null if path is falsy
 *
 * @example
 *   getImageUrl("/abc123.jpg", "w500")
 *   // → "https://image.tmdb.org/t/p/w500/abc123.jpg"
 */
export function getImageUrl(path, size = "w500") {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : null;
}
