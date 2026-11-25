# FeeTracker

FeeTracker is a React and Firebase application for creating and tracking personal fee records. Email/password authentication and Firestore keep every user's records private.

## Live URL

Not yet deployed. Add the Firebase Hosting or Netlify live URL here after deployment.

## Features

- Firebase Email/Password authentication
- Firestore-backed, per-user fee records
- Loading, error, and empty states
- Redux Toolkit loading and saving state
- Paid/pending status tracking
- Pending fee total calculation
- Optimized `FeeRow` rendering with `React.memo`, `useCallback`, and `useMemo`
- Responsive layout

## Setup

1. Install Node.js 18 or newer.
2. Open this project folder in the terminal.
3. Run `npm install`.
4. Create a Firebase project and add a Web app.
5. Copy `.env.example` to `.env.local`.
6. Add the Firebase Web app values to `.env.local`.
7. Enable Email/Password in Firebase Authentication.
8. Create a Firestore database.
9. Run `npm run dev`.

## Environment variables

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

Do not commit `.env.local` or place private service-account credentials in a frontend environment file.

## Firestore rules

Use rules that allow a signed-in user to access only their own fee documents:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/fees/{feeId} {
      allow read, create, update, delete: if request.auth != null
        && request.auth.uid == userId;
    }
  }
}
```

## Deployment

### Netlify

1. Push this folder to GitHub.
2. Add a Netlify site from the repository.
3. Set the build command to `npm run build`.
4. Set the publish directory to `dist`.
5. Add all environment variable names and their values in Netlify site settings.
6. Deploy the site.
7. Add the deployed domain to Firebase Authentication authorized domains.

The `public/_redirects` file contains the SPA rewrite `/* /index.html 200`.

### Firebase Hosting

1. Run `npm run build`.
2. Install and log in to the Firebase CLI.
3. Run `firebase init hosting`.
4. Select `dist` as the public directory and configure it as a single-page app.
5. Run `firebase deploy --only hosting`.

## Folder structure

```text
fee-tracker/
  public/
    _redirects
  src/
    components/
      AuthScreen.jsx
      FeeRow.jsx
      FeeTable.jsx
    store/
      feesSlice.js
      store.js
    App.jsx
    firebase.js
    main.jsx
    styles.css
  .env.example
  .gitignore
  index.html
  netlify.toml
  package.json
  README.md
```
