import { useState } from "react";
import axios from "axios";

function AddPlaylist() {
  const [playlistName, setPlaylistName] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSuccess("");
    setError("");

    if (!playlistName.trim() || !description.trim()) {
      setError("Please enter both playlist name and description.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          title: playlistName,
          description: description,
        }
      );

      setSuccess(
        `Playlist "${response.data.title}" submitted successfully!`
      );

      setPlaylistName("");
      setDescription("");
    } catch (err) {
      setError("Failed to submit playlist. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card">
      <h2>Add Playlist</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Playlist name"
          value={playlistName}
          onChange={(event) => setPlaylistName(event.target.value)}
        />

        <textarea
          placeholder="Playlist description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows="3"
        />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Add Playlist"}
        </button>
      </form>

      {success && <p className="success">{success}</p>}
      {error && <p className="error">{error}</p>}
    </section>
  );
}

export default AddPlaylist;