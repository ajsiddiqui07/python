import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSong, removeSong } from './playlist.js';

function App() {
  const [songName, setSongName] = useState('');
  const playlist = useSelector((state) => state);
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedSongName = songName.trim();

    if (!trimmedSongName) {
      return;
    }

    dispatch(addSong(trimmedSongName));
    setSongName('');
  }

  return (
    <main className="page">
      <section className="playlist-card" aria-labelledby="playlist-title">
        <div className="eyebrow">YOUR MUSIC, YOUR WAY</div>
        <h1 id="playlist-title">My playlist</h1>
        <p className="subtitle">Keep the songs you love all in one place.</p>

        <form className="add-song-form" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="song-name">
            Song name
          </label>
          <input
            id="song-name"
            onChange={(event) => setSongName(event.target.value)}
            placeholder="Add a song to your playlist"
            value={songName}
          />
          <button className="add-button" type="submit">
            Add song
          </button>
        </form>

        <div className="playlist-heading">
          <h2>Songs</h2>
          <span className="song-count">
            {playlist.length} {playlist.length === 1 ? 'song' : 'songs'}
          </span>
        </div>

        {playlist.length > 0 ? (
          <ul className="song-list">
            {playlist.map((song, index) => (
              <li className="song-row" key={`${song}-${index}`}>
                <span className="song-index">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="song-name">{song}</span>
                <button
                  aria-label={`Remove ${song}`}
                  className="remove-button"
                  onClick={() => dispatch(removeSong(song))}
                  type="button"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty-state">Your playlist is empty. Add a song to get started.</p>
        )}
      </section>
    </main>
  );
}

export default App;
