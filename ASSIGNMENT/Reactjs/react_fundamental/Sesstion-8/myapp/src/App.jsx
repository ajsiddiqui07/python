import React, { useState, useRef } from "react";
import "./App.css";

// Question 1: SearchBar using useRef
function SearchBar() {
  const inputRef = useRef(null);

  // Automatically focus input when button is clicked
  const handleSearch = () => {
    alert("Search button clicked!");
  };

  // Focus the input automatically when the component mounts
  React.useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="card">
      <h2>1. Search Bar</h2>

      <input
        type="text"
        ref={inputRef}
        placeholder="Search something..."
      />

      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

// Question 2: Login Form using useState and useRef
function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameRef = useRef(null);

  const handleLogin = (event) => {
    event.preventDefault();

    alert(`Login attempted for: ${username}`);

    // Clear both controlled fields
    setUsername("");
    setPassword("");

    // Focus username input again
    usernameRef.current.focus();
  };

  return (
    <div className="card">
      <h2>2. Login Form</h2>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          ref={usernameRef}
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Enter username"
        />

        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter password"
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

// Question 3: AddToPlaylist using useState and useRef
function AddToPlaylist() {
  const [songName, setSongName] = useState("");
  const [playlist, setPlaylist] = useState([]);

  const songInputRef = useRef(null);

  const handleAddSong = (event) => {
    event.preventDefault();

    if (songName.trim() === "") {
      songInputRef.current.focus();
      return;
    }

    // Add song to playlist
    setPlaylist((previousPlaylist) => [
      ...previousPlaylist,
      songName.trim(),
    ]);

    // Clear the input
    setSongName("");

    // Focus the input again
    songInputRef.current.focus();
  };

  return (
    <div className="card">
      <h2>3. Add to Playlist</h2>

      <form onSubmit={handleAddSong}>
        <input
          type="text"
          ref={songInputRef}
          value={songName}
          onChange={(event) => setSongName(event.target.value)}
          placeholder="Enter song name"
        />

        <button type="submit">Add</button>
      </form>

      <h3>My Playlist</h3>

      {playlist.length === 0 ? (
        <p>No songs added yet.</p>
      ) : (
        <ol>
          {playlist.map((song, index) => (
            <li key={index}>{song}</li>
          ))}
        </ol>
      )}
    </div>
  );
}

// Question 4: Feedback Form with Controlled Components
function FeedbackForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const messageRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    alert(`Thank you, ${name}, for your feedback!`);
  };

  return (
    <div className="card">
      <h2>4. Feedback Form</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter your name"
        />

        <textarea
          ref={messageRef}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Enter your feedback"
          rows="4"
        />

        <button type="button" onClick={() => messageRef.current.focus()}>
          Focus Message
        </button>

        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
}

// Main App Component
function App() {
  return (
    <div className="container">
      <h1>React useRef Practice</h1>

      <SearchBar />
      <LoginForm />
      <AddToPlaylist />
      <FeedbackForm />
    </div>
  );
}

export default App;