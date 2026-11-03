import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSong,
  editSong,
  deleteSong,
} from "../features/playlist/playlistSlice";

function PlaylistList() {
  const songs = useSelector((state) => state.playlist.songs);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const cleanTitle = title.trim();
    const cleanArtist = artist.trim();

    if (!cleanTitle || !cleanArtist) {
      return;
    }

    if (editingId) {
      dispatch(
        editSong({
          id: editingId,
          title: cleanTitle,
          artist: cleanArtist,
        })
      );

      setEditingId(null);
    } else {
      dispatch(
        addSong({
          id: crypto.randomUUID(),
          title: cleanTitle,
          artist: cleanArtist,
        })
      );
    }

    setTitle("");
    setArtist("");
  };

  const handleEdit = (song) => {
    setEditingId(song.id);
    setTitle(song.title);
    setArtist(song.artist);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setArtist("");
  };

  const handleDelete = (id) => {
    dispatch(deleteSong(id));

    if (editingId === id) {
      cancelEdit();
    }
  };

  return (
    <section className="playlist-card">
      <h2>🎵 My Playlist</h2>

      <form className="song-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Song title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Artist name"
          value={artist}
          onChange={(event) => setArtist(event.target.value)}
          required
        />

        <button type="submit">
          {editingId ? "Save Changes" : "Add Song"}
        </button>

        {editingId && (
          <button type="button" onClick={cancelEdit}>
            Cancel
          </button>
        )}
      </form>

      <h3>Playlist Songs ({songs.length})</h3>

      {songs.length === 0 ? (
        <p>No songs available. Add your first song!</p>
      ) : (
        <div className="song-list">
          {songs.map((song) => (
            <div className="song-item" key={song.id}>
              <div>
                <strong>{song.title}</strong>
                <p>{song.artist}</p>
              </div>

              <div className="song-actions">
                <button
                  type="button"
                  onClick={() => handleEdit(song)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="remove-button"
                  onClick={() => handleDelete(song.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default PlaylistList;