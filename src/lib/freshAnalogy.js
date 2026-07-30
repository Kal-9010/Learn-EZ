import { TEACHING_SYSTEM_PROMPT, askGroq } from './groq.js';

// PRD section 2 — the full approved list across both MVP modules, used to
// fill the {topic_list}/{framework_list} guardrails regardless of how much
// seed content has been authored for each one yet.
export const APPROVED_TOPICS = [
  'Product Vision Statement',
  'Three Horizons Framework',
  'SMART Objectives',
  'Ownership Spectrum',
  'Strategy to Execution Bridge',
  'OKRs',
  'Roadmap Fundamentals',
  'Requirements as Blueprints',
  'Rolling Wave Planning',
  'Roadmap Formats',
  'Swimlanes, Milestones & Dependencies',
  'Balancing Innovation vs Maintenance',
];

const OUTPUT_SCHEMA_DESCRIPTION = `{
  "emoji": "one relevant emoji",
  "headline": "max 10 words, plain text only, NO markdown formatting (no ** or _ characters)",
  "explanation": "max 50 words, plain English, zero jargon, no markdown",
  "keywords": [{ "word": "a short term or phrase", "def": "a full, informative sentence of 15-30 words explaining the term in plain English — never just a two-word phrase" }, ... exactly 3 of these],
  "mayaMessage": "one encouraging sentence from Maya, the mentor",
  "swipeLeft": "short label, 2-4 words, e.g. Not sure yet",
  "swipeRight": "short label, 2-4 words, e.g. Got it"
}`;

function buildSystemPrompt() {
  return TEACHING_SYSTEM_PROMPT.replace('{topic_list}', APPROVED_TOPICS.join(', '))
    .replace('{framework_list}', APPROVED_TOPICS.join(', '))
    .replace('{output_schema}', OUTPUT_SCHEMA_DESCRIPTION);
}

function buildUserPrompt({ topic, previousHeadlines }) {
  const avoid = previousHeadlines.length
    ? ` Do not reuse any of these previous analogies/headlines: ${previousHeadlines.join(' | ')}.`
    : '';
  return (
    `Teach the concept "${topic}" as a Layer 1 "Simple Truth" card, using a brand-new ` +
    `everyday-life analogy (cooking, travel, sports, building, restaurant, or road trip).` +
    avoid +
    ' Write in plain text only — never use markdown formatting such as ** or _ anywhere. ' +
    'Each keyword definition must be a full explanatory sentence, not a short phrase. ' +
    'Respond with valid JSON only, matching the schema exactly.'
  );
}

function isValidLayer1(data) {
  return (
    data &&
    typeof data.headline === 'string' &&
    typeof data.explanation === 'string' &&
    Array.isArray(data.keywords) &&
    data.keywords.length > 0
  );
}

/**
 * Generates a fresh Layer 1 analogy via Groq/Llama 3, retries once, and
 * falls back to the seed layer on failure — per the PRD's AI error-state
 * table (section 10): never leave the user stuck with a broken card.
 */
export async function generateFreshAnalogy({ topic, previousHeadlines = [], seedLayer1 }) {
  const systemPrompt = buildSystemPrompt();
  const userPrompt = buildUserPrompt({ topic, previousHeadlines });

  for (let attempt = 1; attempt <= 2; attempt++) {
    const result = await askGroq({ systemPrompt, userPrompt, jsonMode: true });
    if (result.ok && isValidLayer1(result.data)) {
      return { ...seedLayer1, ...result.data, isFresh: true };
    }
  }

  console.warn('[freshAnalogy] Groq unavailable or returned invalid content — falling back to seed layer');
  return { ...seedLayer1, isFresh: false };
}
