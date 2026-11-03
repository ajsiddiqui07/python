import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  fetchBlogSummary,
  fetchQuote,
  fetchResumeSummary,
  validateText,
} from './ai.js';

const app = express();
const port = Number(process.env.PORT) || 8787;
const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectDirectory = path.resolve(currentDirectory, '..');

app.disable('x-powered-by');
app.use(express.json({ limit: '20kb' }));

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.post('/api/quote', async (request, response) => {
  try {
    const tone = typeof request.body?.tone === 'string' ? request.body.tone : 'inspirational';
    response.json(await fetchQuote({ tone }));
  } catch (error) {
    console.error('Quote generation failed:', error);
    response.status(error.status || 502).json({ error: error.message || 'Quote generation failed.' });
  }
});

app.post('/api/resume-summary', async (request, response) => {
  try {
    const details = {
      name: validateText(request.body?.name, 'Name', 100),
      experience: validateText(request.body?.experience, 'Experience', 1200),
      skills: validateText(request.body?.skills, 'Skills', 600),
    };
    response.json({ summary: await fetchResumeSummary(details) });
  } catch (error) {
    console.error('Resume summary generation failed:', error);
    response.status(error.status || 502).json({ error: error.message || 'Resume summary generation failed.' });
  }
});

app.post('/api/blog-summary', async (request, response) => {
  try {
    const prompt = validateText(request.body?.prompt, 'Prompt', 3000);
    response.json({ summary: await fetchBlogSummary({ prompt }) });
  } catch (error) {
    console.error('Blog summary generation failed:', error);
    response.status(error.status || 502).json({ error: error.message || 'Blog summary generation failed.' });
  }
});

if (process.env.NODE_ENV === 'production') {
  const distDirectory = path.join(projectDirectory, 'dist');
  app.use(express.static(distDirectory));
  app.get('*path', (_request, response) => {
    response.sendFile(path.join(distDirectory, 'index.html'));
  });
}

app.use((error, _request, response, next) => {
  if (response.headersSent) return next(error);
  if (error instanceof SyntaxError && 'body' in error) {
    return response.status(400).json({ error: 'Request body must be valid JSON.' });
  }
  if (error.type === 'entity.too.large') {
    return response.status(413).json({ error: 'Request body is too large.' });
  }

  console.error('Unhandled API error:', error);
  return response.status(500).json({ error: 'An unexpected server error occurred.' });
});

app.listen(port, () => {
  console.log(`AI writing API listening on http://localhost:${port}`);
});
