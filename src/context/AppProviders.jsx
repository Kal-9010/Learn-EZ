import { useEffect } from 'react';
import { UserProvider } from './UserContext.jsx';
import { ProgressProvider } from './ProgressContext.jsx';
import { TopicProvider } from './TopicContext.jsx';
import { pingSupabase } from '../lib/supabase.js';

export function AppProviders({ children }) {
  useEffect(() => {
    pingSupabase();
  }, []);

  return (
    <UserProvider>
      <ProgressProvider>
        <TopicProvider>{children}</TopicProvider>
      </ProgressProvider>
    </UserProvider>
  );
}
