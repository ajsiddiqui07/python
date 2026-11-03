import { useEffect, useState } from "react";
import axios from "axios";

const RESTAURANT_API =
  "https://mocki.io/v1/570c5e5c-8c8b-4c1e-8c8b-4c1e8c8b4c1e";

function RestaurantSearch() {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(RESTAURANT_API);

        // Accept either an array or an object containing restaurants.
        const data = Array.isArray(response.data)
          ? response.data
          : response.data.restaurants;

        if (!Array.isArray(data)) {
          throw new Error("Unexpected restaurant data format");
        }

        setRestaurants(data);
      } catch (err) {
        setError(
          "Could not load restaurants. Please check the API URL and try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const filteredRestaurants = restaurants.filter((restaurant) =>
    String(restaurant.name || "")
      .toLowerCase()
      .includes(search.toLowerCase().trim())
  );

  return (
    <section className="card">
      <h2>Restaurant Search</h2>

      <input
        type="text"
        placeholder="Search restaurants by name..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {loading && <p>Loading restaurants...</p>}

      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <>
          {filteredRestaurants.length > 0 ? (
            <ul>
              {filteredRestaurants.map((restaurant, index) => (
                <li key={restaurant.id ?? index}>{restaurant.name}</li>
              ))}
            </ul>
          ) : (
            <p>No matching restaurants found.</p>
          )}
        </>
      )}
    </section>
  );
}

export default RestaurantSearch;