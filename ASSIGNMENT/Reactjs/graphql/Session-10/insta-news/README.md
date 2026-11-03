# Session 10 — Insta News

Run `npm install`, copy `.env.local.example` to `.env.local`, fill in Firebase web config and `OPENAI_API_KEY`, then run `npm run dev`.

Routes: `/feed`, `/about`; GraphQL API: `POST /api/graphql`; AI summary API: `POST /api/summarize`.

Firebase setup:
1. Create a Firebase project and register a web app.
2. Enable Authentication > Google provider.
3. Copy the web app config values into the `NEXT_PUBLIC_FIREBASE_*` variables.
4. Add `localhost` to Firebase Authentication authorized domains if required.

Security: Firebase web config is intended to be public; OpenAI key is server-only and must never use a `NEXT_PUBLIC_` prefix. The API uses the `graphql` package with a real schema and execution engine. It supports `posts` and `post(id)` and returns 3 static posts. It is a learning endpoint; add authentication, rate limiting, and validation before production use. The feed uses the GraphQL API and calls the server-side OpenAI route for summaries limited to 2–3 sentences.
