export default function FailedScreen({ feedback, loading, onReviewAgain, onMoveToNext }) {
  return (
    <main className="flex h-[100dvh] flex-col overflow-auto px-6 py-16">
      <h2 className="mb-3.5 text-[19px] font-extrabold text-slate-900">Let's talk about what happened.</h2>

      <div className="mb-4 flex flex-col gap-2">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="flex items-center justify-between rounded-xl border border-slate-100 bg-white px-3.5 py-2.5 text-[13.5px] text-slate-900"
          >
            <span>Scenario {n}</span>
            <span>❌</span>
          </div>
        ))}
      </div>

      {loading || !feedback ? (
        <p className="mb-4 text-sm text-slate-400">Maya's putting together feedback…</p>
      ) : (
        <>
          <p className="mb-1.5 text-[13.5px] font-bold text-slate-900">Where your thinking went wrong:</p>
          <p className="mb-3.5 text-[13px] leading-relaxed text-slate-700">{feedback.wrongThinking}</p>

          <p className="mb-1.5 text-[13.5px] font-bold text-slate-900">The concept you need:</p>
          <p className="mb-3.5 text-[13px] leading-relaxed text-slate-700">{feedback.conceptGap}</p>

          <p className="mb-1.5 text-[13.5px] font-bold text-slate-900">How this appears in real interviews:</p>
          <p className="mb-[18px] text-[13px] leading-relaxed text-slate-700">{feedback.interviewContext}</p>
        </>
      )}

      <button
        type="button"
        onClick={onReviewAgain}
        className="mb-3 h-[52px] w-full rounded-2xl bg-blue-600 text-[15px] font-bold text-white"
      >
        Review concept again
      </button>
      <button type="button" onClick={onMoveToNext} className="text-center text-sm font-semibold text-slate-500">
        Move to next topic
      </button>
    </main>
  );
}
