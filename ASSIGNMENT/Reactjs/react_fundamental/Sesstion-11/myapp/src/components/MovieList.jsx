import { useEffect, useState } from "react";
import axios from "axios";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );

        setMovies(response.data.slice(0, 5));
      } catch (err) {
        setError("Failed to load movies. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <section className="card">
      <h2>Trending Movies (API Practice)</h2>

      {loading && <p>Loading...</p>}

      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <ol>
          {movies.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ol>
      )}
    </section>
  );
}

export default MovieList;