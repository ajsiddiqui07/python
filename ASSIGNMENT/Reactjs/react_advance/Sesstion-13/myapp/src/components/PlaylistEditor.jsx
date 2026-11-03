import { useState } from "react";
import {
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../firebase";

function PlaylistEditor() {
  const [playlistId, setPlaylistId] = useState("");
  const [newName, setNewName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Update playlist name
  async function handleUpdate(event) {
    event.preventDefault();

    setMessage("");
    setError("");

    const id = playlistId.trim();
    const name = newName.trim();

    if (!id || !name) {
      setError("Please enter the playlist ID and new name.");
      return;
    }

    setLoading(true);

    try {
      const playlistRef = doc(db, "playlists", id);

      await updateDoc(playlistRef, {
        name: name,
      });

      setMessage("Playlist name updated successfully!");
      setNewName("");
    } catch (err) {
      console.error("Error updating playlist:", err);
      setError("Could not update playlist. Check the ID and permissions.");
    } finally {
      setLoading(false);
    }
  }

  // Delete playlist after confirmation
  async function handleDelete() {
    setMessage("");
    setError("");

    const id = playlistId.trim();

    if (!id) {
      setError("Please enter a playlist ID first.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this playlist?"
    );

    if (!confirmed) {
      return;
    }

    setLoading(true);

    try {
      const playlistRef = doc(db, "playlists", id);

      await deleteDoc(playlistRef);

      setMessage("Playlist deleted successfully!");
      setNewName("");
      setPlaylistId("");
    } catch (err) {
      console.error("Error deleting playlist:", err);
      setError("Could not delete playlist. Check the ID and permissions.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="card">
      <h2>Playlist Editor</h2>

      <form onSubmit={handleUpdate}>
        <label htmlFor="playlist-id">Playlist Document ID</label>
        <input
          id="playlist-id"
          type="text"
          placeholder="Enter Firestore document ID"
          value={playlistId}
          onChange={(event) => setPlaylistId(event.target.value)}
          required
        />

        <label htmlFor="playlist-name">New Playlist Name</label>
        <input
          id="playlist-name"
          type="text"
          placeholder="Enter new playlist name"
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Please wait..." : "Update Playlist"}
        </button>
      </form>

      <button
        type="button"
        className="delete-button"
        onClick={handleDelete}
        disabled={loading || !playlistId.trim()}
      >
        Delete Playlist
      </button>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </section>
  );
}

export default PlaylistEditor;