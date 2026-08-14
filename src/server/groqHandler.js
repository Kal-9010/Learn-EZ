import Groq from 'groq-sdk';

// Server-only — deliberately NOT prefixed with VITE_ so Vite never bundles
// it into client JS. Read from process.env in both the Vercel serverless
// function and the local Vite dev middleware (see vite-plugins/groqDevMiddleware.js).
//
// process.env.GROQ_API_KEY is read lazily (inside functions, not as a
// module-level const) because in the Vite dev middleware it's only set once
// vite.config.js's defineConfig factory runs — which happens AFTER this
// module's own top-level statements are evaluated during import resolution.
const DEFAULT_MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

export function isGroqConfigured() {
  return Boolean(process.env.GROQ_API_KEY);
}

let client = null;
let clientKey = null;
function getClient() {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return null;
  if (!client || clientKey !== apiKey) {
    client = new Groq({ apiKey, timeout: 10_000 });
    clientKey = apiKey;
  }
  return client;
}

/**
 * Runs one guarded chat completion against Groq/Llama 3. Never throws —
 * callers get a normalized { ok, data | error } result so they can fall
 * back to seed content per the PRD's AI error-state table (section 10).
 */
export async function handleGroqRequest({ systemPrompt, userPrompt, jsonMode = true, maxTokens = 1024 }) {
  const groq = getClient();
  if (!groq) {
    return { ok: false, error: 'groq_not_configured' };
  }
  if (!systemPrompt || !userPrompt) {
    return { ok: false, error: 'missing_prompt' };
  }

  try {
    const completion = await groq.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: maxTokens,
      ...(jsonMode ? { response_format: { type: 'json_object' } } : {}),
    });

    const content = completion.choices?.[0]?.message?.content;
    if (!content) return { ok: false, error: 'empty_response' };
    if (!jsonMode) return { ok: true, data: content };

    try {
      return { ok: true, data: JSON.parse(content) };
    } catch {
      return { ok: false, error: 'invalid_json' };
    }
  } catch (error) {
    console.error('[groq] request failed:', error.message);
    return { ok: false, error: 'request_failed' };
  }
}
