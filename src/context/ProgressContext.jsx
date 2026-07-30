import { createContext, useContext, useEffect, useState } from 'react';

const PROGRESS_KEY = 'lez_progress';

const ProgressContext = createContext(null);

function loadInitialProgress() {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function ProgressProvider({ children }) {
  // Keyed by sub_topic id, shape mirrors the user_progress table (PRD section 8)
  // so a future Supabase sync is a straight merge, not a reshape.
  const [progress, setProgress] = useState(loadInitialProgress);

  useEffect(() => {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  }, [progress]);

  function updateProgress(subTopicId, patch) {
    setProgress((prev) => ({
      ...prev,
      [subTopicId]: { ...prev[subTopicId], ...patch },
    }));
  }

  // Phase 2 wires this up: migrate localStorage progress into Supabase the
  // moment an anonymous user completes sign up (PRD 1.2 acceptance criteria).
  async function syncToSupabase() {
    console.info('[progress] syncToSupabase not wired yet — lands in Phase 2');
  }

  const value = { progress, updateProgress, syncToSupabase };
  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within a ProgressProvider');
  return ctx;
}
