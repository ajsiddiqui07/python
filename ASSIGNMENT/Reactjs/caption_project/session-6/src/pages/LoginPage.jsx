import { useState } from 'react';
import { ArrowRight, Headphones, LockKeyhole, Mail, Music2 } from 'lucide-react';
import { Navigate, useLocation } from 'react-router-dom';
import { firebaseSetupMessage, isFirebaseConfigured } from '../firebase.js';
import { useAuth } from '../context/useAuth.js';

function getFriendlyError(error) {
  switch (error.code) {
    case 'auth/invalid-email':
      return 'That email address doesn’t look right. Check it and try again.';
    case 'auth/invalid-credential':
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'That email and password don’t match. Give it another try.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Wait a little and try again.';
    case 'auth/network-request-failed':
      return 'Couldn’t reach Firebase. Check your internet connection.';
    default:
      return error.message || 'Sign in failed. Please try again.';
  }
}

function LoginPage() {
  const { user, loading, signIn } = useAuth();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);

  if (!loading && user) {
    return <Navigate to={location.state?.from?.pathname || '/dashboard'} replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setIsSigningIn(true);
    try {
      await signIn(email.trim(), password);
    } catch (signInError) {
      console.error('Unable to sign in:', signInError);
      setError(getFriendlyError(signInError));
    } finally {
      setIsSigningIn(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-art" aria-label="Mellow music">
        <a className="brand login-brand" href="/login">
          <span className="brand-mark">m.</span>
          <span>mellow</span>
        </a>
        <div className="art-copy">
          <span className="overline"><span /> SOUNDTRACK YOUR SLOW DOWN</span>
          <h1>Find your<br /><em>own rhythm.</em></h1>
          <p>Come back to the songs that feel like you.</p>
        </div>
        <div className="art-player">
          <img
            src="https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=150&q=80"
            alt=""
          />
          <div className="art-track"><strong>Night Drive</strong><span>Juniper Lane</span></div>
          <span className="equalizer" aria-hidden="true"><i /><i /><i /><i /></span>
        </div>
        <span className="art-footnote">A LITTLE SPACE FOR THE SOUND YOU LOVE</span>
      </section>

      <section className="login-panel">
        <div className="mobile-brand"><span className="brand-mark">m.</span><span>mellow</span></div>
        <div className="login-content">
          <div className="welcome-icon"><Headphones size={22} strokeWidth={1.6} /></div>
          <span className="section-label">YOUR MUSIC, YOUR MOMENT</span>
          <h2>Welcome back.</h2>
          <p className="login-subtitle">Sign in and settle into your sound.</p>

          {!isFirebaseConfigured && (
            <div className="setup-notice" role="status">
              <strong>One quick setup step</strong>
              <span>{firebaseSetupMessage} Enable Email/Password sign-in in Firebase Authentication.</span>
            </div>
          )}
          {error && <div className="login-error" role="alert">{error}</div>}

          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">EMAIL ADDRESS</label>
            <div className="input-wrap">
              <Mail size={16} />
              <input
                autoComplete="email"
                id="email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
                type="email"
                value={email}
              />
            </div>
            <div className="password-label">
              <label htmlFor="password">PASSWORD</label>
              <span><LockKeyhole size={12} /> YOUR ACCOUNT IS SECURE</span>
            </div>
            <div className="input-wrap">
              <LockKeyhole size={16} />
              <input
                autoComplete="current-password"
                id="password"
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Your password"
                required
                type="password"
                value={password}
              />
            </div>
            <button className="sign-in-button" disabled={isSigningIn || !isFirebaseConfigured} type="submit">
              <span>{isSigningIn ? 'Signing you in…' : 'Sign in'}</span>
              {isSigningIn ? <span className="button-spinner" /> : <ArrowRight size={17} />}
            </button>
          </form>

          <div className="login-divider"><span />A GOOD THING TO COME BACK TO<span /></div>
          <div className="login-perks">
            <span><Music2 size={14} /> Your saved playlists</span>
            <span><Headphones size={14} /> Your listening space</span>
          </div>
        </div>
        <footer className="login-footer"><span>© 2025 MELLOW</span><span>MADE FOR YOUR MOMENT</span></footer>
      </section>
    </main>
  );
}

export default LoginPage;
