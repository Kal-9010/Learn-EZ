// Pure presentational — used both for the owner's "preview of what recruiters
// will see" (fed from local progress) and the real public /profile/:name
// route (fed from Supabase). Renders identically either way, per the PRD.
export default function PortfolioView({
  displayName,
  overallMastery,
  topicsCompletedCount,
  totalTopicsCount,
  topicAccuracies,
  strongest,
  weakest,
  timeSpentHours,
  lastActiveLabel,
}) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-slate-100 bg-white p-5">
      <div>
        <p className="text-lg font-extrabold text-slate-900">{displayName}</p>
        <span className="mt-1 inline-block rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-600">
          ✓ Verified on L EZ
        </span>
      </div>

      <div className="flex gap-6">
        <div>
          <p className="text-2xl font-extrabold text-slate-900">{overallMastery}%</p>
          <p className="text-xs text-slate-500">Overall mastery</p>
        </div>
        <div>
          <p className="text-2xl font-extrabold text-slate-900">
            {topicsCompletedCount} <span className="text-base font-semibold text-slate-400">of {totalTopicsCount}</span>
          </p>
          <p className="text-xs text-slate-500">Topics completed</p>
        </div>
      </div>

      {topicAccuracies.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">Per-topic accuracy</p>
          <div className="flex flex-col gap-1.5">
            {topicAccuracies.map((t) => (
              <div key={t.title} className="flex justify-between text-sm text-slate-700">
                <span>{t.title}</span>
                <span className="font-semibold">{t.accuracy}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {strongest.length > 0 && (
        <div>
          <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-green-600">Strongest areas</p>
          {strongest.map((t) => (
            <p key={t.title} className="text-sm text-slate-700">
              {t.title} — {t.accuracy}%
            </p>
          ))}
        </div>
      )}

      {weakest.length > 0 && (
        <div>
          <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-amber-600">Weakest areas</p>
          {weakest.map((t) => (
            <p key={t.title} className="text-sm text-slate-700">
              {t.title} — {t.accuracy}%
            </p>
          ))}
        </div>
      )}

      <div className="flex justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
        <span>Time spent learning: {timeSpentHours}h</span>
        <span>Last active: {lastActiveLabel}</span>
      </div>
    </div>
  );
}
