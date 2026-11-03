import PlaylistCard from "./components/PlaylistCard";
import LikeCounter from "./components/LikeCounter";
import Feed from "./components/Feed";
import FlipkartProductList from "./components/FlipkartProductList";

import { UserProvider } from "./context/UserContext";

import "./App.css";

function App() {
  return (
    <UserProvider>
      <main className="container">
        <header className="page-header">
          <h1>React Practice Project 🚀</h1>

          <p>
            Practice Props, useState, Context API and Custom Hooks.
          </p>
        </header>

        {/* Question 1: Props */}
        <section className="section">
          <h2>1. Playlist Cards — Props</h2>

          <div className="playlist-grid">
            <PlaylistCard
              songName="Kesariya"
              artist="Arijit Singh"
            />

            <PlaylistCard
              songName="Shape of You"
              artist="Ed Sheeran"
            />

            <PlaylistCard
              songName="Perfect"
              artist="Ed Sheeran"
            />
          </div>
        </section>

        {/* Question 2: useState */}
        <section className="section">
          <h2>2. Like Counter — useState</h2>

          <LikeCounter />
        </section>

        {/* Question 3: Context API */}
        <section className="section">
          <h2>3. User Context API</h2>

          <Feed />
        </section>

        {/* Question 4: Custom Hook */}
        <section className="section">
          <h2>4. Product List — Custom Hook</h2>

          <FlipkartProductList />
        </section>

        <footer className="footer">
          <p>React Practice Project | Built with React ⚛️</p>
        </footer>
      </main>
    </UserProvider>
  );
}

export default App;