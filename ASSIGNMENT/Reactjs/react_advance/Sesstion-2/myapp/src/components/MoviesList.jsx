import useTrendingMovies from "../hooks/useTrendingMovies";

function MoviesList() {
  const { loading, error, data } = useTrendingMovies();

  if (loading) {
    return <p>Loading trending movies...</p>;
  }

  if (error) {
    return <p className="error">Error: {error}</p>;
  }

  return (
    <div className="card">
      <h2>Trending Movies</h2>

      {data.length === 0 ? (
        <p>No trending movies found.</p>
      ) : (
        <div className="movie-grid">
          {data.map((movie) => (
            <div className="movie-card" key={movie.id}>
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                />
              )}

              <h3>{movie.title}</h3>

              <p>
                Rating: {movie.vote_average?.toFixed(1) ?? "N/A"}/10
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MoviesList;