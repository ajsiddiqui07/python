import { useState } from 'react';
import './App.css';

// Question 1: LikeButton Component
function LikeButton() {
  const [count, setCount] = useState(0);

  return (
    <div className="card">
      <h2>Like Button</h2>

      <button
        className="like-button"
        onClick={() => setCount(count + 1)}
      >
        ❤️ Like
      </button>

      <p>Likes: {count}</p>
    </div>
  );
}

// Question 2: SearchBar Component
function SearchBar() {
  const [productName, setProductName] = useState('');

  return (
    <div className="card">
      <h2>Product Search</h2>

      <input
        type="text"
        placeholder="Search products..."
        value={productName}
        onChange={(event) => setProductName(event.target.value)}
      />

      <p>
        Search value: {productName || 'Start typing...'}
      </p>
    </div>
  );
}

// Questions 3 and 5: LoginForm Component
function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    if (!username.trim() || !password) {
      alert('Please enter both username and password.');
      return;
    }

    alert(`Username: ${username}\nPassword: ${password}`);

    // Question 5: Clear fields after successful submission
    setUsername('');
    setPassword('');
  }

  return (
    <div className="card">
      <h2>Login Form</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

// Question 4: PlaylistAdder Component
function PlaylistAdder() {
  const [songName, setSongName] = useState('');
  const [artist, setArtist] = useState('');
  const [songs, setSongs] = useState([]);

  function handleAddSong(event) {
    event.preventDefault();

    if (!songName.trim() || !artist.trim()) {
      return;
    }

    const newSong = {
      id: Date.now(),
      name: songName.trim(),
      artist: artist.trim(),
    };

    setSongs((previousSongs) => [...previousSongs, newSong]);

    // Clear input fields after adding a song
    setSongName('');
    setArtist('');
  }

  return (
    <div className="card">
      <h2>Spotify Playlist</h2>

      <form onSubmit={handleAddSong}>
        <input
          type="text"
          placeholder="Enter song name"
          value={songName}
          onChange={(event) => setSongName(event.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Enter artist name"
          value={artist}
          onChange={(event) => setArtist(event.target.value)}
          required
        />

        <button type="submit">Add Song</button>
      </form>

      <h3>My Playlist</h3>

      {songs.length === 0 ? (
        <p>No songs added yet.</p>
      ) : (
        <ul className="song-list">
          {songs.map((song) => (
            <li key={song.id}>
              <strong>{song.name}</strong> — {song.artist}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Main App Component
function App() {
  return (
    <div className="App">
      <h1>React State and Events</h1>

      <LikeButton />

      <SearchBar />

      <LoginForm />

      <PlaylistAdder />
    </div>
  );
}

export default App;