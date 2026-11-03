import { useEffect } from "react";
import Head from "next/head";
import { logZomatoConfig } from "../utils/api";

export default function Home() {
  useEffect(() => {
    console.log("Spotify API key:", process.env.NEXT_PUBLIC_SPOTIFY_API_KEY);
    logZomatoConfig();
  }, []);

  return (
    <>
      <Head>
        <title>Spotify Playlist Viewer</title>
        <meta name="description" content="Next.js environment variable setup exercise" />
      </Head>
      <main className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 px-6 py-16 font-sans text-zinc-950 dark:bg-black dark:text-zinc-50">
        <div className="w-full max-w-3xl rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">Spotify Playlist Viewer</p>
          <h1 className="max-w-xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">Welcome to Next.js</h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            The starter app is ready. This page also reads the practice Spotify and Zomato environment values; check the browser console to see the demo output.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <section className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
              <h2 className="text-sm font-semibold">Spotify setup</h2>
              <p className="mt-2 text-xs leading-5 text-zinc-500">NEXT_PUBLIC_SPOTIFY_API_KEY is logged in the browser for this exercise.</p>
            </section>
            <section className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
              <h2 className="text-sm font-semibold">Zomato API config</h2>
              <p className="mt-2 text-xs leading-5 text-zinc-500">The utility reads the demo API key and URL from the environment.</p>
            </section>
          </div>
          <p className="mt-6 border-t border-zinc-200 pt-4 text-xs leading-5 text-amber-800 dark:border-zinc-800 dark:text-amber-300">
            Demo values only. NEXT_PUBLIC variables are bundled into the browser and must never contain private secrets.
          </p>
        </div>
      </main>
    </>
  );
}