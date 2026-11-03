import { useState } from 'react';
import DynamicForm from './components/DynamicForm.jsx';
import Footer from './components/Footer.jsx';
import Modal from './components/Modal.jsx';
import Navbar from './components/Navbar.jsx';
import PlaylistCard from './components/PlaylistCard.jsx';
import './App.css';

const playlists = [
  {
    name: 'Sunday Softies',
    songs: 24,
    mood: 'SLOW MORNINGS',
    image:
      'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=800&q=85',
  },
  {
    name: 'Golden Hour',
    songs: 18,
    mood: 'FEEL-GOOD FAVES',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=85',
  },
  {
    name: 'Kitchen Disco',
    songs: 32,
    mood: 'GOOD ENERGY',
    image:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=85',
  },
];

const socialLinks = [
  { name: 'Instagram', href: 'https://instagram.com', icon: 'ig' },
  { name: 'TikTok', href: 'https://tiktok.com', icon: 'tk' },
  { name: 'YouTube', href: 'https://youtube.com', icon: '▶' },
  { name: 'X', href: 'https://x.com', icon: '𝕏' },
];

const signupFields = [
  {
    name: 'fullName',
    label: 'Your name',
    type: 'text',
    placeholder: 'e.g. Riya Sharma',
    autoComplete: 'name',
    required: true,
  },
  {
    name: 'email',
    label: 'Email address',
    type: 'email',
    placeholder: 'you@example.com',
    autoComplete: 'email',
    required: true,
  },
  {
    name: 'team',
    label: 'Choose your team',
    type: 'select',
    placeholder: 'Pick your IPL team',
    required: true,
    options: [
      { value: 'csk', label: 'Chennai Super Kings' },
      { value: 'dc', label: 'Delhi Capitals' },
      { value: 'gt', label: 'Gujarat Titans' },
      { value: 'kkr', label: 'Kolkata Knight Riders' },
      { value: 'mi', label: 'Mumbai Indians' },
      { value: 'rr', label: 'Rajasthan Royals' },
      { value: 'rcb', label: 'Royal Challengers Bengaluru' },
      { value: 'srh', label: 'Sunrisers Hyderabad' },
    ],
  },
  {
    name: 'password',
    label: 'Create a password',
    type: 'password',
    placeholder: 'At least 8 characters',
    autoComplete: 'new-password',
    min: 8,
    required: true,
  },
];

const ticketFields = [
  {
    name: 'ticketName',
    label: 'Full name',
    type: 'text',
    placeholder: 'Name on the ticket',
    autoComplete: 'name',
    required: true,
  },
  {
    name: 'ticketEmail',
    label: 'Email address',
    type: 'email',
    placeholder: 'Where should we send it?',
    autoComplete: 'email',
    required: true,
  },
  {
    name: 'showDate',
    label: 'Choose a date',
    type: 'date',
    min: new Date().toISOString().slice(0, 10),
    required: true,
  },
  {
    name: 'ticketType',
    label: 'Ticket type',
    type: 'select',
    placeholder: 'Select your seat',
    required: true,
    options: [
      { value: 'balcony', label: 'Balcony · ₹799' },
      { value: 'floor', label: 'Floor · ₹1,499' },
      { value: 'vip', label: 'VIP lounge · ₹2,499' },
    ],
  },
];

function App() {
  const [activeLink, setActiveLink] = useState('Home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmation, setConfirmation] = useState('');
  const [signupMessage, setSignupMessage] = useState('');

  function handleTicketSubmit(formData) {
    const name = formData.get('ticketName');
    setConfirmation(`You're on the list, ${name}! Check your email for details.`);
    setIsModalOpen(false);
  }

  function handleSignup(formData) {
    const name = formData.get('fullName');
    setSignupMessage(`You're in, ${name}! Your fantasy season starts now.`);
  }

  return (
    <>
      <Navbar activeLink={activeLink} onNavigate={setActiveLink} />
      <main>
        <section className="hero page-width" id="home">
          <div className="hero-copy">
            <span className="pill"><span className="pulse-dot" /> YOUR EVERYDAY, UPGRADED</span>
            <h1>
              Make room
              <br />
              for <span>good things.</span>
            </h1>
            <p>
              A little inspiration for your next meal, your next playlist, and
              your next big night out.
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href="#orders">
                Find your vibe <span aria-hidden="true">↓</span>
              </a>
              <span className="small-note">Curated with a little extra love</span>
            </div>
            <div className="hero-note">
              <div className="avatar-stack" aria-hidden="true">
                <span>R</span><span>A</span><span>M</span>
              </div>
              <span>Loved by <strong>12k+</strong> good-taste people</span>
            </div>
          </div>
          <div className="hero-art" aria-label="A cozy meal and a good time">
            <img
              alt="Colorful brunch spread on a sunny table"
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1100&q=90"
            />
            <div className="floating-note">
              <span className="note-icon" aria-hidden="true">✦</span>
              <div><strong>Today’s little pick</strong><span>Brunch + good beats</span></div>
            </div>
            <span className="hero-sticker" aria-hidden="true">GOOD<br />MOOD<br />ONLY</span>
          </div>
          <a className="scroll-cue" href="#orders">
            <span>SCROLL TO EXPLORE</span><span aria-hidden="true">↓</span>
          </a>
        </section>

        <section className="playlist-section section-pad" id="orders">
          <div className="page-width">
            <div className="section-heading">
              <div>
                <span className="eyebrow">YOUR NEXT REPEAT</span>
                <h2>A soundtrack for <em>everything.</em></h2>
              </div>
              <a className="text-link" href="#profile">Explore all playlists <span aria-hidden="true">↗</span></a>
            </div>
            <div className="playlist-grid">
              {playlists.map((playlist) => (
                <PlaylistCard key={playlist.name} {...playlist} />
              ))}
            </div>
            <p className="component-caption">
              <span>01</span> PLAYLIST CARDS <i /> Data-driven, just like your taste.
            </p>
          </div>
        </section>

        <section className="ticket-section section-pad" id="tickets">
          <div className="ticket-banner page-width">
            <div className="ticket-copy">
              <span className="eyebrow">YOUR NEXT CORE MEMORY</span>
              <h2>Some nights<br />deserve a <em>ticket.</em></h2>
              <p>Live music, lights down, phones away. You know the feeling.</p>
              <button
                className="button button-light"
                onClick={() => setIsModalOpen(true)}
                type="button"
              >
                Book your ticket <span aria-hidden="true">↗</span>
              </button>
              {confirmation && <p className="success-message" role="status">{confirmation}</p>}
            </div>
            <div className="ticket-visual">
              <img
                alt="Crowd enjoying a live concert"
                src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1000&q=85"
              />
              <div className="ticket-stub">
                <span>GOOD NIGHTS CLUB</span>
                <strong>LIVE<br />ON STAGE</strong>
                <span>ONE NIGHT ONLY · 2025</span>
                <div className="barcode" aria-hidden="true" />
              </div>
            </div>
          </div>
          <p className="component-caption page-width">
            <span>02</span> BOOKING MODAL <i /> Closes on outside click, close button, or Escape.
          </p>
        </section>

        <section className="signup-section section-pad" id="profile">
          <div className="signup-card page-width">
            <div className="signup-intro">
              <span className="eyebrow">THE BIG LEAGUE</span>
              <h2>Pick your squad.<br /><em>Call your shots.</em></h2>
              <p>
                Build your fantasy XI, back your favorites, and make every
                match day count.
              </p>
              <div className="signup-badge"><span aria-hidden="true">✦</span> SEASON 2025 IS ON</div>
            </div>
            <div className="signup-form-wrap">
              <div className="form-heading">
                <span className="eyebrow">YOUR SEASON STARTS HERE</span>
                <h3>Create your account</h3>
                <p>Join free. Bring your best game.</p>
              </div>
              <DynamicForm
                fields={signupFields}
                onSubmit={handleSignup}
                submitLabel="Create my account"
              />
              {signupMessage && <p className="success-message" role="status">{signupMessage}</p>}
            </div>
          </div>
          <p className="component-caption page-width">
            <span>03</span> DYNAMIC FORM <i /> One reusable form, configured with field data.
          </p>
        </section>
      </main>
      <Footer socialLinks={socialLinks} />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Book your ticket."
      >
        <p className="modal-description">
          Tell us where to send your pass. The good night is almost yours.
        </p>
        <DynamicForm
          fields={ticketFields}
          onSubmit={handleTicketSubmit}
          submitLabel="Reserve my spot"
        />
      </Modal>
    </>
  );
}

export default App;
