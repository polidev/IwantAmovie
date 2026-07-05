export default function Image(poster_path) {
  return (
    <img
      src={`https://image.tmdb.org/t/p/w600_and_h900_face${poster_path.children}`}
      alt="Movie Poster"
      className=""
    />
  );
}
