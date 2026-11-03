import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://api.sampleapis.com/restaurants/restaurants";

// Part 1: Simple async thunk to test Redux Thunk
export const testAsyncAction = () => async () => {
  const result = await new Promise((resolve) => {
    setTimeout(() => {
      resolve("Async Redux Thunk is working successfully!");
    }, 1000);
  });

  console.log(result);
  return result;
};

// Part 2: Fetch restaurants and optionally filter by city
export const fetchRestaurants = createAsyncThunk(
  "restaurants/fetchRestaurants",
  async (city = "", { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Unexpected API response format.");
      }

      const searchCity = city.trim().toLowerCase();

      // If no city is entered, return all restaurants.
      if (!searchCity) {
        return data;
      }

      // Filter using available city/location fields.
      return data.filter((restaurant) => {
        const address = restaurant.address;
        const location = restaurant.location;

        const possibleLocations = [
          restaurant.city,
          typeof address === "string" ? address : "",
          typeof address === "object" && address !== null
            ? address.city
            : "",
          typeof location === "string" ? location : "",
          typeof location === "object" && location !== null
            ? location.city
            : "",
        ];

        return possibleLocations.some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchCity)
        );
      });
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to fetch restaurants."
      );
    }
  }
);

// Part 3: Redux state and reducers
const restaurantSlice = createSlice({
  name: "restaurants",

  initialState: {
    restaurants: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = action.payload;
      })

      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error.message || "Something went wrong.";
      });
  },
});

export default restaurantSlice.reducer;