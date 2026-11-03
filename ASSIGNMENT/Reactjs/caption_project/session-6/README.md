# Session 6 — Mellow Authentication

A React + Vite music dashboard with Firebase email/password authentication,
React Context user state, persistent login, and a protected React Router route.

## Firebase setup

1. Create a Firebase project and register a web app.
2. In Firebase Console, open **Authentication → Sign-in method** and enable
   **Email/Password**.
3. Copy `.env.example` to `.env` and add the Firebase web app settings.
4. Create a test user under **Authentication → Users**.
5. Run `npm install` and `npm run dev`.

The Firebase web config is intended for client applications; secure access with
Firebase Authentication and appropriate Firebase security rules. Do not commit
the local `.env` file.

## Authentication behavior

- `AuthProvider` listens to Firebase `onAuthStateChanged` and provides `user`,
  `loading`, `signIn`, and `logout` through `useAuth()`.
- `initializeAuth()` uses `browserLocalPersistence`, so refreshes restore the
  signed-in user.
- `/dashboard` is protected and redirects signed-out visitors to `/login`.
- Successful login returns to the originally requested route when applicable.
- `LogoutButton` calls the Context logout action, signs out through Firebase,
  clears Context user state, and returns to the login route through route guards.

## Commands

```bash
npm run dev
npm run lint
npm run build
```
