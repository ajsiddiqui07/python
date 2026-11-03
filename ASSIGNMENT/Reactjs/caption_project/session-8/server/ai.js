const OPENAI_COMPLETIONS_URL = 'https://api.openai.com/v1/completions';
const HUGGING_FACE_URL = 'https://router.huggingface.co/hf-inference/models/gpt2';
const ALLOWED_TONES = new Set(['inspirational', 'funny', 'serious']);

function requireSecret(secret, name) {
  if (!secret || secret.startsWith('your-')) {
    const error = new Error(`${name} is not configured on the server.`);
    error.status = 503;
    throw error;
  }
}

async function readError(response, service) {
  const body = await response.json().catch(() => null);
  const message = body?.error?.message || body?.error || body?.message;
  if (response.status === 401 || response.status === 403) {
    return new Error(`${service} rejected the API key. Check your server .env settings.`);
  }
  if (response.status === 429) {
    return new Error(`${service} rate limit reached. Wait a moment and try again.`);
  }
  return new Error(typeof message === 'string' ? message : `${service} request failed (${response.status}).`);
}

export async function fetchQuote({ tone }, fetchImpl = fetch, env = process.env) {
  const apiKey = env.HF_TOKEN;
  requireSecret(apiKey, 'HF_TOKEN');

  const safeTone = ALLOWED_TONES.has(tone) ? tone : 'inspirational';
  const prompt = `Write one short motivational quote in a ${safeTone} tone. Return only the quote, in one sentence:`;
  const response = await fetchImpl(HUGGING_FACE_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: { max_new_tokens: 48, return_full_text: false },
      options: { wait_for_model: true },
    }),
    signal: AbortSignal.timeout(30000),
  });

  if (!response.ok) throw await readError(response, 'Hugging Face');
  const result = await response.json();
  const quote = Array.isArray(result) ? result[0]?.generated_text : result?.generated_text;
  if (typeof quote !== 'string' || !quote.trim()) {
    throw new Error('Hugging Face returned an empty quote. Please try again.');
  }
  return { quote: quote.trim(), tone: safeTone };
}

async function createCompletion(prompt, fetchImpl, env, maxTokens = 130) {
  const apiKey = env.OPENAI_API_KEY;
  requireSecret(apiKey, 'OPENAI_API_KEY');

  const response = await fetchImpl(OPENAI_COMPLETIONS_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo-instruct',
      prompt,
      max_tokens: maxTokens,
      temperature: 0.65,
    }),
    signal: AbortSignal.timeout(30000),
  });

  if (!response.ok) throw await readError(response, 'OpenAI');
  const result = await response.json();
  const text = result?.choices?.[0]?.text;
  if (typeof text !== 'string' || !text.trim()) {
    throw new Error('OpenAI returned an empty response. Please try again.');
  }
  return text.trim();
}

export async function fetchResumeSummary({ name, experience, skills }, fetchImpl = fetch, env = process.env) {
  const prompt = [
    'Write a professional resume summary in exactly two concise lines.',
    'Use only the supplied facts. Do not invent credentials or achievements.',
    `Name: ${name.trim()}`,
    `Experience: ${experience.trim()}`,
    `Skills: ${skills.trim()}`,
    'Two-line summary:',
  ].join('\n');

  const summary = await createCompletion(prompt, fetchImpl, env, 100);
  return summary.split(/\r?\n/).map((line) => line.trim()).filter(Boolean).slice(0, 2).join('\n');
}

export async function fetchBlogSummary({ prompt }, fetchImpl = fetch, env = process.env) {
  const text = await createCompletion(
    `Summarize the following blog topic in 3 concise sentences. Preserve the central idea and do not invent facts.\n\nTopic or draft:\n${prompt.trim()}\n\nSummary:`,
    fetchImpl,
    env,
    150,
  );
  return text;
}

export function validateText(value, field, maxLength) {
  if (typeof value !== 'string' || !value.trim()) {
    const error = new Error(`${field} is required.`);
    error.status = 400;
    throw error;
  }
  if (value.length > maxLength) {
    const error = new Error(`${field} must be ${maxLength} characters or fewer.`);
    error.status = 400;
    throw error;
  }
  return value.trim();
}
