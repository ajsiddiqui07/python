# Redux Playlist

A small React playlist app demonstrating Redux actions, an immutable reducer, a
Redux store, and React-Redux bindings.

## Run locally

```sh
npm install
npm run dev
```

The playlist starts with **Kesariya** and **Shape of You**. Add songs with the
input, or remove a song with its **Remove** button.

## Verify

```sh
npm test
npm run build
```

The playlist actions and reducer are exported from `src/playlist.js`, and the
store in `src/store.js` logs its initial playlist after dispatching the two
example `addSong` actions.
