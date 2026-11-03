import { useEffect, useState } from "react";

function ErrorHandlingDemo() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/invalidurl"
        );

        if (!response.ok) {
          throw new Error("HTTP error: " + response.status);
        }

        const result = await response.json();

        setData(result);
        setError(false);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <section className="card">
      <h2>API Error Handling</h2>

      {loading && <p>Loading...</p>}

      {!loading && error && (
        <p className="error">Error loading data</p>
      )}

      {!loading && !error && (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </section>
  );
}

export default ErrorHandlingDemo;