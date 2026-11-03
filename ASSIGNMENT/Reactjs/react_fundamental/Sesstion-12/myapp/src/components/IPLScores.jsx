import { useEffect, useState } from "react";

function IPLScores() {
  const [scores, setScores] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchScores() {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        if (response.status !== 200) {
          throw new Error("Failed to load scores");
        }

        const data = await response.json();

        setScores(data);
      } catch (err) {
        setError(true);
        setScores([]);
      } finally {
        setLoading(false);
      }
    }

    fetchScores();
  }, []);

  return (
    <section className="card">
      <h2>IPL Dummy Scores</h2>

      {loading && <p>Loading scores...</p>}

      {!loading && error && (
        <p className="error">Error loading scores</p>
      )}

      {!loading && !error && (
        <ul>
          {scores.map((team) => (
            <li key={team.id}>
              <strong>{team.name}</strong>
              {" — Simulated Score: "}
              {team.id * 23} runs
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default IPLScores;