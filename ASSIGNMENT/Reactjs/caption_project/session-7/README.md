# Session 7 — Kindred AI Writing Studio

A React app with a Hugging Face motivational quote generator, prompt tone
selection, a two-line resume summary form, and an OpenAI blog summary form.

## Keep API keys private

The browser calls this app's `/api` endpoints. The server calls Hugging Face and
OpenAI using keys from its environment; provider keys are never sent to or
bundled into browser JavaScript.

1. Copy `.env.example` to `.env`.
2. Set `OPENAI_API_KEY` and `HF_TOKEN` to your own provider keys.
3. Run `npm install` and `npm run dev`.

The Hugging Face integration uses the `gpt2` text-generation model via
`router.huggingface.co/hf-inference/models/gpt2`. The OpenAI resume and blog
summary calls use the `/v1/completions` endpoint with
`gpt-3.5-turbo-instruct`, as required. Provider access and model availability
depend on your account and current provider policies.

## Features

- `AiQuoteGenerator` lets users choose an inspirational, funny, or serious tone.
- `ResumeSummaryForm` requests a two-line summary, shows a loading spinner, and
  reports network, configuration, and provider errors.
- `fetchBlogSummary(prompt)` calls the OpenAI API through the server route. Its
  behavior is covered by tests using two distinct sample prompts.
- Server routes validate input and enforce request-size limits before calling
  provider APIs.

## Commands

```bash
npm run dev
npm run lint
npm test
npm run build
npm start
```

For production, build the frontend and run `npm start` with the server-side
environment variables configured. Before exposing the API publicly, add
appropriate authentication and rate limiting to protect provider quota.
