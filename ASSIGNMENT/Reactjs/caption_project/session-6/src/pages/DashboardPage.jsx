import { useState } from 'react';
import {
  AudioLines,
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Compass,
  Heart,
  Home,
  Library,
  ListMusic,
  MoreHorizontal,
  Pause,
  Play,
  Plus,
  Search,
  SkipBack,
  SkipForward,
  Volume2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth.js';
import LogoutButton from '../components/LogoutButton.jsx';

const playlists = [
  {
    title: 'Sunday Softies',
    detail: 'Slow mornings, softer sounds.',
    image: 'photo-1470252649378-9c29740c9fa8',
    color: 'sage',
  },
  {
    title: 'After Hours',
    detail: 'For when the city goes quiet.',
    image: 'photo-1519608487953-e999c86e7455',
    color: 'blue',
  },
  {
    title: 'Golden Hour',
    detail: 'A little light for your day.',
    image: 'photo-1500530855697-b586d89ba3ee',
    color: 'amber',
  },
  {
    title: 'Kitchen Disco',
    detail: 'Good energy, no dance floor needed.',
    image: 'photo-1514525253161-7a46d19cd819',
    color: 'rose',
  },
  {
    title: 'Focus Flow',
    detail: 'Find the groove. Keep the flow.',
    image: 'photo-1470225620780-dba8ba36b745',
    color: 'violet',
  },
  {
    title: 'Little Escapes',
    detail: 'Somewhere else for a while.',
    image: 'photo-1501785888041-af3ef285b470',
    color: 'ocean',
  },
];

const madeForYou = [
  { title: 'The Slow Down', detail: 'A softer landing.', image: 'photo-1470252649378-9c29740c9fa8' },
  { title: 'Fresh Finds', detail: 'New sounds, easy listening.', image: 'photo-1470225620780-dba8ba36b745' },
  { title: 'A Little Focus', detail: 'Settle in and get it done.', image: 'photo-1500530855697-b586d89ba3ee' },
];

function imageUrl(id, width = 400) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;
}

function DashboardPage() {
  const { user } = useAuth();
  const [currentTrack, setCurrentTrack] = useState('Night Drive');
  const [isPlaying, setIsPlaying] = useState(false);
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'listener';

  return (
    <div className="dashboard">
      <aside className="side-rail">
        <Link className="dashboard-brand" to="/dashboard"><span className="brand-mark">m.</span><span>mellow</span></Link>
        <nav className="side-nav" aria-label="Dashboard navigation">
          <a className="side-nav-item selected" href="#home"><Home size={18} /><span>Home</span></a>
          <a className="side-nav-item" href="#made-for-you"><Compass size={18} /><span>Explore</span></a>
          <a className="side-nav-item" href="#library"><Search size={18} /><span>Search</span></a>
        </nav>
        <div className="library-heading" id="library"><span><Library size={18} /> Your library</span><button aria-label="Create playlist" type="button"><Plus size={17} /></button></div>
        <div className="library-links">
          <a href="#playlists"><span className="library-art liked"><Heart size={14} fill="currentColor" /></span><span>Liked songs</span></a>
          {playlists.slice(0, 4).map((playlist) => (
            <a href="#playlists" key={playlist.title}><span className={`library-art ${playlist.color}`}><img alt="" src={imageUrl(playlist.image, 80)} /></span><span>{playlist.title}</span></a>
          ))}
        </div>
        <div className="side-rail-bottom"><a href="#help"><CircleHelp size={16} /><span>Listening help</span></a><span className="made-with">MADE FOR SLOW DAYS</span></div>
      </aside>

      <div className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="history-buttons"><button aria-label="Go back" type="button"><ChevronLeft size={18} /></button><button aria-label="Go forward" type="button"><ChevronRight size={18} /></button></div>
          <div className="topbar-spacer" />
          <button className="upgrade-button" type="button">Explore mellow <span>↗</span></button>
          <button className="notification-button" aria-label="Notifications" type="button"><Bell size={17} /></button>
          <div className="user-menu">
            <span className="user-avatar">{displayName.slice(0, 1).toUpperCase()}</span>
            <span className="user-email">{user?.email}</span>
            <ChevronDown size={14} />
          </div>
          <LogoutButton />
        </header>

        <main className="dashboard-content" id="home">
          <section className="dashboard-welcome">
            <span className="dashboard-eyebrow"><span /> YOUR PERSONAL LISTENING SPACE</span>
            <h1>Good to have you here, <em>{displayName}.</em></h1>
            <p>Pick up where you left off, or let something new find you.</p>
            <div className="welcome-chips"><span>✦ MADE FOR YOUR MOMENT</span><span>YOUR MUSIC, KEPT YOURS</span></div>
          </section>

          <section className="music-section" id="playlists">
            <div className="section-heading">
              <div><span className="section-label">PICK UP WHERE YOU LEFT OFF</span><h2>Your <em>playlists.</em></h2></div>
              <a href="#all-playlists">See all <ChevronRight size={14} /></a>
            </div>
            <div className="playlist-grid">
              {playlists.map((playlist) => (
                <button className="dashboard-playlist" key={playlist.title} onClick={() => setCurrentTrack(playlist.title)} type="button">
                  <span className={`playlist-image ${playlist.color}`}><img alt="" src={imageUrl(playlist.image)} /><span className="playlist-play"><Play size={16} fill="currentColor" /></span></span>
                  <span className="playlist-copy"><strong>{playlist.title}</strong><span>{playlist.detail}</span></span>
                </button>
              ))}
            </div>
          </section>

          <section className="music-section made-for-section" id="made-for-you">
            <div className="section-heading">
              <div><span className="section-label">A FEW THINGS WE THINK YOU’LL LOVE</span><h2>Made for <em>you.</em></h2></div>
              <a href="#made-for-you">More like this <ChevronRight size={14} /></a>
            </div>
            <div className="mix-grid">
              {madeForYou.map((mix, index) => (
                <button className="mix-card" key={mix.title} onClick={() => setCurrentTrack(mix.title)} type="button">
                  <span className={`mix-art mix-${index + 1}`}><img alt="" src={imageUrl(mix.image)} /><span className="mix-orb"><AudioLines size={21} /></span></span>
                  <strong>{mix.title}</strong><span>{mix.detail}</span>
                  <span className="mix-meta">MELLOW MIX · 24 TRACKS</span>
                </button>
              ))}
            </div>
          </section>

          <section className="recent-section">
            <div className="section-heading">
              <div><span className="section-label">BACK IN YOUR ORBIT</span><h2>Recently <em>played.</em></h2></div>
              <button className="more-button" aria-label="More recent plays" type="button"><MoreHorizontal size={19} /></button>
            </div>
            <div className="recent-track">
              <img alt="" src={imageUrl('photo-1519608487953-e999c86e7455', 100)} />
              <div className="track-info"><strong>{currentTrack}</strong><span>Juniper Lane · Night Notes</span></div>
              <span className="track-album">Night Notes</span>
              <span className="track-duration">3:42</span>
              <button className="track-play" onClick={() => setIsPlaying(!isPlaying)} type="button" aria-label={isPlaying ? 'Pause track' : 'Play track'}>{isPlaying ? <Pause size={15} /> : <Play size={15} fill="currentColor" />}</button>
            </div>
          </section>
        </main>
      </div>

      <footer className="player-bar">
        <div className="now-playing">
          <img alt="" src={imageUrl('photo-1519608487953-e999c86e7455', 100)} />
          <div><strong>{currentTrack}</strong><span>Juniper Lane</span></div>
          <button className="player-heart" aria-label="Like track" type="button"><Heart size={16} /></button>
        </div>
        <div className="player-controls">
          <div className="control-buttons"><button aria-label="Previous track" type="button"><SkipBack size={16} fill="currentColor" /></button><button className="main-play" onClick={() => setIsPlaying(!isPlaying)} type="button" aria-label={isPlaying ? 'Pause' : 'Play'}>{isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}</button><button aria-label="Next track" type="button"><SkipForward size={16} fill="currentColor" /></button></div>
          <div className="progress-row"><span>1:18</span><div className="progress-track"><span /></div><span>3:42</span></div>
        </div>
        <div className="volume-control"><ListMusic size={16} /><Volume2 size={17} /><div className="volume-track"><span /></div></div>
      </footer>
    </div>
  );
}

export default DashboardPage;
