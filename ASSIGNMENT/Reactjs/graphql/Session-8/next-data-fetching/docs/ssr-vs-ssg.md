# Session 8 Q5 — SSR vs SSG

```text
SSR (getServerSideProps)
Browser requests page
       |
Server fetches fresh data for this request
       |
Server renders HTML
       |
Browser receives page

Example: recent food orders / account-specific content


SSG (getStaticProps)
Build starts
       |
Next.js fetches data at build time
       |
HTML page is generated and saved
       |
Visitors receive the prebuilt page

Example: trending editorial/movie listing
```

SSR fetches data on each request, so it can show request-time data but adds server work. SSG fetches at build time and serves a prebuilt page quickly, but the content can become stale until the next build or revalidation.
