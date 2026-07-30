import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext.jsx';
import { useUser } from '../context/UserContext.jsx';
import { TOPICS_LIST } from '../data/topicsList.js';
import PortfolioView from '../components/portfolio/PortfolioView.jsx';

const STATUS_META = {
  complete: { icon: '✅', color: 'text-green-600' },
  needs_review: { icon: '⚠️', color: 'text-amber-600' },
  in_progress: { icon: '⏳', color: 'text-blue-600' },
  not_started: { icon: '🔒', color: 'text-slate-400' },
};

function detailText(status, entry) {
  if (status === 'complete') return `${entry.quiz_accuracy ?? 0}%`;
  if (status === 'needs_review') return 'Needs review';
  if (status === 'in_progress') return `Layer ${entry.current_layer || 1} of 4`;
  return 'Not started';
}

// Computed locally from the current browser's own progress — used for the
// owner's "preview of what recruiters will see" so it's instant, no backend
// round trip needed. The real public route (PublicProfile.jsx) queries
// Supabase instead, for strangers who don't have this data in their browser.
function computeLocalPortfolio(progress, displayName) {
  const completed = TOPICS_LIST.filter((t) => progress[t.id]?.status === 'complete');
  const overallMastery = completed.length
    ? Math.round(completed.reduce((sum, t) => sum + (progress[t.id].quiz_accuracy || 0), 0) / completed.length)
    : 0;
  const topicAccuracies = completed.map((t) => ({ title: t.title, accuracy: progress[t.id].quiz_accuracy || 0 }));
  const sorted = [...topicAccuracies].sort((a, b) => b.accuracy - a.accuracy);
  const timeSpentMinutes = TOPICS_LIST.reduce((sum, t) => sum + (progress[t.id]?.time_spent || 0), 0);

  return {
    displayName: displayName || 'You',
    overallMastery,
    topicsCompletedCount: completed.length,
    totalTopicsCount: TOPICS_LIST.length,
    topicAccuracies,
    strongest: sorted.slice(0, 2),
    weakest: sorted.slice(-2),
    timeSpentHours: Math.round((timeSpentMinutes / 60) * 10) / 10,
    lastActiveLabel: 'Just now',
  };
}

export default function Progress() {
  const { progress } = useProgress();
  const { isAnonymous, displayName, profilePublic, setProfilePublic } = useUser();
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);

  const completedEntries = TOPICS_LIST.filter((t) => progress[t.id]?.status === 'complete');
  const overallMastery = completedEntries.length
    ? Math.round(
        completedEntries.reduce((sum, t) => sum + (progress[t.id].quiz_accuracy || 0), 0) / completedEntries.length
      )
    : 0;

  const profileUrl = `${window.location.origin}/profile/${displayName || ''}`;

  function copyLink() {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <main className="min-h-full px-5 pb-24 pt-16">
      <div className="mb-1 text-xs font-semibold text-slate-500">Overall mastery</div>
      <div className="mb-6 text-4xl font-extrabold text-slate-900">{overallMastery}%</div>

      <div className="mb-6 flex flex-col gap-2">
        {TOPICS_LIST.map((topic) => {
          const entry = progress[topic.id] || {};
          const status = entry.status || 'not_started';
          const meta = STATUS_META[status];
          return (
            <Link
              key={topic.id}
              to={`/progress/${topic.id}`}
              className="flex items-center gap-3 rounded-xl bg-white p-3.5 shadow-sm shadow-slate-200"
            >
              <span className="text-lg">{meta.icon}</span>
              <div className="flex-1">
                <p className="text-[13.5px] font-bold text-slate-900">{topic.title}</p>
                <p className={`text-xs font-semibold ${meta.color}`}>{detailText(status, entry)}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => setShowShare((v) => !v)}
        className="mb-4 rounded-xl bg-blue-50 px-3.5 py-2.5 text-sm font-bold text-blue-600"
      >
        Share profile
      </button>

      {showShare && (
        <div className="flex flex-col gap-4">
          {isAnonymous || !displayName ? (
            <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
              Create a free account to share your progress.{' '}
              <Link to="/" className="font-semibold text-blue-600 underline">
                Sign up
              </Link>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3.5">
                <div>
                  <p className="text-xs text-slate-500">Profile visibility</p>
                  <p className="text-sm font-semibold text-slate-900">{profilePublic ? 'Public' : 'Private'}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setProfilePublic(!profilePublic)}
                  className={`h-7 w-12 rounded-full transition-colors ${profilePublic ? 'bg-blue-600' : 'bg-slate-300'}`}
                >
                  <span
                    className={`block h-6 w-6 rounded-full bg-white transition-transform ${
                      profilePublic ? 'translate-x-[22px]' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              {profilePublic ? (
                <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3.5">
                  <p className="flex-1 truncate text-xs text-slate-600">{profileUrl}</p>
                  <button type="button" onClick={copyLink} className="text-xs font-bold text-blue-600">
                    {copied ? 'Copied ✓' : 'Copy link'}
                  </button>
                </div>
              ) : (
                <p className="text-xs text-slate-400">Turn this on to get a shareable link.</p>
              )}

              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">
                  Preview of what recruiters will see
                </p>
                <PortfolioView {...computeLocalPortfolio(progress, displayName)} />
              </div>
            </>
          )}
        </div>
      )}
    </main>
  );
}
