import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { getMovieDetail, getImageUrl } from "../api/tmdb.js";
import Image from "../components/ui/image/image.jsx";

export default function Details() {
  const { type, id } = useParams();
  const [movieDetail, setMovieDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    getMovieDetail(type, id)
      .then((data) => {
        setMovieDetail(data);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load details. Please try again.");
        setLoading(false);
      });
  }, [id, type]);

  if (loading) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          <p className="text-muted text-sm">Loading details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-canvas flex flex-col items-center justify-center gap-3 px-4">
        <p className="text-danger text-base font-medium">{error}</p>
        <Link to="/" className="text-accent text-sm hover:underline">
          Back to search
        </Link>
      </div>
    );
  }

  if (!movieDetail) {
    return (
      <div className="min-h-screen bg-canvas flex flex-col items-center justify-center gap-3 px-4">
        <p className="text-body text-lg">Movie not found</p>
        <Link to="/" className="text-accent text-sm hover:underline">
          Back to search
        </Link>
      </div>
    );
  }

  const title = movieDetail.title || movieDetail.name;
  const year = (movieDetail.release_date || movieDetail.first_air_date || "").slice(0, 4);
  const runtime = movieDetail.runtime;
  const rating = movieDetail.vote_average ? movieDetail.vote_average.toFixed(1) : null;
  const genres = movieDetail.genres || [];
  const backdrop = getImageUrl(movieDetail.backdrop_path, "original");
  const poster = getImageUrl(movieDetail.poster_path, "w500");

  return (
    <div className="min-h-screen bg-canvas">
      {backdrop && (
        <div className="relative h-[200px] md:h-[400px] overflow-hidden">
          <img
            src={backdrop}
            alt=""
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/60 to-transparent" />
        </div>
      )}

      <div className={`px-4 pb-12 ${backdrop ? "-mt-24 md:-mt-40 relative z-10" : "pt-8"}`}>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-body hover:text-accent transition-colors mb-4 md:mb-6 min-h-[44px]"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to results
        </Link>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 md:gap-10">
          <div className="w-full md:w-[300px] lg:w-[350px] shrink-0">
            <Image
              src={poster}
              alt={title}
              className="w-full aspect-[2/3] rounded-2xl shadow-2xl shadow-black/40 object-cover"
            />
          </div>

          <div className="flex-1 min-w-0 pt-2">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-accent-dim text-accent">
                {type === "tv" ? "TV Series" : "Movie"}
              </span>
              {rating && (
                <span className="flex items-center gap-1.5 text-sm text-body">
                  <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {rating} / 10
                </span>
              )}
              {year && (
                <span className="text-sm text-muted">{year}</span>
              )}
              {runtime && (
                <span className="text-sm text-muted">{runtime} min</span>
              )}
            </div>

            <h1 className="font-display font-bold text-ink mb-2">
              {title}
            </h1>

            {movieDetail.tagline && (
              <p className="text-muted text-base italic mb-4">&ldquo;{movieDetail.tagline}&rdquo;</p>
            )}

            <div className="flex flex-wrap gap-2 mb-5">
              {genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-surface border border-border text-body hover:border-accent/30 transition-colors"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="mb-6">
              <h2 className="font-display font-bold text-sm text-ink uppercase tracking-wider mb-2">
                Overview
              </h2>
              <p className="text-body leading-relaxed">
                {movieDetail.overview || "No overview available."}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              {movieDetail.status && (
                <div>
                  <p className="text-muted text-xs uppercase tracking-wider mb-0.5">Status</p>
                  <p className="text-body font-medium">{movieDetail.status}</p>
                </div>
              )}
              {movieDetail.original_language && (
                <div>
                  <p className="text-muted text-xs uppercase tracking-wider mb-0.5">Language</p>
                  <p className="text-body font-medium">{movieDetail.original_language.toUpperCase()}</p>
                </div>
              )}
              {movieDetail.budget > 0 && (
                <div>
                  <p className="text-muted text-xs uppercase tracking-wider mb-0.5">Budget</p>
                  <p className="text-body font-medium">${(movieDetail.budget / 1_000_000).toFixed(0)}M</p>
                </div>
              )}
              {movieDetail.revenue > 0 && (
                <div>
                  <p className="text-muted text-xs uppercase tracking-wider mb-0.5">Revenue</p>
                  <p className="text-body font-medium">${(movieDetail.revenue / 1_000_000).toFixed(0)}M</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
