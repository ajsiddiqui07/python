import useFetchData from "../hooks/useFetchData";

function SpotifyPlaylists() {
  const apiUrl = import.meta.env.VITE_SPOTIFY_PLAYLISTS_URL || "";

  // Custom hook is called at the top level, not conditionally.
  const { data, loading, error } = useFetchData(apiUrl);

  if (loading) {
    return <p>Loading Spotify playlists...</p>;
  }

  if (error) {
    return (
      <div className="card">
        <h2>Spotify Playlists</h2>
        <p className="error">{error}</p>
        <p>
          Configure VITE_SPOTIFY_PLAYLISTS_URL and ensure your API
          request has the required authorization.
        </p>
      </div>
    );
  }

  // Spotify's playlist endpoint typically returns an object with "items".
  const playlists = Array.isArray(data) ? data : data?.items || [];

  return (
    <div className="card">
      <h2>Spotify Playlists</h2>

      {playlists.length === 0 ? (
        <p>No playlists found.</p>
      ) : (
        <ul>
          {playlists.map((playlist) => (
            <li key={playlist.id}>
              {playlist.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SpotifyPlaylists;