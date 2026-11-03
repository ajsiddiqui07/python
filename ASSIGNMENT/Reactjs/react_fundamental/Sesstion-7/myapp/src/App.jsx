import React, { useEffect, useState } from "react";
import "./App.css";

// Question 1: TrendingSongs
function TrendingSongs() {
  useEffect(() => {
    console.log("Component mounted");
  }, []);

  return (
    <div className="card">
      <h2>Trending Songs</h2>
      <p>Check the browser console to see the message.</p>
    </div>
  );
}

// Question 2: IPLScoreFetcher
function IPLScoreFetcher() {
  const [headline, setHeadline] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMatchData() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch match data");
        }

        const data = await response.json();

        if (data.length > 0) {
          setHeadline(data[0].title);
        } else {
          setHeadline("No match headline available");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMatchData();
  }, []);

  return (
    <div className="card">
      <h2>IPL Match Headline</h2>

      {loading ? (
        <p>Loading match data...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>{headline}</p>
      )}
    </div>
  );
}

// Question 3: MovieSuggestions
function MovieSuggestions() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch movie suggestions");
        }

        const data = await response.json();
        setMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  return (
    <div className="card">
      <h2>Movie Suggestions</h2>

      {loading ? (
        <p>Loading movies...</p>
      ) : error ? (
        <p>{error}</p>
      ) : movies.length > 0 ? (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>{movie.name}</li>
          ))}
        </ul>
      ) : (
        <p>No movies available.</p>
      )}
    </div>
  );
}

// Question 4: Automatically Fetch Data on Mount
function AutoFetchData() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setPosts(data.slice(0, 5));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="card">
      <h2>Automatically Fetched Posts</h2>

      {loading ? (
        <p>Loading posts...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Main App Component
function App() {
  return (
    <div className="container">
      <h1>React useEffect Practice</h1>

      <TrendingSongs />
      <IPLScoreFetcher />
      <MovieSuggestions />
      <AutoFetchData />
    </div>
  );
}

export default App;