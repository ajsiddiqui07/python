import { useCallback, useEffect, useState } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  ChevronDown,
  CircleAlert,
  Clapperboard,
  Headphones,
  LoaderCircle,
  MapPin,
  MessageSquareText,
  Music2,
  Pencil,
  Plus,
  RefreshCw,
  Send,
  Star,
  X,
} from 'lucide-react';
import {
  addRestaurantReview,
  ensureSamplePlaylist,
  fetchCollection,
  updateRestaurantReview,
} from './firestoreApi.js';
import { firebaseSetupMessage, isFirebaseConfigured } from './firebase.js';

const initialReviewForm = { restaurantName: '', rating: '5', comment: '' };
const sampleMovies = [
  { id: 'movie-1', movieName: 'The Grand Budapest Hotel', watched: true },
  { id: 'movie-2', movieName: 'Past Lives', watched: false },
  { id: 'movie-3', movieName: 'Perfect Days', watched: true },
];

function App() {
  const [activeTab, setActiveTab] = useState('Reviews');
  const [reviews, setReviews] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [watchlists, setWatchlists] = useState([]);
  const [reviewForm, setReviewForm] = useState(initialReviewForm);
  const [editingReview, setEditingReview] = useState(null);
  const [loading, setLoading] = useState(isFirebaseConfigured);
  const [error, setError] = useState(firebaseSetupMessage);
  const [notice, setNotice] = useState('');
  const [saving, setSaving] = useState(false);

  const loadData = useCallback(async () => {
    if (!isFirebaseConfigured) {
      setLoading(false);
      setError(firebaseSetupMessage);
      return;
    }

    setLoading(true);
    setError('');
    try {
      await ensureSamplePlaylist();
      const [nextReviews, nextPlaylists, nextWatchlists] = await Promise.all([
        fetchCollection('reviews'),
        fetchCollection('playlists'),
        fetchCollection('watchlists'),
      ]);
      setReviews(nextReviews);
      setPlaylists(nextPlaylists);
      setWatchlists(nextWatchlists);
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  function handleReviewInput(event) {
    setReviewForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleReviewSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError('');
    setNotice('');

    try {
      await addRestaurantReview(reviewForm);
      setReviewForm(initialReviewForm);
      setNotice('Your review is live. Thanks for sharing the good stuff.');
      await loadData();
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSaving(false);
    }
  }

  function startEditing(review) {
    setEditingReview({ id: review.id, rating: String(review.rating), comment: review.comment });
    setError('');
    setNotice('');
  }

  async function saveReviewEdit(event) {
    event.preventDefault();
    setSaving(true);
    setError('');
    setNotice('');
    try {
      await updateRestaurantReview(editingReview.id, editingReview);
      setNotice('Review updated successfully.');
      setEditingReview(null);
      await loadData();
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setSaving(false);
    }
  }

  function patchEditingReview(key, value) {
    setEditingReview((current) => ({ ...current, [key]: value }));
  }

  const visibleWatchlists = isFirebaseConfigured ? watchlists : sampleMovies;

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Gather and Go home">
          <span className="brand-icon"><ArrowDownRight size={17} strokeWidth={2.5} /></span>
          <span>gather<span className="brand-dot">.</span></span>
        </a>
        <nav className="top-nav" aria-label="Main navigation">
          <a className="top-nav-link is-current" href="#reviews">Explore</a>
          <a className="top-nav-link" href="#playlists">Collections</a>
          <a className="top-nav-link" href="#watchlist">Watchlist</a>
        </nav>
        <button className="profile-button" type="button" aria-label="Your profile">
          <span>J</span>
          <ChevronDown size={14} />
        </button>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-text">
            <div className="date-line"><span /> THE GOOD STUFF, ALL IN ONE PLACE</div>
            <h1>Find your next<br /><em>favorite thing.</em></h1>
            <p>A little corner for the places, sounds, and stories worth passing on.</p>
            <a className="hero-link" href="#reviews">Explore the community <ArrowRight size={15} /></a>
          </div>
          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85"
              alt="Warm neighborhood restaurant interior"
            />
            <div className="image-label"><MapPin size={14} /><span>LOCAL FINDS, GOOD TIMES</span></div>
          </div>
          <div className="hero-counter"><strong>01</strong><span> / 03</span></div>
        </section>

        <section className="content-layout" id="reviews">
          <div className="main-column">
            <div className="section-title-row">
              <div>
                <span className="section-kicker">COMMUNITY NOTES</span>
                <h2>Places worth <em>sharing.</em></h2>
              </div>
              <span className="live-tag"><span /> LIVE FEED</span>
            </div>

            {error && (
              <div className="alert alert-error" role="alert">
                <CircleAlert size={18} />
                <div>
                  <strong>{isFirebaseConfigured ? 'Could not connect to Firestore' : 'Firebase setup needed'}</strong>
                  <p>{error}</p>
                  {!isFirebaseConfigured && (
                    <p className="alert-help">Copy <code>.env.example</code> to <code>.env</code>, fill in your Firebase web app settings, then restart the dev server.</p>
                  )}
                  {isFirebaseConfigured && (
                    <button className="inline-action" onClick={loadData} type="button"><RefreshCw size={13} /> Try again</button>
                  )}
                </div>
              </div>
            )}
            {notice && <div className="alert alert-success" role="status"><Check size={17} />{notice}</div>}

            <div className="tab-row" role="tablist" aria-label="Community content">
              {['Reviews', 'Playlists', 'Watchlist'].map((tab) => (
                <button
                  aria-selected={activeTab === tab}
                  className={`tab-button${activeTab === tab ? ' active' : ''}`}
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  role="tab"
                  type="button"
                >
                  {tab}
                  {tab === 'Reviews' && <span>{reviews.length || '—'}</span>}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="loading-state"><LoaderCircle className="spin" size={22} /> Getting the good stuff…</div>
            ) : (
              <>
                {activeTab === 'Reviews' && (
                  <div className="review-feed">
                    {reviews.length ? reviews.map((review) => (
                      <article className="review-card" key={review.id}>
                        <div className="review-avatar">{review.restaurantName?.slice(0, 1).toUpperCase() || 'R'}</div>
                        <div className="review-body">
                          <div className="review-topline">
                            <div>
                              <span className="review-category">RESTAURANT REVIEW</span>
                              <h3>{review.restaurantName}</h3>
                            </div>
                            <button
                              className="edit-button"
                              onClick={() => startEditing(review)}
                              type="button"
                              aria-label={`Edit review for ${review.restaurantName}`}
                            >
                              <Pencil size={14} /><span>Edit</span>
                            </button>
                          </div>
                          <div className="stars" aria-label={`${review.rating} out of 5 stars`}>
                            {Array.from({ length: 5 }, (_, index) => (
                              <Star key={index} size={13} fill={index < review.rating ? 'currentColor' : 'none'} />
                            ))}
                            <span>{review.rating}.0</span>
                          </div>
                          <p className="review-comment">{review.comment}</p>
                          <div className="review-meta"><span>Community pick</span><span>·</span><MessageSquareText size={13} /><span>Just now</span></div>
                        </div>
                      </article>
                    )) : (
                      <div className="empty-state"><MessageSquareText size={25} /><strong>Your people haven’t reviewed a spot yet.</strong><span>Be the first to share somewhere delicious.</span></div>
                    )}
                  </div>
                )}
                {activeTab === 'Playlists' && (
                  <div className="playlist-list" id="playlists">
                    {playlists.length ? playlists.map((playlist) => (
                      <article className="playlist-row" key={playlist.id}>
                        <div className="playlist-cover"><Music2 size={21} /></div>
                        <div><span className="review-category">COMMUNITY PLAYLIST</span><h3>{playlist.name}</h3><p>{Array.isArray(playlist.songs) ? playlist.songs.length : 0} songs · {Array.isArray(playlist.songs) ? playlist.songs.join(' · ') : ''}</p></div>
                        <Headphones className="row-icon" size={18} />
                      </article>
                    )) : <div className="empty-state"><Music2 size={25} /><strong>No playlists yet.</strong><span>Your sample playlist appears once Firebase is connected.</span></div>}
                  </div>
                )}
                {activeTab === 'Watchlist' && (
                  <div className="watchlist-list" id="watchlist">
                    {visibleWatchlists.length ? visibleWatchlists.map((movie) => {
                      const watched = movie.watched === true || movie.status === 'watched';
                      return (
                        <article className="watchlist-row" key={movie.id}>
                          <div className="movie-icon"><Clapperboard size={17} /></div>
                          <div className="movie-details"><h3>{movie.movieName || movie.name || 'Untitled movie'}</h3><span>{watched ? 'Already watched' : 'On your watchlist'}</span></div>
                          <span className={`status-pill ${watched ? 'watched' : 'not-watched'}`}><span />{watched ? 'Watched' : 'Not watched'}</span>
                        </article>
                      );
                    }) : <div className="empty-state"><Clapperboard size={25} /><strong>Your movie list is ready for its first pick.</strong><span>Add items to the Firestore watchlists collection to see them here.</span></div>}
                  </div>
                )}
              </>
            )}

            <div className="feed-footer"><span>YOU’RE ALL CAUGHT UP</span><span className="footer-line" /><Check size={14} /></div>
          </div>

          <aside className="sidebar">
            <div className="sidebar-heading"><span className="section-kicker">SHARE THE LOVE</span><span className="sidebar-count">01 / 02</span></div>
            <div className="form-card">
              <div className="form-card-title">
                <div className="form-icon"><Plus size={18} /></div>
                <div><h3>Leave a review</h3><p>Found a spot you loved?</p></div>
              </div>
              <form className="review-form" onSubmit={handleReviewSubmit}>
                <label htmlFor="restaurantName">RESTAURANT NAME</label>
                <input
                  id="restaurantName"
                  name="restaurantName"
                  onChange={handleReviewInput}
                  placeholder="e.g. Sunday in Brooklyn"
                  required
                  value={reviewForm.restaurantName}
                />
                <label htmlFor="rating">YOUR RATING</label>
                <div className="select-wrap">
                  <select id="rating" name="rating" onChange={handleReviewInput} value={reviewForm.rating}>
                    {[5, 4, 3, 2, 1].map((rating) => <option key={rating} value={rating}>{rating} stars{rating === 5 ? ' · Loved it' : ''}</option>)}
                  </select>
                  <ChevronDown size={14} />
                </div>
                <label htmlFor="comment">YOUR NOTE</label>
                <textarea
                  id="comment"
                  maxLength={500}
                  name="comment"
                  onChange={handleReviewInput}
                  placeholder="What made it special?"
                  required
                  rows={3}
                  value={reviewForm.comment}
                />
                <div className="form-bottom"><span>Keep it kind, keep it real.</span><span>{reviewForm.comment.length}/500</span></div>
                <button className="submit-button" disabled={saving || !isFirebaseConfigured} type="submit">
                  {saving ? <LoaderCircle className="spin" size={15} /> : <Send size={14} />}
                  {saving ? 'Saving review…' : 'Post your review'}
                  {!saving && <ArrowRight size={14} />}
                </button>
              </form>
            </div>

            <div className="tip-card">
              <div className="tip-illustration"><Star size={16} fill="currentColor" /><span>GOOD<br />TASTE</span></div>
              <div><span className="section-kicker">A LITTLE REMINDER</span><p>The best recommendations come from people who just <em>get it.</em></p></div>
            </div>
            <button className="refresh-link" onClick={loadData} type="button"><RefreshCw size={13} /> Refresh community picks</button>
          </aside>
        </section>

        <section className="below-fold" id="playlists-bottom">
          <div><span className="section-kicker">CURATED WITH CARE</span><p>Good things are better when they’re shared.</p></div>
          <button className="round-arrow" type="button" onClick={() => { setActiveTab('Playlists'); window.location.hash = 'reviews'; }} aria-label="Explore playlists"><ArrowRight size={18} /></button>
        </section>
      </main>

      <footer className="site-footer"><span>gather<span className="brand-dot">.</span> / FOR THE LOVE OF GOOD FINDS</span><span>© 2025 GATHER COMMUNITY</span></footer>

      {editingReview && (
        <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setEditingReview(null); }}>
          <section aria-labelledby="edit-title" aria-modal="true" className="edit-modal" role="dialog">
            <button className="modal-close" onClick={() => setEditingReview(null)} type="button" aria-label="Close edit review"><X size={18} /></button>
            <span className="section-kicker">A QUICK UPDATE</span>
            <h2 id="edit-title">Edit your <em>review.</em></h2>
            <form className="review-form" onSubmit={saveReviewEdit}>
              <label htmlFor="edit-rating">YOUR RATING</label>
              <div className="select-wrap">
                <select id="edit-rating" onChange={(event) => patchEditingReview('rating', event.target.value)} value={editingReview.rating}>
                  {[5, 4, 3, 2, 1].map((rating) => <option key={rating} value={rating}>{rating} stars</option>)}
                </select>
                <ChevronDown size={14} />
              </div>
              <label htmlFor="edit-comment">YOUR NOTE</label>
              <textarea id="edit-comment" maxLength={500} onChange={(event) => patchEditingReview('comment', event.target.value)} required rows={5} value={editingReview.comment} />
              <button className="submit-button" disabled={saving} type="submit">
                {saving ? <LoaderCircle className="spin" size={15} /> : <Check size={15} />}
                {saving ? 'Saving changes…' : 'Save changes'}{!saving && <ArrowRight size={14} />}
              </button>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
