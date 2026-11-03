import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchRestaurants,
  testAsyncAction,
} from "../features/restaurants/restaurantSlice";

function RestaurantList() {
  const [city, setCity] = useState("");

  const dispatch = useDispatch();

  const { restaurants, loading, error } = useSelector(
    (state) => state.restaurants
  );

  // Fetch all restaurants when the component first loads.
  useEffect(() => {
    dispatch(fetchRestaurants(""));
  }, [dispatch]);

  const handleSearch = (event) => {
    event.preventDefault();
    dispatch(fetchRestaurants(city));
  };

  return (
    <div className="restaurant-container">
      <h1>🍽️ Restaurant Finder</h1>

      <p className="subtitle">
        Find restaurants by city
      </p>

      {/* Test Redux Thunk */}
      <button
        className="test-button"
        onClick={() => dispatch(testAsyncAction())}
      >
        Test Async Thunk
      </button>

      {/* Search by city */}
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter city (e.g., Ahmedabad)"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Loading message */}
      {loading && (
        <p className="loading-message">
          Loading restaurants, please wait...
        </p>
      )}

      {/* Error message */}
      {error && (
        <p className="error-message" role="alert">
          Error: {error}
        </p>
      )}

      {/* Restaurant list */}
      {!loading && !error && (
        <div className="restaurant-list">
          <h2>
            Restaurants ({restaurants.length})
          </h2>

          {restaurants.length === 0 ? (
            <p>
              No restaurants found for this city.
              Try another city or search without a city name.
            </p>
          ) : (
            restaurants.map((restaurant, index) => (
              <div
                className="restaurant-card"
                key={restaurant.id ?? restaurant._id ?? index}
              >
                <h3>
                  {restaurant.name ??
                    restaurant.restaurantName ??
                    restaurant.restaurant_name ??
                    "Unnamed Restaurant"}
                </h3>

                {restaurant.city && (
                  <p>City: {restaurant.city}</p>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default RestaurantList;