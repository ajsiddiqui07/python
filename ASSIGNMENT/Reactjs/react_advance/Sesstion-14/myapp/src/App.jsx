import PlaylistManager from "./components/PlaylistManager";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>My Music App</h1>
        <p>Manage your favourite songs.</p>
      </header>

      <main>
        <PlaylistManager />
      </main>
    </div>
  );
}

export default App;