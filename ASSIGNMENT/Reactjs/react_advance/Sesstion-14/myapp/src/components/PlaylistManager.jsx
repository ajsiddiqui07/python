import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { addSong, removeSong } from "../store";

function PlaylistManager() {
  const [songName, setSongName] = useState("");

  // Read playlist from Redux store
  const playlist = useSelector((state) => state);

  // Dispatch actions to Redux store
  const dispatch = useDispatch();

  // Add a song
  function handleAddSong(event) {
    event.preventDefault();

    const trimmedSongName = songName.trim();

    if (!trimmedSongName) {
      return;
    }

    dispatch(addSong(trimmedSongName));

    setSongName("");
  }

  // Remove a song
  function handleRemoveSong(index) {
    dispatch(removeSong(index));
  }

  return (
    <div className="playlist-container">
      <h2>Playlist Manager</h2>

      <form onSubmit={handleAddSong} className="song-form">
        <input
          type="text"
          placeholder="Enter song name"
          value={songName}
          onChange={(event) => setSongName(event.target.value)}
        />

        <button type="submit">Add Song</button>
      </form>

      <h3>My Playlist</h3>

      {playlist.length === 0 ? (
        <p>No songs added yet. Add your first song!</p>
      ) : (
        <ul className="playlist">
          {playlist.map((song, index) => (
            <li key={index} className="playlist-item">
              <span>
                {index + 1}. {song}
              </span>

              <button
                type="button"
                className="remove-button"
                onClick={() => handleRemoveSong(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="song-count">
        Total songs: {playlist.length}
      </p>
    </div>
  );
}

export default PlaylistManager;