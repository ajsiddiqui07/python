# Session 5 — Playlist GraphQL schema

Run `npm install`, then `npm run dev`. Open `http://localhost:4001/` in Apollo Sandbox (or paste the URL into GraphiQL).

The schema is in `schema.graphql`; sample records and resolvers are in `index.js`. The `Playlist.songs` resolver joins song IDs to song objects. `duration` is an integer in seconds.

Q5: run the `ExploreTypes` introspection operation in `queries.graphql`. Main application types and fields:
- Playlist: id, name, songs
- Song: id, title, artist, duration
- Query: playlists, playlist, songs
- Built-in introspection types are also returned by `__schema`.
