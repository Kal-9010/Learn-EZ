import { supabase, isSupabaseConfigured } from './supabase.js';
import { formatRelativeDate } from './formatRelativeDate.js';

/**
 * Real query against the Supabase schema in PRD section 8. Cannot be
 * exercised end-to-end until a project exists and Phase 6's tables are
 * created — until then it returns { ok: false, reason: 'not_configured' }
 * so the public route can show a clear, honest state rather than a crash.
 */
export async function getPublicProfile(displayName) {
  if (!isSupabaseConfigured) {
    return { ok: false, reason: 'not_configured' };
  }

  const { data: userRow, error: userError } = await supabase
    .from('users')
    .select('id, display_name, profile_public, last_active')
    .eq('display_name', displayName)
    .maybeSingle();

  if (userError || !userRow) {
    return { ok: false, reason: 'not_found' };
  }
  if (!userRow.profile_public) {
    return { ok: false, reason: 'private' };
  }

  const { data: progressRows, error: progressError } = await supabase
    .from('user_progress')
    .select('status, quiz_accuracy, time_spent, sub_topics(title)')
    .eq('user_id', userRow.id);

  if (progressError) {
    return { ok: false, reason: 'not_found' };
  }

  const rows = progressRows || [];
  const completed = rows.filter((r) => r.status === 'complete');
  const overallMastery = completed.length
    ? Math.round(completed.reduce((sum, r) => sum + (r.quiz_accuracy || 0), 0) / completed.length)
    : 0;
  const sortedByAccuracy = [...completed].sort((a, b) => (b.quiz_accuracy || 0) - (a.quiz_accuracy || 0));
  const timeSpentHours = Math.round((rows.reduce((sum, r) => sum + (r.time_spent || 0), 0) / 60) * 10) / 10;

  return {
    ok: true,
    data: {
      displayName: userRow.display_name,
      overallMastery,
      topicsCompletedCount: completed.length,
      totalTopicsCount: rows.length,
      topicAccuracies: completed.map((r) => ({ title: r.sub_topics?.title, accuracy: r.quiz_accuracy })),
      strongest: sortedByAccuracy.slice(0, 2).map((r) => ({ title: r.sub_topics?.title, accuracy: r.quiz_accuracy })),
      weakest: sortedByAccuracy.slice(-2).map((r) => ({ title: r.sub_topics?.title, accuracy: r.quiz_accuracy })),
      timeSpentHours,
      lastActiveLabel: formatRelativeDate(userRow.last_active ? new Date(userRow.last_active).getTime() : null),
    },
  };
}
