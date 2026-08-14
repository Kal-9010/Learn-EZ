import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Matches PRD Feature 2 / User Story 2.1's swipe-tutorial screen — the one
// piece of Onboarding that's actually load-bearing (everything else there
// was just a stub before this).
const GUIDE_ITEMS = [
  {
    emoji: '👉',
    animate: { x: [0, 14, 0], rotate: [0, 4, 0] },
    title: 'Got it → move forward',
    body: 'Swipe right when a concept clicks.',
  },
  {
    emoji: '👈',
    animate: { x: [0, -14, 0], rotate: [0, -4, 0] },
    title: 'Not sure ← go deeper',
    body: 'Swipe left for another angle.',
  },
  {
    emoji: '☝️',
    animate: { scale: [1, 0.92, 1] },
    title: 'Tap words for definitions',
    body: 'Blue keywords open a quick tooltip.',
  },
];

export default function Onboarding() {
  return (
    <main className="flex min-h-full flex-col px-6 py-16">
      <h1 className="mb-1 text-xl font-extrabold text-slate-900">How swiping works</h1>
      <p className="mb-7 text-sm text-slate-500">Three gestures are all you need.</p>

      <div className="flex flex-col gap-3">
        {GUIDE_ITEMS.map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-3.5 rounded-2xl bg-white p-4 shadow-[0_6px_20px_rgba(15,23,42,0.08)]"
          >
            <motion.div
              animate={item.animate}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="text-3xl"
            >
              {item.emoji}
            </motion.div>
            <div>
              <p className="text-sm font-bold text-slate-900">{item.title}</p>
              <p className="text-xs text-slate-500">{item.body}</p>
            </div>
          </div>
        ))}
      </div>

      <Link
        to="/learn"
        className="mt-8 flex h-[52px] w-full items-center justify-center rounded-2xl bg-blue-600 text-[15px] font-bold text-white"
      >
        Start learning →
      </Link>
    </main>
  );
}
