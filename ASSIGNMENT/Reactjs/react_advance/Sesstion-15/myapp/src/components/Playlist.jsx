import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSong, removeSong } from "../features/playlist/playlistSlice";

function Playlist() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");

  const dispatch = useDispatch();

  const songs = useSelector((state) => state.playlist.songs);

  const handleSubmit = (event) => {
    event.preventDefault();

    const songTitle = title.trim();
    const songArtist = artist.trim();

    if (!songTitle || !songArtist) {
      alert("Please enter both song title and artist.");
      return;
    }

    const newSong = {
      id: crypto.randomUUID(),
      title: songTitle,
      artist: songArtist,
    };

    dispatch(addSong(newSong));

    setTitle("");
    setArtist("");
  };

  const handleRemove = (songId) => {
    dispatch(removeSong(songId));
  };

  return (
    <div className="playlist-container">
      <h1>🎵 My Spotify Playlist</h1>
      <p className="subtitle">Manage your favorite songs</p>

      <form className="song-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter song title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <input
          type="text"
          placeholder="Enter artist name"
          value={artist}
          onChange={(event) => setArtist(event.target.value)}
        />

        <button type="submit">Add Song</button>
      </form>

      <h2>Your Songs ({songs.length})</h2>

      {songs.length === 0 ? (
        <p>No songs in your playlist. Add your first song!</p>
      ) : (
        <div className="song-list">
          {songs.map((song) => (
            <div className="song-card" key={song.id}>
              <div className="song-info">
                <strong>{song.title}</strong>
                <span>{song.artist}</span>
              </div>

              <button
                className="remove-button"
                onClick={() => handleRemove(song.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Playlist;