import PlaylistEditor from "./components/PlaylistEditor";
import LiveCommentsFeed from "./components/LiveCommentsFeed";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Music Playlist Manager</h1>
        <p>Edit playlists and view live song comments.</p>
      </header>

      <main className="main-content">
        <PlaylistEditor />

        <LiveCommentsFeed songId="song_101" />
      </main>
    </div>
  );
}

export default App;