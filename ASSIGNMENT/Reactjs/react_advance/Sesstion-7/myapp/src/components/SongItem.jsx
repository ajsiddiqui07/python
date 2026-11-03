import { memo } from "react";

function SongItem({ song, onToggleFavorite }) {
  console.log("Rendering song:", song.name);

  return (
    <div className="song-row">
      <div>
        <strong>{song.name}</strong>
        <p>{song.artist}</p>
      </div>

      <button
        type="button"
        className={song.isFavorite ? "favorite active" : "favorite"}
        onClick={() => onToggleFavorite(song.id)}
        aria-pressed={song.isFavorite}
      >
        {song.isFavorite ? "❤️ Favorite" : "♡ Add Favorite"}
      </button>
    </div>
  );
}

export default memo(SongItem);