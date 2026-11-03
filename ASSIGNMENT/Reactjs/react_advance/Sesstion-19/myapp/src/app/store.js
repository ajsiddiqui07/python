import { configureStore } from "@reduxjs/toolkit";
import playlistReducer from "../features/playlist/playlistSlice";

const store = configureStore({
  reducer: {
    playlist: playlistReducer,
  },
});

export default store;