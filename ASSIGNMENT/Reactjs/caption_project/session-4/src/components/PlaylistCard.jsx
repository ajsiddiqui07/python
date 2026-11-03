function PlaylistCard({ image, name, songs, mood }) {
  return (
    <article className="playlist-card">
      <div className="playlist-art-wrap">
        <img className="playlist-art" src={image} alt={`${name} album artwork`} />
        <span className="play-button" aria-label={`Play ${name}`}>
          <span aria-hidden="true">▶</span>
        </span>
      </div>
      <div className="playlist-info">
        <span className="eyebrow">{mood}</span>
        <h3>{name}</h3>
        <p>{songs} songs · made for your moment</p>
      </div>
      <span className="card-arrow" aria-hidden="true">
        ↗
      </span>
    </article>
  );
}

export default PlaylistCard;
