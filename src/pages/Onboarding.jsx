import { Link } from 'react-router-dom';

export default function Onboarding() {
  return (
    <main className="flex min-h-full flex-col items-center justify-center gap-4 px-7 py-16 text-center">
      <p className="text-sm text-slate-400">Onboarding screens — not yet in the phase plan, flagged separately.</p>
      <Link to="/learn" className="text-sm font-semibold text-blue-600 underline">
        Start learning →
      </Link>
    </main>
  );
}
