export const ADD_SONG = 'playlist/addSong';
export const REMOVE_SONG = 'playlist/removeSong';

export const addSong = (songName) => ({
  type: ADD_SONG,
  payload: songName,
});

export const removeSong = (songName) => ({
  type: REMOVE_SONG,
  payload: songName,
});

export function playlistReducer(playlist = [], action) {
  switch (action.type) {
    case ADD_SONG:
      return [...playlist, action.payload];
    case REMOVE_SONG:
      return playlist.filter((song) => song !== action.payload);
    default:
      return playlist;
  }
}
