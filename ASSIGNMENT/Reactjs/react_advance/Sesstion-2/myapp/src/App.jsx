import LiveClock from "./components/LiveClock";
import MoviesList from "./components/MoviesList";
import PostCard from "./components/PostCard";
import SpotifyPlaylists from "./components/SpotifyPlaylists";
import ProductList from "./components/ProductList";

import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>React Custom Hooks Practice</h1>
        <p>Learn to reuse state and logic in React.</p>
      </header>

      <main>
        {/* Task 1: Live clock */}
        <section>
          <LiveClock />
        </section>

        {/* Task 2: Trending movies */}
        <section>
          <MoviesList />
        </section>

        {/* Task 3: Instagram-style like button */}
        <section>
          <h2>Instagram-Style Posts</h2>

          <PostCard
            username="arbaz"
            caption="Learning React custom hooks!"
            initialLikes={10}
          />

          <PostCard
            username="developer"
            caption="Practicing reusable components."
            initialLikes={25}
          />
        </section>

        {/* Task 4: Fetch Spotify playlists */}
        <section>
          <SpotifyPlaylists />
        </section>

        {/* Task 5: Reuse fetch hook for products */}
        <section>
          <ProductList />
        </section>
      </main>
    </div>
  );
}

export default App;