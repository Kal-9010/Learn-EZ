import { handleGroqRequest } from '../src/server/groqHandler.js';

// Mirrors api/groq.js so `npm run dev` behaves the same as the deployed
// Vercel serverless function, without needing the Vercel CLI locally.
export default function groqDevMiddleware() {
  return {
    name: 'groq-dev-middleware',
    configureServer(server) {
      server.middlewares.use('/api/groq', (req, res, next) => {
        if (req.method !== 'POST') {
          next();
          return;
        }

        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });
        req.on('end', async () => {
          res.setHeader('Content-Type', 'application/json');
          try {
            const { systemPrompt, userPrompt, jsonMode, maxTokens, temperature } = body ? JSON.parse(body) : {};
            const result = await handleGroqRequest({ systemPrompt, userPrompt, jsonMode, maxTokens, temperature });
            res.statusCode = result.ok ? 200 : 502;
            res.end(JSON.stringify(result));
          } catch {
            res.statusCode = 400;
            res.end(JSON.stringify({ ok: false, error: 'invalid_request' }));
          }
        });
      });
    },
  };
}
