import { useAuth } from "../AuthContext";

function Home() {
  const { user } = useAuth();

  return (
    <div className="page">
      {user ? (
        <h1>
          Welcome back, {user.displayName || user.email}!
        </h1>
      ) : (
        <h1>Welcome to Spotify</h1>
      )}

      <p>Discover your favorite music.</p>
    </div>
  );
}

export default Home;