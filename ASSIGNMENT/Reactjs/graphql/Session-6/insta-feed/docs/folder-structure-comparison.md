# Next.js Pages Router vs Create React App

1. Next.js Pages Router uses files inside `pages/` as routes automatically; Create React App normally needs React Router or another routing library.
2. `pages/index.js` becomes `/`, while `pages/explore.js` becomes `/explore`; in CRA, routes are explicitly declared in the client router.
3. Next.js supports page-level data fetching such as `getServerSideProps` and `getStaticProps`; CRA commonly fetches data in the browser after the initial app loads.

## SSR and SEO for a food delivery app
With SSR, Next.js can send HTML containing restaurant names, menus, and location-specific content in the initial response. Search engines can read this content more easily than content that appears only after client-side JavaScript runs. This can improve discoverability for restaurant and food searches. CSR can still be indexed, but may depend more on JavaScript rendering.
