async function postJson(path, payload) {
  let response;
  try {
    response = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error('Could not reach the AI service. Check your connection and try again.');
  }

  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(result.error || `The AI service returned an error (${response.status}).`);
  }
  return result;
}

export async function generateQuote(tone) {
  return postJson('/api/quote', { tone });
}

export async function generateResumeSummary(details) {
  return postJson('/api/resume-summary', details);
}

export async function fetchBlogSummary(prompt) {
  const result = await postJson('/api/blog-summary', { prompt });
  return result.summary;
}
