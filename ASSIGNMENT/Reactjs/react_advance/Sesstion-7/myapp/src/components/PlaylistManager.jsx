import { useCallback, useState } from "react";
import SongItem from "./SongItem";

const initialSongs = [
  {
    id: 1,
    name: "Blinding Lights",
    artist: "The Weeknd",
    isFavorite: false,
  },
  {
    id: 2,
    name: "Perfect",
    artist: "Ed Sheeran",
    isFavorite: false,
  },
  {
    id: 3,
    name: "Levitating",
    artist: "Dua Lipa",
    isFavorite: false,
  },
  {
    id: 4,
    name: "Shape of You",
    artist: "Ed Sheeran",
    isFavorite: false,
  },
];

function PlaylistManager() {
  const [songs, setSongs] = useState(initialSongs);

  const toggleFavorite = useCallback((songId) => {
    setSongs((previousSongs) =>
      previousSongs.map((song) =>
        song.id === songId
          ? { ...song, isFavorite: !song.isFavorite }
          : song
      )
    );
  }, []);

  return (
    <section className="performance-card">
      <h2>My Playlist</h2>
      <p>Click a button to mark a song as favorite.</p>

      <div className="song-list">
        {songs.map((song) => (
          <SongItem
            key={song.id}
            song={song}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </section>
  );
}

export default PlaylistManager;