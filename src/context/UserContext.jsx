import { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase.js';

const ANONYMOUS_KEY = 'lez_anonymous_session';
const PROFILE_PUBLIC_KEY = 'lez_profile_public';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(true);
  // Mirrors users.profile_public (PRD section 8), which defaults to false —
  // sharing is opt-in. Persisted locally until Phase 6's schema is live.
  const [profilePublic, setProfilePublicState] = useState(
    () => localStorage.getItem(PROFILE_PUBLIC_KEY) === 'true'
  );

  useEffect(() => {
    let unsubscribe = () => {};

    async function init() {
      if (isSupabaseConfigured) {
        const { data } = await supabase.auth.getSession();
        setUser(data.session?.user ?? null);

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
          setUser(session?.user ?? null);
        });
        unsubscribe = () => listener.subscription.unsubscribe();
      } else {
        setIsAnonymous(Boolean(localStorage.getItem(ANONYMOUS_KEY)));
      }
      setLoading(false);
    }

    init();
    return () => unsubscribe();
  }, []);

  // PRD 1.2 — skipping sign up creates an anonymous session in localStorage.
  function startAnonymousSession() {
    if (!localStorage.getItem(ANONYMOUS_KEY)) {
      localStorage.setItem(ANONYMOUS_KEY, crypto.randomUUID());
    }
    setIsAnonymous(true);
  }

  async function signOut() {
    if (isSupabaseConfigured) await supabase.auth.signOut();
    localStorage.removeItem(ANONYMOUS_KEY);
    setUser(null);
    setIsAnonymous(false);
  }

  function setProfilePublic(next) {
    localStorage.setItem(PROFILE_PUBLIC_KEY, String(next));
    setProfilePublicState(next);
  }

  const displayName = user?.user_metadata?.display_name ?? null;

  const value = {
    user,
    isAnonymous,
    loading,
    displayName,
    profilePublic,
    setProfilePublic,
    startAnonymousSession,
    signOut,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within a UserProvider');
  return ctx;
}
