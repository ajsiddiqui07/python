function App() {
  const spotifyApiKey = import.meta.env.VITE_SPOTIFY_API_KEY;
  const welcomeMessage = import.meta.env.VITE_WELCOME_MSG;

  return (
    <main style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>Environment Variables Demo</h1>

      <h2>Welcome Message</h2>
      <p>{welcomeMessage || "Welcome message not configured."}</p>

      <h2>Spotify API Key (Practice Only)</h2>
      <p>{spotifyApiKey || "Spotify key not configured."}</p>
    </main>
  );
}

export default App;