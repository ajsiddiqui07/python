# ScreenList — Movie Watchlist

A responsive React + Vite movie watchlist app using Firebase Authentication and Cloud Firestore. It supports creating, editing, marking watched/unwatched, and deleting personal movie entries.

## Features

- Email/password sign-up and sign-in with Firebase Authentication
- Per-user movie data in Cloud Firestore
- Add, edit, mark watched/unwatched, and delete movies
- Search and status filtering
- Responsive layout for desktop and mobile
- Lazy-loaded watchlist screen using `React.lazy()` and `Suspense`
- Vite production build and Netlify SPA rewrite configuration

## Requirements

- Node.js 18+ (Node.js 20 LTS recommended)
- A Firebase project
- VS Code (recommended)

## 1. Install and run locally

1. Extract the ZIP and open the `movie-watchlist` folder in VS Code.
2. Open the VS Code terminal in that folder.
3. Run:

   ```bash
   npm install
   ```

4. In Firebase Console, create a project and add a **Web app**.
5. Copy `.env.example` to `.env.local` and fill in the values from Firebase project settings:

   ```env
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   ```

6. In Firebase Console > Authentication > Sign-in method, enable **Email/Password**.
7. In Firebase Console > Firestore Database, create a database.
8. Start the app:

   ```bash
   npm run dev
   ```

9. Open the local URL printed by Vite (usually `http://localhost:5173`).

## 2. Firestore security rules

In Firebase Console > Firestore Database > Rules, use the following starter rules. These ensure signed-in users can access only their own documents:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/movies/{movieId} {
      allow read, create, update, delete: if request.auth != null
        && request.auth.uid == userId;
    }
  }
}
```

Publish the rules. Do not use open/test-mode rules for a deployed app.

## 3. Build and test production bundle

```bash
npm run build
npm run preview
```

The production output is in `dist/`. The watchlist screen is a separate lazy-loaded chunk; inspect `dist/assets` after building. Actual chunk sizes depend on installed dependency versions.

## 4. Deploy to Netlify

1. Push this folder to a GitHub repository (do not commit `.env.local`).
2. In Netlify, choose **Add new site > Import an existing project** and connect the repository.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add the six `VITE_FIREBASE_*` environment variables in Netlify site settings.
6. Trigger a deploy and open the generated site URL.
7. Test sign-up/sign-in, add/edit/delete, watched status, search, and mobile layout on the live site.

`netlify.toml` includes the SPA rewrite required for client-side routing. This app uses a single route today, but the rewrite is useful as the project grows.

## 5. Deployment to Firebase Hosting (alternative)

Install and sign in to the Firebase CLI, then from the project folder:

```bash
npm install
npm run build
npx firebase-tools login
npx firebase-tools init hosting
```

Choose the existing Firebase project, set the public directory to `dist`, and configure it as a single-page app when prompted. Then deploy:

```bash
npx firebase-tools deploy --only hosting
```

If you use Firebase Hosting, add the same `VITE_FIREBASE_*` variables to your local `.env.local` before building. Vite embeds these public client configuration values into the frontend bundle, so they are not server-side secrets. Never place service-account private keys in frontend environment variables.

## 6. Performance check

In Chrome:
1. Open the deployed site.
2. Press `F12` > **Network**.
3. Select **Disable cache**, reload, and inspect transferred resource sizes and load time.
4. Open **Performance** and record a reload trace.
5. Run Lighthouse from the DevTools Lighthouse panel if available.
6. In the build output, compare JavaScript files under `dist/assets/`. The watchlist UI is lazy-loaded; Firebase and shared dependencies may still contribute to the initial bundle.

Record real measurements from your browser in your assignment; don't assume a load time or bundle size without testing.

## Notes

- Firebase web config values are intended for client-side use, but Firestore Security Rules are essential.
- This ZIP does not create a Firebase project or deploy the site to your account automatically. You must configure Firebase and publish it using your own account.
