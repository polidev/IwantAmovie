import Image from "../image/image.jsx";

export default function ResultCard({ movie }) {
  return (
    <article className="">
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Rating: {movie.vote_average}</p>
      <Image>{movie.poster_path}</Image>
    </article>
  );
}
