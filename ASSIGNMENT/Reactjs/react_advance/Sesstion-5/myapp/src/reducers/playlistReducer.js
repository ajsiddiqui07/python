function playlistReducer(state, action) {
  switch (action.type) {
    case "ADD_SONG": {
      const newSong = {
        id: action.payload.id,
        name: action.payload.name,
      };

      return [...state, newSong];
    }

    case "REMOVE_SONG":
      return state.filter(
        (song) => song.id !== action.payload
      );

    case "EDIT_SONG":
      return state.map((song) =>
        song.id === action.payload.id
          ? { ...song, name: action.payload.name }
          : song
      );

    default:
      return state;
  }
}

export default playlistReducer;