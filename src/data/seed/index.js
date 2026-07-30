import { PRODUCT_VISION_STATEMENT } from './productVisionStatement.js';
import { THREE_HORIZONS_FRAMEWORK } from './threeHorizonsFramework.js';
import { SMART_OBJECTIVES } from './smartObjectives.js';
import { OWNERSHIP_SPECTRUM } from './ownershipSpectrum.js';
import { STRATEGY_TO_EXECUTION_BRIDGE } from './strategyToExecutionBridge.js';
import { OKRS } from './okrs.js';
import { TOPICS_LIST } from '../topicsList.js';

// Keyed by id so Learn.jsx can look up whichever sub-topic is active instead
// of always teaching the same hardcoded one.
export const SEED_TOPICS = {
  [PRODUCT_VISION_STATEMENT.id]: PRODUCT_VISION_STATEMENT,
  [THREE_HORIZONS_FRAMEWORK.id]: THREE_HORIZONS_FRAMEWORK,
  [SMART_OBJECTIVES.id]: SMART_OBJECTIVES,
  [OWNERSHIP_SPECTRUM.id]: OWNERSHIP_SPECTRUM,
  [STRATEGY_TO_EXECUTION_BRIDGE.id]: STRATEGY_TO_EXECUTION_BRIDGE,
  [OKRS.id]: OKRS,
};

export const DEFAULT_TOPIC_ID = PRODUCT_VISION_STATEMENT.id;

/**
 * Next sub-topic (in TOPICS_LIST order) that actually has content wired up.
 * Returns null once the last content-backed topic is reached, so callers
 * can fall back to the progress page instead of looping forever.
 */
export function getNextContentTopicId(currentId) {
  const contentTopics = TOPICS_LIST.filter((t) => t.hasContent);
  const index = contentTopics.findIndex((t) => t.id === currentId);
  if (index === -1 || index + 1 >= contentTopics.length) return null;
  return contentTopics[index + 1].id;
}
