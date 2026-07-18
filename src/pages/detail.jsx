import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { getMovieDetail } from "../api/tmdb.js";
import Image from "../components/ui/image/image.jsx";

export default function Details() {
  const { type, id } = useParams();
  const [movieDetail, setMovieDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    getMovieDetail(type, id)
      .then((data) => setMovieDetail(data))
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch movie details.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!movieDetail) return <div>Movie not found.</div>;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!movieDetail) return <div>No movie found</div>;

  return (
    <>
      <Link to={`/`}>Back to Home</Link>
      <div>
        <h1>{movieDetail.title}</h1>
        <Image>{movieDetail.poster_path}</Image>
        <p>{movieDetail.overview}</p>
        <p>Release Date: {movieDetail.release_date}</p>
        <p>Rating: {movieDetail.vote_average}</p>
        <p>
          Genres: {movieDetail.genres.map((genre) => genre.name).join(", ")}
        </p>
      </div>
    </>
  );
}
