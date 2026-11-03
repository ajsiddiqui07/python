import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  songs: [
    {
      id: "song-1",
      title: "Perfect",
      artist: "Ed Sheeran",
    },
    {
      id: "song-2",
      title: "Blinding Lights",
      artist: "The Weeknd",
    },
  ],
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,

  reducers: {
    // Add a new song
    addSong: (state, action) => {
      state.songs.push(action.payload);
    },

    // Edit a song by its ID
    editSong: (state, action) => {
      const { id, title, artist } = action.payload;

      const song = state.songs.find((song) => song.id === id);

      if (song) {
        song.title = title;
        song.artist = artist;
      }
    },

    // Delete a song by its ID
    deleteSong: (state, action) => {
      state.songs = state.songs.filter(
        (song) => song.id !== action.payload
      );
    },
  },
});

export const { addSong, editSong, deleteSong } = playlistSlice.actions;

export default playlistSlice.reducer;