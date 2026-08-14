import { SCENARIO_SYSTEM_PROMPT, askGroq } from './groq.js';

const OUTPUT_SCHEMA_DESCRIPTION = `{
  "scenarios": [
    {
      "company": "a real, named company",
      "emoji": "one relevant emoji",
      "situation": "max 80 words, plain text only, NO markdown formatting",
      "questions": [
        {
          "q": "the question, testing reasoning not memorization",
          "options": ["option A", "option B", "option C"],
          "correct": 0,
          "explanation": "max 50 words explaining why the correct option is right"
        }
        ... exactly 2 or 3 of these
      ]
    }
    ... exactly 3 of these
  ]
}`;

function buildSystemPrompt(seedScenarios, shownSituations) {
  const seedSummary = seedScenarios
    .map((s) => `- ${s.company}: ${s.situation}`)
    .join('\n');
  return SCENARIO_SYSTEM_PROMPT.replace('{seed_scenarios}', seedSummary)
    .replace('{output_schema}', OUTPUT_SCHEMA_DESCRIPTION)
    .replace('{shown_scenario_ids}', shownSituations.length ? shownSituations.join(' | ') : 'none yet');
}

function buildUserPrompt(topic) {
  return (
    `Generate a fresh, complete test of exactly 3 scenarios for the PM concept "${topic}", ` +
    'following the seed scenarios\' style and difficulty but with new companies and situations. ' +
    'Write in plain text only — never use markdown formatting such as ** or _ anywhere. ' +
    'Respond with valid JSON only, matching the schema exactly.'
  );
}

function isValidQuestion(q) {
  return (
    q &&
    typeof q.q === 'string' &&
    Array.isArray(q.options) &&
    q.options.length === 3 &&
    q.options.every((o) => typeof o === 'string') &&
    Number.isInteger(q.correct) &&
    q.correct >= 0 &&
    q.correct < 3 &&
    typeof q.explanation === 'string'
  );
}

function isValidScenario(s) {
  return (
    s &&
    typeof s.company === 'string' &&
    typeof s.emoji === 'string' &&
    typeof s.situation === 'string' &&
    Array.isArray(s.questions) &&
    s.questions.length >= 2 &&
    s.questions.length <= 3 &&
    s.questions.every(isValidQuestion)
  );
}

function isValidBatch(data) {
  return data && Array.isArray(data.scenarios) && data.scenarios.length === 3 && data.scenarios.every(isValidScenario);
}

/**
 * Generates a full 3-scenario test batch via Groq/Llama 3 for the given
 * topic, retries once, and falls back to the topic's static seed scenarios
 * on any failure — validation is all-or-nothing (unlike freshAnalogy's
 * partial merge) since a test mixing AI and seed scenarios would desync
 * the failure-feedback flow from what was actually shown.
 */
export async function generateScenarioBatch({ topic, seedScenarios, shownSituations = [] }) {
  const systemPrompt = buildSystemPrompt(seedScenarios, shownSituations);
  const userPrompt = buildUserPrompt(topic);

  for (let attempt = 1; attempt <= 2; attempt++) {
    const result = await askGroq({ systemPrompt, userPrompt, jsonMode: true, maxTokens: 3000 });
    if (result.ok && isValidBatch(result.data)) {
      return { scenarios: result.data.scenarios, isFresh: true };
    }
  }

  console.warn('[scenarioGenerator] Groq unavailable or returned invalid content — falling back to seed scenarios');
  return { scenarios: seedScenarios, isFresh: false };
}
