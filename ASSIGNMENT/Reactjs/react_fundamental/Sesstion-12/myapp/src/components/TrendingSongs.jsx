import { useEffect, useState } from "react";

function TrendingSongs() {
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  async function fetchSongs() {
    try {
      setLoading(true);
      setError(false);

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );

      // Handle HTTP errors such as 404 or 500
      if (!response.ok) {
        throw new Error("Failed to fetch songs");
      }

      const data = await response.json();

      // Display only the first 3 titles
      setSongs(data.slice(0, 3));
    } catch (err) {
      setError(true);
      setSongs([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <section className="card">
      <h2>Trending Songs</h2>

      {loading && <p>Loading...</p>}

      {!loading && error && (
        <div>
          <p className="error">Error loading data</p>

          <button onClick={fetchSongs}>
            Reload
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          <ul>
            {songs.map((song) => (
              <li key={song.id}>{song.title}</li>
            ))}
          </ul>

          <button onClick={fetchSongs}>
            Reload
          </button>
        </>
      )}
    </section>
  );
}

export default TrendingSongs;