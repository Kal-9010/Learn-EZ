import { askGroq } from './groq.js';

// The PRD's AI Guardrails (section 9) define system prompts for teaching
// cards and scenario generation, but not for this "3 failed scenarios"
// feedback step — even though Feature 4 requires LLM-generated feedback
// here. Authored following the same guardrail spirit (Maya persona,
// no fabrication, real-company-only) as the two prompts that do exist.
const FEEDBACK_SYSTEM_PROMPT = `You are Maya, a warm and encouraging PM mentor on the L EZ learning app,
giving feedback after a user failed all 3 test scenarios for a concept.

STRICT RULES:
1. Only discuss the concept: {topic}
2. Base your feedback ONLY on the specific wrong answers provided — never invent details not given
3. Never invent statistics or company data
4. Tone: warm, encouraging, never condescending — this is a moment to rebuild confidence, not criticize
5. Always output in this exact JSON schema: {output_schema}
6. Plain English always
7. Never reference copyrighted content directly
8. If referencing companies, only use real, named companies (Google, Meta, Amazon)
9. Ground "interviewContext" in how real PM interviews actually probe this concept`;

const OUTPUT_SCHEMA_DESCRIPTION = `{
  "wrongThinking": "max 100 words, describing the pattern across the specific wrong answers given",
  "conceptGap": "max 80 words, explaining the core concept gap in plain English",
  "interviewContext": "max 80 words, how this appears in real Google/Meta/Amazon interviews"
}`;

const FALLBACK_FEEDBACK = {
  wrongThinking:
    "Across these scenarios, the answers leaned on the more literal or short-term option rather than the one that protects the team's long-term direction — exactly the instinct interviewers probe for.",
  conceptGap:
    'Revisit how this concept is meant to guide real judgment calls under pressure, not just be recited as a definition.',
  interviewContext:
    'Google, Meta and Amazon interviewers often present a scenario like these to see whether you default to short-term thinking or protect the bigger picture.',
};

function buildUserPrompt({ topic, wrongAnswers }) {
  const details = wrongAnswers
    .map((w, i) => `${i + 1}. Question: "${w.question}" — User answered: "${w.selectedText}" — Correct answer: "${w.correctText}"`)
    .join('\n');
  return `Topic: ${topic}\n\nThe user got these questions wrong across their 3 test scenarios:\n${details}\n\nGive feedback per the schema.`;
}

function isValidFeedback(data) {
  return data && typeof data.wrongThinking === 'string' && typeof data.conceptGap === 'string' && typeof data.interviewContext === 'string';
}

/**
 * Never throws — falls back to generic-but-honest feedback per the PRD's
 * AI error-state table if Groq is unavailable or returns malformed JSON.
 */
export async function generateFailureFeedback({ topic, wrongAnswers }) {
  const systemPrompt = FEEDBACK_SYSTEM_PROMPT.replace('{topic}', topic).replace(
    '{output_schema}',
    OUTPUT_SCHEMA_DESCRIPTION
  );
  const userPrompt = buildUserPrompt({ topic, wrongAnswers });

  for (let attempt = 1; attempt <= 2; attempt++) {
    const result = await askGroq({ systemPrompt, userPrompt, jsonMode: true });
    if (result.ok && isValidFeedback(result.data)) {
      return result.data;
    }
  }

  console.warn('[scenarioFeedback] Groq unavailable or returned invalid content — using fallback feedback');
  return FALLBACK_FEEDBACK;
}
