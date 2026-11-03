# Session 9 — React Deployment Test

A minimal Vite + React static site. The homepage heading is **React Deployment
Test**. Hosting configs are provided for Firebase Hosting, Netlify, and Vercel.

## Local checks

```bash
npm install
npm run lint
npm run build
npm run preview
```

The static output is `dist/`. Firebase Hosting, Netlify, and Vercel are
configured to serve the built app and fall back to `index.html` for SPA routes.

## Firebase Hosting

1. Install the Firebase CLI: `npm install --global firebase-tools`.
2. Sign in: `firebase login`.
3. Create a Firebase project in the Firebase Console and set its ID:
   `firebase use --add` (or replace the example ID in `.firebaserc.example` and
   save it as `.firebaserc`).
4. Build and deploy: `npm run deploy:firebase`.
5. Open the Hosting URL printed by Firebase. The `hosting.public` value in
   `firebase.json` is `dist`, and the catch-all rewrite serves `/index.html`.

The `firebase init` flow is intentionally not required to generate files: this
project already includes the Hosting configuration, so Firebase CLI init can
overwrite it. If you run `firebase init hosting`, choose the existing project,
set the public directory to `dist`, configure it as a single-page app, and keep
the generated config consistent with the checked-in `firebase.json`.

## Netlify

1. Create a Netlify site or sign in with `npx netlify-cli login`.
2. From this folder, run `npx netlify-cli link` and select the site.
3. Deploy with `npm run deploy:netlify`, or connect the repository for automatic
   deploys on each push.
4. In Site configuration → Domain management, add a domain you own and follow
   the DNS instructions from Netlify.

## Vercel

Import this folder as a project in Vercel, or use `npx vercel login` and
`npx vercel --prod`. The project has a `vercel.json` build/output/fallback
configuration. Add a domain you control under Project → Settings → Domains and
complete the provider's DNS verification steps.

## CI/CD in 3–4 sentences

CI/CD means Continuous Integration and Continuous Delivery or Deployment.
Continuous Integration automatically builds and tests code changes so mistakes
are caught before merging. Continuous Delivery/Deployment automates publishing
approved changes to a hosting provider. Together, they make updates repeatable
and reduce manual release errors.

Two ways it helps future React updates:

1. Run lint, tests, and a production build on every pull request to catch
   broken changes before they reach the live app.
2. Automatically deploy merged changes, while preview deployments let you
   review a feature before promoting it to production.

## AI deployment guide prompt and response

**Prompt used:** “Give me a step-by-step guide to deploy a Vite React single-page
app to Firebase Hosting. Include build output configuration and a rewrite to
avoid 404s when users visit the root or refresh a route.”

**Generated guide:**

1. Install `firebase-tools` and run `firebase login`.
2. Create/select a Firebase project and run `firebase use --add`.
3. Run `npm run build` and confirm the output folder (Vite defaults to `dist`).
4. Configure Firebase Hosting `public` to `dist` and rewrite app routes to
   `/index.html`.
5. Run `firebase deploy --only hosting`, then open the Hosting URL and verify
   both `/` and a refreshed nested route.

**Step that needs account-specific access:** deployment cannot complete until
you sign in to a Firebase account and select a real Firebase project. No
Firebase account, Netlify site, Vercel project, or custom domain is configured
in this workspace yet. Do not claim a live URL or domain verification until
those steps succeed.

## Deployment status

- Local app, Firebase Hosting configuration, Netlify configuration, and Vercel
  configuration are prepared.
- Live hosting URL: not deployed (requires a hosting account/project).
- Custom domain: not connected (requires a domain you own and DNS access).
