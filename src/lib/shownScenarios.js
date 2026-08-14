const STORAGE_KEY_PREFIX = 'lez_shown_scenarios_';
const MAX_ENTRIES = 15;

// Tracks previously AI-generated scenario situations per sub-topic in
// localStorage, so future generation calls can tell Groq what to avoid.
// Without this the model has no signal and keeps converging on the same
// "greedy" completion for a given topic (e.g. Airbnb pivoting to flights).
export function getShownSituations(subTopicId) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PREFIX + subTopicId);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function recordShownSituations(subTopicId, scenarios) {
  try {
    const existing = getShownSituations(subTopicId);
    const additions = scenarios.map((s) => `${s.company}: ${s.situation}`);
    const merged = [...existing, ...additions].slice(-MAX_ENTRIES);
    localStorage.setItem(STORAGE_KEY_PREFIX + subTopicId, JSON.stringify(merged));
  } catch {
    // localStorage unavailable (private browsing, quota) — safe to no-op,
    // this is a diversity nicety, not required for the app to function.
  }
}
