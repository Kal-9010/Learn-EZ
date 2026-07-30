export default function SupportOverlay({ loading, onTryFresh, onMoveToNext }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-white px-7 py-16 text-center">
      <div className="mb-5 text-6xl">🤖</div>
      <p className="mb-8 text-[15px] leading-relaxed text-slate-700">
        This is one of the trickiest concepts in PM interviews — even senior PMs find this hard.
        <br />
        <br />
        Let's try a completely different angle.
      </p>
      <button
        type="button"
        onClick={onTryFresh}
        disabled={loading}
        className="mb-3.5 h-[52px] w-full rounded-2xl bg-blue-600 text-[15px] font-bold text-white disabled:bg-slate-300"
      >
        {loading ? 'Finding a new angle…' : 'Try a fresh explanation'}
      </button>
      <button type="button" onClick={onMoveToNext} className="text-sm font-semibold text-slate-500">
        Move to next topic
      </button>
    </div>
  );
}
