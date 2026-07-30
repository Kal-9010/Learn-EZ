import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useUser } from './UserContext.jsx';
import { fetchUserProgress, upsertUserProgress } from '../lib/progressSync.js';

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
  const { user } = useUser();
  // Keyed by sub_topic id, shape mirrors the user_progress table (PRD section 8).
  const [progress, setProgress] = useState(loadInitialProgress);
  const syncedForUserRef = useRef(false);

  // localStorage is always kept current — the immediate, always-available
  // copy. Supabase sync below layers on top once a user is authenticated.
  useEffect(() => {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  }, [progress]);

  // On login (or a returning session), pull server progress and merge it in.
  // Local-only entries (e.g. progress built up anonymously right before
  // signing up) are pushed to Supabase instead of being silently dropped —
  // this is what makes PRD 1.2's "anonymous progress migrates on signup"
  // requirement work, using the same code path as an ordinary login.
  useEffect(() => {
    if (!user) {
      syncedForUserRef.current = false;
      return;
    }
    if (syncedForUserRef.current) return;
    syncedForUserRef.current = true;

    (async () => {
      const remote = await fetchUserProgress(user.id);
      const remoteData = remote.ok ? remote.data : {};
      const localSnapshot = loadInitialProgress();

      setProgress({ ...localSnapshot, ...remoteData });

      for (const [subTopicId, entry] of Object.entries(localSnapshot)) {
        if (!remoteData[subTopicId]) {
          upsertUserProgress(user.id, subTopicId, entry);
        }
      }
    })();
  }, [user]);

  function updateProgress(subTopicId, patch) {
    setProgress((prev) => ({
      ...prev,
      [subTopicId]: { ...prev[subTopicId], ...patch },
    }));

    if (user) {
      upsertUserProgress(user.id, subTopicId, patch);
    }
  }

  const value = { progress, updateProgress };
  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within a ProgressProvider');
  return ctx;
}
