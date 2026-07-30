import { supabase, isSupabaseConfigured } from './supabase.js';

// Bridges ProgressContext's local shape (last_accessed as a JS ms timestamp,
// matching Date.now()) and Supabase's `timestamptz` column (ISO strings).
function rowToLocalEntry(row) {
  return {
    status: row.status,
    current_layer: row.current_layer,
    scenarios_passed: row.scenarios_passed,
    quiz_accuracy: row.quiz_accuracy,
    time_spent: row.time_spent,
    loop_count: row.loop_count,
    last_accessed: row.last_accessed ? new Date(row.last_accessed).getTime() : null,
  };
}

/**
 * All progress rows for a user, in the { [subTopicId]: entry } shape
 * ProgressContext already works with. Never throws — callers should treat a
 * failed fetch as "no server progress yet" rather than blocking the app.
 */
export async function fetchUserProgress(userId) {
  if (!isSupabaseConfigured) return { ok: false, reason: 'not_configured' };

  const { data, error } = await supabase.from('user_progress').select('*').eq('user_id', userId);
  if (error) {
    console.error('[progressSync] fetch failed:', error.message);
    return { ok: false, reason: 'error', error };
  }

  const progress = {};
  for (const row of data) {
    progress[row.sub_topic_id] = rowToLocalEntry(row);
  }
  return { ok: true, data: progress };
}

/**
 * Writes one sub-topic's progress patch through to Supabase, merged with
 * whatever's already stored server-side for that (user, sub-topic) pair.
 * Fire-and-forget from the caller's perspective — never throws.
 */
export async function upsertUserProgress(userId, subTopicId, patch) {
  if (!isSupabaseConfigured) return { ok: false, reason: 'not_configured' };

  const row = { user_id: userId, sub_topic_id: subTopicId, ...patch };
  if (typeof row.last_accessed === 'number') {
    row.last_accessed = new Date(row.last_accessed).toISOString();
  }

  const { error } = await supabase.from('user_progress').upsert(row, { onConflict: 'user_id,sub_topic_id' });
  if (error) {
    console.error('[progressSync] upsert failed:', error.message);
    return { ok: false, reason: 'error', error };
  }
  return { ok: true };
}
