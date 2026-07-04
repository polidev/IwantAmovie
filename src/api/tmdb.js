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
