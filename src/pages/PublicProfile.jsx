import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PortfolioView from '../components/portfolio/PortfolioView.jsx';
import { getPublicProfile } from '../lib/publicProfile.js';

export default function PublicProfile() {
  const { displayName } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getPublicProfile(displayName).then((r) => {
      if (!cancelled) setResult(r);
    });
    return () => {
      cancelled = true;
    };
  }, [displayName]);

  if (!result) {
    return (
      <main className="flex min-h-full items-center justify-center px-6 py-16">
        <p className="text-sm text-slate-400">Loading profile…</p>
      </main>
    );
  }

  if (!result.ok) {
    const messages = {
      not_configured: 'Public profiles need a connected Supabase project to work — this one isn\'t set up yet.',
      not_found: 'This profile is not available.',
      private: 'This profile is not available.',
    };
    return (
      <main className="flex min-h-full flex-col items-center justify-center px-6 py-16 text-center">
        <p className="text-sm text-slate-500">{messages[result.reason] || messages.not_found}</p>
      </main>
    );
  }

  return (
    <main className="min-h-full bg-slate-50 px-5 py-10">
      <PortfolioView {...result.data} />
    </main>
  );
}
