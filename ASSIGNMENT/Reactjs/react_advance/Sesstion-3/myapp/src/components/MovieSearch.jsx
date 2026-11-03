import { useState } from "react";
import useSearchMovies from "../hooks/useSearchMovies";

function MovieSearch() {
  const [query, setQuery] = useState("");

  const { data, loading, error } = useSearchMovies(query);

  return (
    <div className="movie-search">
      <h1>Movie Search</h1>

      <p>Search for your favorite movies using the OMDb API.</p>

      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Enter movie name, e.g. Batman"
        aria-label="Search movies"
      />

      {loading && (
        <div className="loading-container" role="status">
          <div className="spinner"></div>
          <p>Searching movies...</p>
        </div>
      )}

      {!loading && error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && query.trim() && data.length === 0 && (
        <p>No movies found.</p>
      )}

      <div className="movies-grid">
        {data.map((movie) => (
          <div className="movie-card" key={movie.imdbID}>
            {movie.Poster && movie.Poster !== "N/A" ? (
              <img src={movie.Poster} alt={`${movie.Title} poster`} />
            ) : (
              <div className="poster-placeholder">
                No poster available
              </div>
            )}

            <h3>{movie.Title}</h3>
            <p>Year: {movie.Year}</p>
            <p>Type: {movie.Type}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieSearch;