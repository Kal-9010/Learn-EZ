import { useEffect } from 'react';
import { UserProvider } from './UserContext.jsx';
import { ProgressProvider } from './ProgressContext.jsx';
import { TopicProvider } from './TopicContext.jsx';
import { MayaChatProvider } from './MayaChatContext.jsx';
import { pingSupabase } from '../lib/supabase.js';

export function AppProviders({ children }) {
  useEffect(() => {
    pingSupabase();
  }, []);

  return (
    <UserProvider>
      <ProgressProvider>
        <TopicProvider>
          <MayaChatProvider>{children}</MayaChatProvider>
        </TopicProvider>
      </ProgressProvider>
    </UserProvider>
  );
}
