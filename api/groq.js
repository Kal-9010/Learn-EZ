import { handleGroqRequest } from '../src/server/groqHandler.js';

// Vercel serverless function (Node runtime). Runs server-side only — this is
// the one place GROQ_API_KEY is ever read, so it never ships to the browser.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'method_not_allowed' });
    return;
  }

  const { systemPrompt, userPrompt, jsonMode, maxTokens, temperature } = req.body || {};
  const result = await handleGroqRequest({ systemPrompt, userPrompt, jsonMode, maxTokens, temperature });
  res.status(result.ok ? 200 : 502).json(result);
}
