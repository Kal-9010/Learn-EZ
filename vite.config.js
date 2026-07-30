import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import groqDevMiddleware from './vite-plugins/groqDevMiddleware.js'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // '' prefix loads every var from .env.local (not just VITE_-prefixed ones).
  // This only reaches process.env for our own Node-side dev middleware below —
  // it is never exposed to client code via import.meta.env.
  const env = loadEnv(mode, process.cwd(), '');
  process.env.GROQ_API_KEY = process.env.GROQ_API_KEY || env.GROQ_API_KEY;

  return {
    plugins: [react(), tailwindcss(), groqDevMiddleware()],
  };
})
