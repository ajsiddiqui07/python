import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../firebase";

function Navbar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  const displayName =
    user?.displayName || user?.email || "Guest";

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Spotify
      </Link>

      <div className="nav-right">
        {loading ? (
          <span>Loading...</span>
        ) : user ? (
          <>
            <span className="welcome">
              Welcome, {displayName}
            </span>

            <Link to="/profile">Profile</Link>

            <button onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <span className="welcome">
              Welcome, Guest
            </span>

            <Link to="/login">Sign In</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;