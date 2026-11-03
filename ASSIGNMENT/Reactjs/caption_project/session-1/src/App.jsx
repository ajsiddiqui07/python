import React, { useState } from "react";
import {
  ArrowDownUp,
  AudioLines,
  Check,
  ChevronDown,
  Headphones,
  Music2,
  Pause,
  Play,
  Plus,
  RefreshCw,
  Search,
  SkipForward,
  Sparkles,
} from "lucide-react";

const songLibrary = [
  { title: "Open Window", artist: "Mira Sol", duration: "3:42", image: "photo-1470225620780-dba8ba36b745" },
  { title: "Blue Hour", artist: "The Slow North", duration: "4:08", image: "photo-1478737270239-2f02b77fc618" },
  { title: "Small Hours", artist: "June Atlas", duration: "3:18", image: "photo-1519608487953-e999c86e7455" },
  { title: "Soft Focus", artist: "Nico Vale", duration: "3:56", image: "photo-1519681393784-d120267933ba" },
  { title: "A Place to Land", artist: "Sunday People", duration: "4:21", image: "photo-1500530855697-b586d89ba3ee" },
  { title: "After the Rain", artist: "Lena June", duration: "3:34", image: "photo-1470252649378-9c29740c9fa8" },
  { title: "Still Life", artist: "Arlo Grey", duration: "2:58", image: "photo-1500534623283-312aade485b7" },
  { title: "Paper Moons", artist: "Mira Sol", duration: "4:12", image: "photo-1518837695005-2083093ee35b" },
];

const moods = ["Focused", "Easygoing", "Bright", "Late night"];

function coverUrl(image, width = 112) {
  return `https://images.unsplash.com/${image}?auto=format&fit=crop&w=${width}&h=${width}&q=80`;
}

function PlaylistTrack({ track, index, onReplace, onPlay, active }) {
  return (
    <li className={`track-row ${active ? "track-row-active" : ""}`}>
      <span className="track-index">{String(index + 1).padStart(2, "0")}</span>
      <img className="track-cover" src={coverUrl(track.image)} alt="" />
      <div className="track-copy">
        <strong>{track.title}</strong>
        <span>{track.artist}</span>
      </div>
      <span className="track-duration">{track.duration}</span>
      <button className="icon-button" type="button" title="Replace track" aria-label={`Replace ${track.title}`} onClick={() => onReplace(index)}>
        <RefreshCw size={16} />
      </button>
      <button className="icon-button play-track" type="button" title={active ? "Pause preview" : "Preview track"} aria-label={active ? "Pause preview" : `Preview ${track.title}`} onClick={() => onPlay(index)}>
        {active ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" />}
      </button>
    </li>
  );
}

export default function App() {
  const [mood, setMood] = useState("Focused");
  const [prompt, setPrompt] = useState("A calm afternoon for getting into a good flow");
  const [genre, setGenre] = useState("Indie & alternative");
  const [trackCount, setTrackCount] = useState(6);
  const [playlist, setPlaylist] = useState(songLibrary.slice(0, 6));
  const [saved, setSaved] = useState(false);
  const [activeTrack, setActiveTrack] = useState(null);
  const [generated, setGenerated] = useState(false);

  function generatePlaylist(event) {
    event.preventDefault();
    const offset = generated ? 2 : 0;
    const nextPlaylist = Array.from({ length: trackCount }, (_, index) => songLibrary[(index + offset) % songLibrary.length]);
    setPlaylist(nextPlaylist);
    setSaved(false);
    setActiveTrack(null);
    setGenerated(true);
  }

  function replaceTrack(index) {
    const currentTitles = new Set(playlist.map((track) => track.title));
    const replacement = songLibrary.find((track) => !currentTitles.has(track.title));
    if (!replacement) return;
    setPlaylist((current) => current.map((track, trackIndex) => trackIndex === index ? replacement : track));
    setSaved(false);
  }

  const totalMinutes = playlist.reduce((total, track) => total + Number(track.duration.split(":")[0]), 0);

  return (
    <main className="app-shell">
      <aside className="side-rail">
        <a className="brand" href="#studio" aria-label="Aura home">
          <span className="brand-mark"><AudioLines size={21} strokeWidth={2.2} /></span>
          <span>AURA<span className="brand-period">.</span></span>
        </a>
        <div className="rail-rule" />
        <p className="rail-label">WORKSPACE</p>
        <a className="rail-link rail-link-active" href="#studio"><Sparkles size={17} /> Studio</a>
        <a className="rail-link" href="#playlist"><Music2 size={17} /> Your mixes</a>
        <a className="rail-link" href="#discover"><Search size={17} /> Discover</a>
        <div className="rail-bottom">
          <div className="profile-chip"><span className="avatar">A</span><span><strong>Alex Morgan</strong><small>Free account</small></span><ChevronDown size={15} /></div>
          <p className="rail-footnote">A little more you in every song.</p>
        </div>
      </aside>

      <section className="main-column" id="studio">
        <header className="topbar">
          <div className="breadcrumb"><span>Workspace</span><span className="crumb-slash">/</span><strong>Playlist studio</strong></div>
          <div className="topbar-right"><span className="saved-status"><span className="status-dot" /> All changes saved</span><button className="help-button" type="button" title="Listening preferences"><Headphones size={17} /></button></div>
        </header>

        <div className="content-wrap">
          <div className="page-heading">
            <div><p className="eyebrow">YOUR PERSONAL MUSIC CURATOR</p><h1>Make a mix for <em>this moment.</em></h1><p className="heading-subtitle">A few words from you. A playlist that feels just right.</p></div>
            <span className="edition-mark">NO. 01 <span> / </span> STUDIO</span>
          </div>

          <div className="studio-grid">
            <form className="prompt-panel" onSubmit={generatePlaylist}>
              <div className="section-heading"><div><span className="step-number">01</span><h2>Set the feeling</h2></div><span className="required-note">YOUR PROMPT</span></div>
              <label className="sr-only" htmlFor="playlist-prompt">Describe the mood or moment</label>
              <textarea id="playlist-prompt" value={prompt} onChange={(event) => setPrompt(event.target.value)} maxLength={140} />
              <div className="prompt-meta"><span>Be specific, or keep it simple.</span><span>{prompt.length}/140</span></div>

              <div className="control-group">
                <div className="field-label"><span>Pick a mood</span><span className="field-hint">CHOOSE ONE</span></div>
                <div className="mood-options" role="group" aria-label="Mood">
                  {moods.map((option) => <button className={`mood-pill ${mood === option ? "mood-pill-active" : ""}`} key={option} type="button" onClick={() => setMood(option)}>{option}</button>)}
                </div>
              </div>

              <div className="control-row">
                <div className="control-group genre-control">
                  <label className="field-label" htmlFor="genre"><span>Sound like</span><span className="field-hint">GENRE</span></label>
                  <div className="select-wrap"><select id="genre" value={genre} onChange={(event) => setGenre(event.target.value)}><option>Indie & alternative</option><option>Jazz & soul</option><option>Electronic</option><option>Acoustic</option><option>Pop</option></select><ChevronDown size={16} /></div>
                </div>
                <div className="control-group count-control">
                  <label className="field-label" htmlFor="track-count"><span>Playlist length</span><strong>{trackCount} tracks</strong></label>
                  <input id="track-count" type="range" min="3" max="8" value={trackCount} onChange={(event) => setTrackCount(Number(event.target.value))} />
                  <div className="range-labels"><span>SHORT</span><span>LONG</span></div>
                </div>
              </div>

              <button className="generate-button" type="submit"><Sparkles size={17} /><span>Build my playlist</span><span className="button-shortcut">Enter</span></button>
              <p className="local-note">DEMO MODE <span>Suggestions use sample tracks. No account or API key needed.</span></p>
            </form>

            <aside className="inspiration-panel" aria-label="Playlist inspiration">
              <div className="inspiration-art"><img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=900&q=85" alt="A musician performing beneath warm stage lights" /><span className="art-tag"><span className="live-dot" /> MADE FOR YOUR MOMENT</span><span className="art-index">A—01</span></div>
              <div className="inspiration-copy"><div className="inspiration-label"><span>THE STARTING POINT</span><ArrowDownUp size={15} /></div><h3>{mood === "Focused" ? "Room to think." : mood === "Easygoing" ? "Take it slowly." : mood === "Bright" ? "A brighter side." : "After hours."}</h3><p>Your words shape the tempo, texture, and little surprises in your mix.</p><div className="inspiration-footer"><span><span className="mini-swatch" /> {genre}</span><span>~ {totalMinutes || 22} MIN</span></div></div>
            </aside>
          </div>

          <section className="playlist-section" id="playlist">
            <div className="playlist-heading"><div><p className="eyebrow">YOUR FIRST DRAFT</p><h2>{generated ? "A fresh direction." : "A place to begin."} <span>{playlist.length} tracks</span></h2></div><button className={`save-button ${saved ? "save-button-active" : ""}`} type="button" onClick={() => setSaved((value) => !value)}>{saved ? <Check size={16} /> : <Plus size={16} />}<span>{saved ? "Saved to your mixes" : "Save mix"}</span></button></div>
            <div className="track-list-header"><span>TRACK</span><span>TIME</span><span>ACTIONS</span></div>
            <ol className="track-list">
              {playlist.map((track, index) => <PlaylistTrack key={`${track.title}-${index}`} track={track} index={index} onReplace={replaceTrack} onPlay={setActiveTrack} active={activeTrack === index} />)}
            </ol>
            <div className="playlist-bottom"><span><span className="bottom-wave"><AudioLines size={16} /></span>{activeTrack === null ? "Preview a track to hear a sample" : `Previewing ${playlist[activeTrack]?.title}`}</span><button type="button" className="text-action" onClick={generatePlaylist}><SkipForward size={15} /> Try another direction</button></div>
          </section>

          <footer className="page-footer"><span>AURA STUDIO <span className="footer-separator">/</span> MADE FOR THE MOMENT</span><span>YOUR TASTE, IN THE MAKING.</span></footer>
        </div>
      </section>
    </main>
  );
}