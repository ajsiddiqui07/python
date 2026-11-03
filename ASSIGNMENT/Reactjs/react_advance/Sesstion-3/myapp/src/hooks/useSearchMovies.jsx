import { useEffect, useState } from "react";

function useSearchMovies(query) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Effect 1: Fetch movies whenever the query changes.
  useEffect(() => {
    const searchTerm = query.trim();
    const apiKey = import.meta.env.VITE_OMDB_API_KEY;

    // Empty search: clear old results and don't call the API.
    if (!searchTerm) {
      setData([]);
      setError("");
      setLoading(false);
      return;
    }

    if (!apiKey) {
      setData([]);
      setError("OMDb API key is missing. Please check your .env file.");
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    async function fetchMovies() {
      setLoading(true);
      setError("");
      setData([]);

      try {
        const url =
          `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchTerm)}`;

        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Network error: ${response.status}`);
        }

        const result = await response.json();

        // OMDb can return HTTP 200 even when a search fails.
        if (result.Response === "False") {
          throw new Error(result.Error || "No movies found.");
        }

        setData(result.Search || []);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong while fetching movies.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchMovies();

    // Cancel the previous request when the query changes or component unmounts.
    return () => controller.abort();
  }, [query]);

  // Effect 2: Log whenever movie data changes.
  useEffect(() => {
    console.log("Movie data updated:", data);
  }, [data]);

  return { data, loading, error };
}

export default useSearchMovies;