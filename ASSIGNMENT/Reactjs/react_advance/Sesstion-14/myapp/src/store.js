import { createStore } from "redux";

// Initial playlist
const initialState = [];

// Action: Add a song
export const addSong = (songName) => {
  return {
    type: "ADD_SONG",
    payload: songName,
  };
};

// Action: Remove a song by its index
export const removeSong = (index) => {
  return {
    type: "REMOVE_SONG",
    payload: index,
  };
};

// Reducer
export const playlistReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "ADD_SONG":
      return [...state, action.payload];

    case "REMOVE_SONG":
      return state.filter(
        (_, index) => index !== action.payload
      );

    default:
      return state;
  }
};

// Redux store
const store = createStore(playlistReducer);

export default store;