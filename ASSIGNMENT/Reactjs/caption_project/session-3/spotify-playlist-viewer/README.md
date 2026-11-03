# Session 3: Spotify Playlist Viewer

Created with `npx create-next-app`. The default Next.js welcome page was verified at `/` before the environment-variable exercises were added.

## Project Structure

- `src/components/index.js`: component-folder placeholder
- `src/pages/index.js`: welcome page and Spotify environment-variable log
- `src/pages/_app.js`: shared stylesheet entry
- `src/utils/api.js`: Zomato environment utility
- `src/utils/index.js`: utility exports
- `.env.local`: fake practice values; ignored by Git
- `ai_env_example.txt`: prompt and secure OpenAI/Firebase example

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). This project uses the Webpack dev server because the local Windows environment cannot load the generated Turbopack native binding. Restart the dev server after changing `.env.local`.

The page logs `NEXT_PUBLIC_SPOTIFY_API_KEY` in the browser and calls `logZomatoConfig()` from `src/utils/api.js`. These values are fake. Every `NEXT_PUBLIC_` value is exposed in browser code, so never use that prefix for a private API secret.

## Credential Safety

`ai_env_example.txt` contains placeholders only. Keep `OPENAI_API_KEY` and Firebase Admin credentials server-side, do not prefix them with `NEXT_PUBLIC_`, and never commit real credentials. Firebase web app configuration is public by design and must be protected with Firebase Security Rules.
