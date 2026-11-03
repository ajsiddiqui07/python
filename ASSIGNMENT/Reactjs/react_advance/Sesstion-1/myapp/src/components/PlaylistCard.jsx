function PlaylistCard({ songName, artist }) {
  return (
    <div className="playlist-card">
      <h3>🎵 {songName}</h3>
      <p>Artist: {artist}</p>
    </div>
  );
}

export default PlaylistCard;
