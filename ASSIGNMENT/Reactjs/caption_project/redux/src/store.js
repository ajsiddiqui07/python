import { createStore } from 'redux';
import { addSong, playlistReducer } from './playlist.js';

const store = createStore(playlistReducer);

store.dispatch(addSong('Kesariya'));
store.dispatch(addSong('Shape of You'));

console.log('Updated playlist:', store.getState());

export default store;
