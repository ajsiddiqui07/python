import { useReducer, useState } from "react";
import playlistReducer from "../reducers/playlistReducer";
import SongItem from "./SongItem";

const initialSongs = [
  { id: 1, name: "Perfect - Ed Sheeran" },
  { id: 2, name: "Blinding Lights - The Weeknd" },
  { id: 3, name: "Shape of You - Ed Sheeran" },
];

function PlaylistManager() {
  const [songs, dispatch] = useReducer(
    playlistReducer,
    initialSongs
  );

  const [songName, setSongName] = useState("");

  function handleAddSong(event) {
    event.preventDefault();

    const trimmedName = songName.trim();

    if (!trimmedName) {
      return;
    }

    dispatch({
      type: "ADD_SONG",
      payload: {
        id: crypto.randomUUID(),
        name: trimmedName,
      },
    });

    setSongName("");
  }

  return (
    <div className="playlist-container">
      <header className="playlist-header">
        <div className="spotify-logo">♫</div>

        <div>
          <p className="playlist-label">YOUR LIBRARY</p>
          <h1>My Playlist</h1>
          <p>{songs.length} songs</p>
        </div>
      </header>

      <form className="add-song-form" onSubmit={handleAddSong}>
        <input
          type="text"
          value={songName}
          onChange={(event) => setSongName(event.target.value)}
          placeholder="Enter a song name..."
          aria-label="New song name"
        />

        <button type="submit" className="add-button">
          + Add
        </button>
      </form>

      <div className="song-list">
        {songs.length === 0 ? (
          <p className="empty-message">
            Your playlist is empty. Add your first song!
          </p>
        ) : (
          songs.map((song, index) => (
            <SongItem
              key={song.id}
              song={song}
              index={index}
              dispatch={dispatch}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default PlaylistManager;