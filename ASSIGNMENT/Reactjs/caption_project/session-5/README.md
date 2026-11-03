# Session 5 — Gather & Go Firestore App

A React + Vite community app that demonstrates Firestore playlists, restaurant
reviews with create/edit, and movie watchlists.

## Firebase setup

1. Create a Firebase project and register a web app.
2. Enable Cloud Firestore and create a database.
3. Copy `.env.example` to `.env` and fill in the Firebase web app config values.
4. Configure Firestore security rules for your intended access. Do not deploy
   permissive test rules to production.
5. Start the app with `npm run dev`.

When Firestore is connected, the app creates a sample `playlists` document once
the collection is empty. It reads `playlists`, `reviews`, and `watchlists`.
Restaurant reviews are added with `addDoc()` and edited with `updateDoc()`.
Watchlist documents may use `movieName` or `name`, and a boolean `watched` or a
`status` value of `watched` / `not watched`.

Without Firebase settings, the app displays the setup instructions and a small
sample watchlist so the interface remains previewable. Firestore writes remain
disabled until a real project configuration is provided.

## Commands

```bash
npm install
npm run dev
npm run lint
npm run build
```

## API refactor

The collection fetch uses async/await, logs the underlying Firestore error, and
throws an actionable collection-specific error for the UI to display. The same
shared `fetchCollection()` helper is used to load playlists, reviews, and
watchlists.
