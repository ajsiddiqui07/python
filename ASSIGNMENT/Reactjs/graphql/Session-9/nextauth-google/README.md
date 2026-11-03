# Session 9 — Google authentication with NextAuth.js

1. Run `npm install`.
2. Copy `.env.local.example` to `.env.local`.
3. Create Google OAuth credentials in Google Cloud Console. Add `http://localhost:3000/api/auth/callback/google` as an authorized redirect URI.
4. Put credentials in `.env.local`; generate a strong `NEXTAUTH_SECRET`.
5. Run `npm run dev`.

Routes: `/`, `/profile`, `/logout-example`, `/api/secret`.
The API returns 401 for unauthenticated requests. Never commit `.env.local`. This sample uses NextAuth v4 and the Next.js Pages Router.
