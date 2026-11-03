import React, { useEffect, useMemo, useState } from "react";
import {
  addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { Bookmark, Check, CheckCircle2, Clapperboard, Film, Plus, Search, Trash2, Pencil, X, Clock3, Star } from "lucide-react";

const emptyForm = { title: "", year: "", genre: "Drama", notes: "" };
const genres = ["Drama", "Action", "Comedy", "Thriller", "Sci-Fi", "Romance", "Horror", "Animation", "Documentary", "Other"];

function MovieForm({ initial, onSave, onCancel, busy }) {
  const [form, setForm] = useState(initial || emptyForm);
  useEffect(() => setForm(initial || emptyForm), [initial]);
  function change(e) { setForm(current => ({ ...current, [e.target.name]: e.target.value })); }
  function submit(e) { e.preventDefault(); onSave({ ...form, title: form.title.trim(), year: form.year.trim(), notes: form.notes.trim() }); }
  return <form className="movie-form" onSubmit={submit}>
    <label>Movie title<input name="title" value={form.title} onChange={change} placeholder="e.g. The Grand Budapest Hotel" maxLength={120} required autoFocus /></label>
    <div className="form-row">
      <label>Release year<input name="year" type="number" min="1888" max="2100" value={form.year} onChange={change} placeholder="2024" /></label>
      <label>Genre<select name="genre" value={form.genre} onChange={change}>{genres.map(g => <option key={g}>{g}</option>)}</select></label>
    </div>
    <label>Notes <span className="optional">(optional)</span><textarea name="notes" value={form.notes} onChange={change} placeholder="Who recommended it? What caught your eye?" rows={3} maxLength={500} /></label>
    <div className="form-actions"><button type="button" className="button button-quiet" onClick={onCancel}><X size={16} /> Cancel</button><button className="button button-primary" disabled={busy}>{busy ? "Saving…" : "Save movie"}</button></div>
  </form>;
}

export default function Watchlist({ user }) {
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const moviesRef = collection(db, "users", user.uid, "movies");

  useEffect(() => {
    const q = query(moviesRef, orderBy("createdAt", "desc"));
    return onSnapshot(q, snapshot => setMovies(snapshot.docs.map(d => ({ id: d.id, ...d.data() }))), error => setNotice(error.message));
  }, [user.uid]);

  const visibleMovies = useMemo(() => movies.filter(movie => {
    const matchesFilter = filter === "all" || (filter === "watched" ? movie.watched : !movie.watched);
    const term = search.toLowerCase();
    return matchesFilter && [movie.title, movie.genre, movie.year, movie.notes].some(v => String(v || "").toLowerCase().includes(term));
  }), [movies, filter, search]);

  async function saveMovie(values) {
    setBusy(true); setNotice("");
    try {
      if (modal?.movie) await updateDoc(doc(db, "users", user.uid, "movies", modal.movie.id), { ...values, updatedAt: serverTimestamp() });
      else await addDoc(moviesRef, { ...values, watched: false, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
      setModal(null); setNotice(modal?.movie ? "Movie updated." : "Movie added to your list.");
    } catch (error) { setNotice(`Could not save movie: ${error.message}`); }
    finally { setBusy(false); }
  }
  async function toggleWatched(movie) {
    try { await updateDoc(doc(db, "users", user.uid, "movies", movie.id), { watched: !movie.watched, updatedAt: serverTimestamp() }); }
    catch (error) { setNotice(`Could not update movie: ${error.message}`); }
  }
  async function removeMovie(movie) {
    if (!window.confirm(`Delete "${movie.title}" from your watchlist?`)) return;
    try { await deleteDoc(doc(db, "users", user.uid, "movies", movie.id)); setNotice("Movie deleted."); }
    catch (error) { setNotice(`Could not delete movie: ${error.message}`); }
  }

  const watchedCount = movies.filter(m => m.watched).length;
  return <main className="watchlist-page">
    <section className="welcome-row"><div><p className="eyebrow"><SparklesIcon /> YOUR PERSONAL CINEMA</p><h1>Your watchlist<span className="period">.</span></h1><p className="muted">A little collection of stories waiting for you.</p></div><button className="button button-primary add-button" onClick={() => setModal({ movie: null })}><Plus size={18} /> Add a movie</button></section>
    <section className="stats-grid">
      <div className="stat-card"><span className="stat-icon"><Bookmark size={19} /></span><div><span>Total saved</span><strong>{movies.length}</strong></div><small>in your collection</small></div>
      <div className="stat-card"><span className="stat-icon"><CheckCircle2 size={19} /></span><div><span>Watched</span><strong>{watchedCount}</strong></div><small>stories experienced</small></div>
      <div className="stat-card"><span className="stat-icon"><Clock3 size={19} /></span><div><span>To watch</span><strong>{movies.length - watchedCount}</strong></div><small>up next for you</small></div>
    </section>
    <section className="list-section">
      <div className="list-heading"><div><h2>The collection</h2><p className="muted">All the movies you’ve been meaning to see.</p></div><div className="search-box"><Search size={17} /><input aria-label="Search movies" placeholder="Search your list…" value={search} onChange={e => setSearch(e.target.value)} /></div></div>
      <div className="filter-row">{[["all", "All movies"], ["unwatched", "To watch"], ["watched", "Watched"]].map(([key, label]) => <button key={key} className={`filter-chip ${filter === key ? "active" : ""}`} onClick={() => setFilter(key)}>{label}<span>{key === "all" ? movies.length : key === "watched" ? watchedCount : movies.length - watchedCount}</span></button>)}</div>
      {notice && <div className="notice" role="status">{notice}<button aria-label="Dismiss message" onClick={() => setNotice("")}><X size={15} /></button></div>}
      {visibleMovies.length === 0 ? <div className="empty-state"><div className="empty-icon"><Clapperboard size={30} /></div><h3>{movies.length === 0 ? "Your first movie goes here." : "No movies found."}</h3><p>{movies.length === 0 ? "Save a title you’ve been wanting to watch and build your own little cinema." : "Try another search or change the filter."}</p>{movies.length === 0 && <button className="button button-primary" onClick={() => setModal({ movie: null })}><Plus size={17} /> Add your first movie</button>}</div> : <div className="movie-grid">{visibleMovies.map(movie => <article className={`movie-card ${movie.watched ? "is-watched" : ""}`} key={movie.id}>
        <div className="poster-placeholder"><span className="poster-top">{movie.year || "NO YEAR"}</span><div className="poster-symbol"><Film size={35} /></div><span className="poster-title">{movie.title}</span><span className="poster-bottom">{movie.genre || "MOVIE NIGHT"}</span>{movie.watched && <span className="watched-stamp"><Check size={13} /> WATCHED</span>}</div>
        <div className="movie-details"><div className="movie-title-row"><h3>{movie.title}</h3><button className={`icon-button watch-toggle ${movie.watched ? "selected" : ""}`} title={movie.watched ? "Mark as unwatched" : "Mark as watched"} onClick={() => toggleWatched(movie)}><CheckCircle2 size={19} /></button></div><div className="movie-meta"><span>{movie.year || "Year unknown"}</span><span className="meta-dot">·</span><span>{movie.genre || "Other"}</span></div>{movie.notes && <p className="movie-notes">{movie.notes}</p>}<div className="movie-card-actions"><button onClick={() => setModal({ movie })}><Pencil size={14} /> Edit</button><button className="delete-action" onClick={() => removeMovie(movie)}><Trash2 size={14} /> Delete</button></div></div>
      </article>)}</div>}
    </section>
    {modal && <div className="modal-backdrop" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget && !busy) setModal(null); }}><section className="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div className="modal-heading"><div><p className="eyebrow">YOUR COLLECTION</p><h2 id="modal-title">{modal.movie ? "Edit movie" : "Add a movie"}</h2></div><button className="icon-button" aria-label="Close" onClick={() => setModal(null)}><X size={20} /></button></div><MovieForm key={modal.movie?.id || "new"} initial={modal.movie || emptyForm} onSave={saveMovie} onCancel={() => setModal(null)} busy={busy} /></section></div>}
  </main>;
}
function SparklesIcon() { return <Star size={13} />; }