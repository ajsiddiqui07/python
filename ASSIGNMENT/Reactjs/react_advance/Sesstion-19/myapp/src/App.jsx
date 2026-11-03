import LoginForm from "./components/LoginForm";
import PlaylistList from "./components/PlaylistList";

function App() {
  return (
    <main className="app">
      <h1>PlaylistManager</h1>

      <LoginForm />

      <PlaylistList />
    </main>
  );
}

export default App;