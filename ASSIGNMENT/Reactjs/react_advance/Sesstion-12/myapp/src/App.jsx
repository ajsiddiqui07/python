import { useEffect, useState } from "react";

import {
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "./firebase";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [cuisine, setCuisine] = useState("");

  const [restaurants, setRestaurants] = useState([]);
  const [filterCuisine, setFilterCuisine] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch all restaurants from Firestore
  async function fetchRestaurants() {
    setLoading(true);
    setError("");

    try {
      const querySnapshot = await getDocs(
        collection(db, "restaurants")
      );

      const restaurantList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRestaurants(restaurantList);
    } catch (err) {
      console.error("Error fetching restaurants:", err);
      setError(
        "Restaurants load nahi hue. Firestore configuration aur security rules check karein."
      );
    } finally {
      setLoading(false);
    }
  }

  // Fetch restaurants when the component loads
  useEffect(() => {
    fetchRestaurants();
  }, []);

  // Add a restaurant to Firestore
  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setError("");

    const restaurantName = name.trim();
    const restaurantCuisine = cuisine.trim();

    if (!restaurantName || !restaurantCuisine) {
      setError("Please enter both restaurant name and cuisine.");
      return;
    }

    setSaving(true);

    try {
      await addDoc(collection(db, "restaurants"), {
        name: restaurantName,
        cuisine: restaurantCuisine,
      });

      setName("");
      setCuisine("");
      setMessage("Restaurant added successfully!");

      // Refresh the list after adding
      await fetchRestaurants();
    } catch (err) {
      console.error("Error adding restaurant:", err);
      setError(
        "Restaurant add nahi hua. Firestore security rules check karein."
      );
    } finally {
      setSaving(false);
    }
  }

  // Filter restaurants in real time as the user types
  const filteredRestaurants = restaurants.filter((restaurant) =>
    (restaurant.cuisine || "")
      .toLowerCase()
      .includes(filterCuisine.trim().toLowerCase())
  );

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Restaurant Manager</h1>
        <p>Add restaurants and filter them by cuisine.</p>
      </header>

      <main className="main-content">
        {/* Add Restaurant Form */}
        <section className="card">
          <h2>Add a Restaurant</h2>

          <form onSubmit={handleSubmit}>
            <label htmlFor="restaurant-name">
              Restaurant Name
            </label>

            <input
              id="restaurant-name"
              type="text"
              placeholder="e.g. The Italian Kitchen"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />

            <label htmlFor="restaurant-cuisine">
              Cuisine
            </label>

            <input
              id="restaurant-cuisine"
              type="text"
              placeholder="e.g. Italian"
              value={cuisine}
              onChange={(event) => setCuisine(event.target.value)}
              required
            />

            <button type="submit" disabled={saving}>
              {saving ? "Adding..." : "Add Restaurant"}
            </button>
          </form>

          {message && (
            <p className="success-message" role="status">
              {message}
            </p>
          )}

          {error && (
            <p className="error-message" role="alert">
              {error}
            </p>
          )}
        </section>

        {/* Restaurant List and Cuisine Filter */}
        <section className="card">
          <h2>Restaurant List</h2>

          <label htmlFor="cuisine-filter">
            Filter by Cuisine
          </label>

          <input
            id="cuisine-filter"
            type="text"
            placeholder="Type Italian, Chinese, etc."
            value={filterCuisine}
            onChange={(event) =>
              setFilterCuisine(event.target.value)
            }
          />

          <p className="result-count">
            Showing {filteredRestaurants.length} of{" "}
            {restaurants.length} restaurants
          </p>

          {loading ? (
            <p>Loading restaurants...</p>
          ) : filteredRestaurants.length === 0 ? (
            <p>No matching restaurants found.</p>
          ) : (
            <ul className="restaurant-list">
              {filteredRestaurants.map((restaurant) => (
                <li key={restaurant.id} className="restaurant-item">
                  <div>
                    <h3>{restaurant.name}</h3>
                    <p>
                      Cuisine: <span>{restaurant.cuisine}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;