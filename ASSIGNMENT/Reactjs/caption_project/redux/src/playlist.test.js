import test from 'node:test';
import assert from 'node:assert/strict';
import { addSong, playlistReducer, removeSong } from './playlist.js';

test('addSong creates an action and the reducer adds its payload', () => {
  const action = { type: 'playlist/addSong', payload: 'Kesariya' };

  assert.deepEqual(addSong('Kesariya'), action);
  assert.deepEqual(playlistReducer([], action), ['Kesariya']);
});

test('removeSong removes matching song names without mutating the playlist', () => {
  const playlist = ['Kesariya', 'Shape of You', 'Kesariya'];
  const nextPlaylist = playlistReducer(playlist, removeSong('Kesariya'));

  assert.deepEqual(nextPlaylist, ['Shape of You']);
  assert.deepEqual(playlist, ['Kesariya', 'Shape of You', 'Kesariya']);
});

test('unknown actions leave the playlist unchanged', () => {
  const playlist = ['Kesariya'];

  assert.equal(playlistReducer(playlist, { type: 'unknown' }), playlist);
});
