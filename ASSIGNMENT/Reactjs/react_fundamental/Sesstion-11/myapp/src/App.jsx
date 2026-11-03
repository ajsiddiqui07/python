import MovieList from "./components/MovieList";
import AddPlaylist from "./components/AddPlaylist";
import RestaurantSearch from "./components/RestaurantSearch";
import CommentForm from "./components/CommentForm";

import "./App.css";

function App() {
  return (
    <div className="container">
      <header>
        <h1>Axios API Practice</h1>
        <p>React + Axios + REST API</p>
      </header>

      <MovieList />

      <AddPlaylist />

      <RestaurantSearch />

      <CommentForm />
    </div>
  );
}

export default App;