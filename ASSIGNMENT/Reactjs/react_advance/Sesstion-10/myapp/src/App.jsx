import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth } from "./firebase";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [showSignUp, setShowSignUp] = useState(true);
  const [logoutError, setLogoutError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setCheckingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  async function handleLogout() {
    setLogoutError("");

    try {
      await signOut(auth);
    } catch {
      setLogoutError("Logout failed. Please try again.");
    }
  }

  if (checkingAuth) {
    return <p className="loading-message">Checking login status...</p>;
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Firebase Authentication App</h1>

        {user ? (
          <div className="user-info">
            <span>
              Logged in as: <strong>{user.email}</strong>
            </span>

            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <p>You are not logged in.</p>
        )}
      </header>

      <main>
        {user ? (
          <section className="welcome-card">
            <h2>Welcome!</h2>
            <p>You have successfully logged in.</p>
            <p>Your email: {user.email}</p>

            {logoutError && (
              <p className="error-message" role="alert">
                {logoutError}
              </p>
            )}
          </section>
        ) : showSignUp ? (
          <SignUp onSwitchToLogin={() => setShowSignUp(false)} />
        ) : (
          <Login onSwitchToSignUp={() => setShowSignUp(true)} />
        )}
      </main>
    </div>
  );
}

export default App;