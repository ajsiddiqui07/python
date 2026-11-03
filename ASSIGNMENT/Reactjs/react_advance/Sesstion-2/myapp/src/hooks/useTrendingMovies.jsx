import { useEffect, useState } from "react";

function useTrendingMovies() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;

    if (!apiKey) {
      setError("TMDB API key is missing. Please configure your .env file.");
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    async function fetchTrendingMovies() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Unable to fetch trending movies.");
        }

        const result = await response.json();

        setData(result.results || []);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchTrendingMovies();

    return () => controller.abort();
  }, []);

  return { loading, error, data };
}

export default useTrendingMovies;