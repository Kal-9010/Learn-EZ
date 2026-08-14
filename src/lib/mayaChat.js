import { askGroq } from './groq.js';
import { APPROVED_TOPICS } from './freshAnalogy.js';

const MAYA_CHAT_SYSTEM_PROMPT = `You are Maya, a warm and encouraging PM mentor on the
L EZ learning app, now chatting directly with a learner in an open Q&A panel.

STRICT RULES:
1. Only discuss PM concepts from this approved topic list: ${APPROVED_TOPICS.join(', ')}
2. If asked about anything outside PM/product management topics, gently redirect
   back to what the learner is studying
3. Never invent statistics or company data
4. Never hallucinate — if unsure, say so plainly instead of making something up
5. Plain English always — explain jargon immediately, no markdown formatting
6. Keep answers short: 2-4 sentences, conversational, never a wall of text
7. Tone: warm, encouraging, never condescending
8. Every company example must be real and named, or clearly labeled hypothetical`;

function buildUserPrompt({ message, topicName, layerHeadline }) {
  const context = topicName
    ? `The learner is currently studying "${topicName}"${layerHeadline ? `, specifically: "${layerHeadline}"` : ''}. `
    : 'The learner has not selected a topic yet. ';
  return `${context}They just asked: "${message}"`;
}

/**
 * Free-form conversational reply from Maya — plain text, not the structured
 * JSON schema used by the teaching-card generators. Never throws; a failure
 * resolves to a graceful in-character message rather than breaking the chat.
 */
export async function askMaya({ message, topicName, layerHeadline }) {
  const result = await askGroq({
    systemPrompt: MAYA_CHAT_SYSTEM_PROMPT,
    userPrompt: buildUserPrompt({ message, topicName, layerHeadline }),
    jsonMode: false,
  });

  if (result.ok && typeof result.data === 'string' && result.data.trim()) {
    return result.data.trim();
  }

  console.warn('[mayaChat] Groq unavailable or returned an empty reply');
  return "Hmm, I'm having trouble thinking that one through right now — mind trying again in a moment?";
}
