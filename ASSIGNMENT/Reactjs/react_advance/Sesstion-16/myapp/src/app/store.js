import { configureStore } from "@reduxjs/toolkit";
import restaurantReducer from "../features/restaurants/restaurantSlice";

const store = configureStore({
  reducer: {
    restaurants: restaurantReducer,
  },
});

export default store;