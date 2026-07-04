const API_TOKEN = import.meta.env.VITE_TMDB_API_ACCESS_TOKEN;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_TOKEN}`,
  },
};

export async function fetchMovies() {
  const url = `https://api.themoviedb.org/3/authentication ${options}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
