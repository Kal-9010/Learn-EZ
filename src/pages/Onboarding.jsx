import { Link } from 'react-router-dom';
import { Pointer } from 'lucide-react';

export default function Onboarding() {
  return (
    <main className="flex min-h-full flex-col px-6 py-16">
      <h1 className="mb-1 text-xl font-extrabold text-slate-900">How swiping works</h1>
      <p className="mb-8 text-sm text-slate-500">Watch it, then try it yourself.</p>

      <div className="relative mb-8 flex h-[220px] items-center justify-center">
        <div
          className="relative flex h-[168px] w-[240px] flex-col justify-center gap-2 rounded-2xl bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.12)]"
          style={{ animation: 'swipe-demo-card 5s ease-in-out infinite' }}
        >
          <div className="text-2xl">🧭</div>
          <p className="text-[13px] font-bold leading-snug text-slate-900">
            A vision statement is your product's north star.
          </p>

          {/* Stamps are children of the card so they ride along with its swipe motion */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-3 -top-3 -rotate-6 rounded-lg border-4 border-green-500 bg-white px-2 py-0.5 text-xs font-extrabold uppercase tracking-wide text-green-500"
            style={{ animation: 'swipe-demo-stamp-right 5s ease-in-out infinite' }}
          >
            Got it
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-3 -top-3 rotate-6 rounded-lg border-4 border-blue-500 bg-white px-2 py-0.5 text-xs font-extrabold uppercase tracking-wide text-blue-500"
            style={{ animation: 'swipe-demo-stamp-left 5s ease-in-out infinite' }}
          >
            Go deeper
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 z-20 -ml-6 -mt-6 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 shadow-lg"
          style={{ animation: 'swipe-demo-hand 5s ease-in-out infinite' }}
        >
          <Pointer size={22} className="text-white" />
        </div>
      </div>

      <div className="mb-8 flex flex-col gap-2 text-center">
        <p className="text-sm text-slate-700">
          <span className="font-bold text-green-600">Swipe right</span> when a concept clicks.{' '}
          <span className="font-bold text-blue-600">Swipe left</span> for another angle.
        </p>
        <p className="text-xs text-slate-400">Tip: tap any blue keyword for a quick definition.</p>
      </div>

      <Link
        to="/learn"
        className="mt-auto flex h-[52px] w-full items-center justify-center rounded-2xl bg-blue-600 text-[15px] font-bold text-white"
      >
        Start learning →
      </Link>
    </main>
  );
}
