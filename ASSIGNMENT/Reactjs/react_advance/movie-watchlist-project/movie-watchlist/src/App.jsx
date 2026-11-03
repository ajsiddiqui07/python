import React, { Suspense, lazy, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, firebaseConfigured, firebaseConfigMissing } from "./firebase";
import { Clapperboard, Film, LoaderCircle, LogOut, Popcorn, Sparkles } from "lucide-react";

const Watchlist = lazy(() => import("./components/Watchlist.jsx"));

function AuthScreen() {
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (mode === "signup") {
        await createUserWithEmailAndPassword(auth, email.trim(), password);
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      }
    } catch (err) {
      setError(err.code?.replace("auth/", "").replaceAll("-", " ") || "Unable to sign in.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="auth-layout">
      <section className="hero-panel">
        <div className="brand"><span className="brand-mark"><Clapperboard size={22} /></span> ScreenList</div>
        <div className="hero-copy">
          <span className="eyebrow"><Sparkles size={14} /> YOUR NEXT MOVIE NIGHT</span>
          <h1>Every story<br />starts with a <em>list.</em></h1>
          <p>Keep the movies you want to watch in one cozy place. Add a title, track what you’ve seen, and never lose a recommendation again.</p>
          <div className="hero-stats">
            <div><strong>01</strong><span>Collect titles</span></div>
            <div><strong>02</strong><span>Watch your way</span></div>
            <div><strong>03</strong><span>Keep the magic</span></div>
          </div>
        </div>
        <div className="film-strip"><Film /><span>YOUR PERSONAL CINEMA</span><Popcorn /></div>
      </section>
      <section className="auth-panel">
        <div className="auth-card">
          <div className="mobile-brand brand"><span className="brand-mark"><Clapperboard size={22} /></span> ScreenList</div>
          <div className="auth-icon"><Film size={24} /></div>
          <p className="eyebrow">WELCOME TO SCREENLIST</p>
          <h2>{mode === "signin" ? "Pick up where you left off." : "Start your movie journey."}</h2>
          <p className="muted">{mode === "signin" ? "Sign in to see your personal watchlist." : "Create an account and save your next favorites."}</p>
          <form onSubmit={submit} className="auth-form">
            <label>Email address<input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" required /></label>
            <label>Password<input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 6 characters" autoComplete={mode === "signin" ? "current-password" : "new-password"} minLength={6} required /></label>
            {error && <p className="error-message" role="alert">{error}</p>}
            <button className="button button-primary full-width" disabled={busy}>{busy ? <LoaderCircle className="spin" size={18} /> : null}{mode === "signin" ? "Sign in" : "Create account"}</button>
          </form>
          <p className="switch-mode">{mode === "signin" ? "New around here?" : "Already have an account?"} <button onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(""); }}>{mode === "signin" ? "Create account" : "Sign in"}</button></p>
          <div className="secure-note">Your watchlist is private to your account.</div>
        </div>
      </section>
    </main>
  );
}

function ConfigNotice() {
  return <main className="config-screen"><div className="config-card"><span className="brand-mark"><Clapperboard size={22} /></span><h1>Connect your Firebase project</h1><p>This project is ready to run, but the Firebase web app configuration is not filled in yet.</p><ol><li>Copy <code>.env.example</code> to <code>.env.local</code>.</li><li>Paste your Firebase web app values into that file.</li><li>Enable Email/Password Authentication and create a Firestore database.</li><li>Restart the development server using <code>npm run dev</code>.</li></ol><p className="muted">Missing values: {firebaseConfigMissing.join(", ")}</p></div></main>;
}

export default function App() {
  const [user, setUser] = useState(undefined);
  useEffect(() => onAuthStateChanged(auth, setUser), []);
  if (!firebaseConfigured) return <ConfigNotice />;
  if (user === undefined) return <div className="loading-screen"><LoaderCircle className="spin" size={30} /><span>Getting your screen ready…</span></div>;
  if (!user) return <AuthScreen />;
  return (
    <div className="app-shell">
      <header className="topbar"><div className="brand"><span className="brand-mark"><Clapperboard size={20} /></span> ScreenList</div><div className="topbar-right"><span className="user-email">{user.email}</span><button className="button button-quiet" onClick={() => signOut(auth)}><LogOut size={16} /> Sign out</button></div></header>
      <Suspense fallback={<div className="loading-screen"><LoaderCircle className="spin" size={30} /><span>Loading your watchlist…</span></div>}><Watchlist user={user} /></Suspense>
      <footer className="app-footer">Made for movie lovers <span>✦</span> One title at a time</footer>
    </div>
  );
}