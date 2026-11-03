import assert from 'node:assert/strict';
import test from 'node:test';
import {
  fetchBlogSummary,
  fetchQuote,
  fetchResumeSummary,
  validateText,
} from '../server/ai.js';

function jsonResponse(body, { status = 200 } = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

test('quote sends the selected tone to Hugging Face and returns generated text', async () => {
  let request;
  const result = await fetchQuote(
    { tone: 'funny' },
    async (url, options) => {
      request = { url, options };
      return jsonResponse([{ generated_text: 'Keep going; even your plants are rooting for you.' }]);
    },
    { HF_TOKEN: 'test-hf-token' },
  );

  assert.equal(result.tone, 'funny');
  assert.match(result.quote, /plants are rooting/);
  assert.match(request.url, /gpt2$/);
  assert.match(JSON.parse(request.options.body).inputs, /funny tone/);
});

test('quote falls back to a safe tone for unsupported values', async () => {
  const result = await fetchQuote(
    { tone: 'untrusted' },
    async () => jsonResponse([{ generated_text: 'One step at a time.' }]),
    { HF_TOKEN: 'test-hf-token' },
  );

  assert.equal(result.tone, 'inspirational');
});

test('resume summary uses OpenAI completions endpoint and limits output to two lines', async () => {
  let request;
  const summary = await fetchResumeSummary(
    { name: 'Jordan Lee', experience: 'Five years in product design', skills: 'Research, prototyping' },
    async (url, options) => {
      request = { url, options };
      return jsonResponse({ choices: [{ text: 'Product designer with five years of experience.\nSkilled in research and prototyping.\nExtra line.' }] });
    },
    { OPENAI_API_KEY: 'test-openai-key' },
  );

  assert.match(request.url, /\/v1\/completions$/);
  assert.equal(JSON.parse(request.options.body).model, 'gpt-3.5-turbo-instruct');
  assert.equal(summary.split('\n').length, 2);
});

test('blog summary API preserves distinct user prompts', async () => {
  const prompts = [];
  const mockFetch = async (_url, options) => {
    const requestBody = JSON.parse(options.body);
    prompts.push(requestBody.prompt);
    return jsonResponse({ choices: [{ text: `Summary ${prompts.length}` }] });
  };

  const first = await fetchBlogSummary({ prompt: 'Why urban gardens help neighborhoods' }, mockFetch, { OPENAI_API_KEY: 'test-key' });
  const second = await fetchBlogSummary({ prompt: 'How sleep supports learning' }, mockFetch, { OPENAI_API_KEY: 'test-key' });

  assert.notEqual(prompts[0], prompts[1]);
  assert.match(prompts[0], /urban gardens/);
  assert.match(prompts[1], /sleep supports learning/);
  assert.equal(first, 'Summary 1');
  assert.equal(second, 'Summary 2');
});

test('missing credentials and invalid fields produce actionable errors', async () => {
  await assert.rejects(
    fetchQuote({ tone: 'serious' }, fetch, {}),
    { message: 'HF_TOKEN is not configured on the server.', status: 503 },
  );
  assert.throws(() => validateText('  ', 'Prompt', 10), { message: 'Prompt is required.', status: 400 });
  assert.throws(() => validateText('too long for limit', 'Prompt', 3), { message: 'Prompt must be 3 characters or fewer.', status: 400 });
});

test('OpenAI authorization errors are returned with a safe configuration message', async () => {
  await assert.rejects(
    fetchBlogSummary(
      { prompt: 'A short topic' },
      async () => jsonResponse({ error: { message: 'invalid key detail' } }, { status: 401 }),
      { OPENAI_API_KEY: 'test-key' },
    ),
    { message: 'OpenAI rejected the API key. Check your server .env settings.' },
  );
});
