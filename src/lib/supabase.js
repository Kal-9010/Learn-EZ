import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// The anon key is designed by Supabase to be public — it's safe to ship in the
// client bundle as long as Row Level Security policies are enabled on every
// table (see PRD section 8). It is NOT the same trust level as a secret API key.
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

if (!isSupabaseConfigured) {
  console.warn(
    '[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are not set — ' +
      'running without a database. Auth, progress sync and portfolio pages ' +
      'will fall back to local-only state until a Supabase project is connected.'
  );
}

/**
 * Lightweight reachability check, safe to call on a brand-new Supabase
 * project with no tables yet (auth.getSession() needs no schema).
 */
export async function pingSupabase() {
  if (!isSupabaseConfigured) {
    return { ok: false, reason: 'not_configured' };
  }
  try {
    const { error } = await supabase.auth.getSession();
    if (error) throw error;
    console.info('[supabase] connected');
    return { ok: true };
  } catch (error) {
    console.error('[supabase] connection check failed:', error.message);
    return { ok: false, reason: 'error', error };
  }
}
