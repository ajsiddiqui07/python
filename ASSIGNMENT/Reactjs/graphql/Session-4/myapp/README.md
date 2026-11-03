# Session 4 — Playlist mutations

## Run
1. Open this folder in VS Code.
2. Run `npm install`.
3. Terminal 1: `npm run server`
4. Terminal 2: `npm run dev`
5. Open the Vite URL shown in the terminal.

GraphQL endpoint: `http://localhost:4000/graphql`

## Questions covered
- Q1 addSong mutation with title and artist form.
- Q2 updateSong mutation; Apollo cache reflects the new title immediately.
- Q3 deleteSong mutation; backend and cache list are updated.
- Q4 optimisticResponse displays a temporary song while the request is pending.
- Q5 total count is derived from the reactive Apollo query result.

Note: data is held in server memory and resets when the backend restarts. This is an exercise backend, not production persistence.
