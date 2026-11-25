import { configureStore } from "@reduxjs/toolkit";
import feesReducer from "./feesSlice.js";

const store = configureStore({
  reducer: {
    fees: feesReducer,
  },
});

export default store;
