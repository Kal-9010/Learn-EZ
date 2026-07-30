export default function KeywordTooltip({ keyword, onDismiss }) {
  return (
    <div
      onClick={onDismiss}
      className="absolute inset-0 z-30 flex items-end justify-center bg-slate-900/35 px-5 pb-32"
    >
      <div className="max-w-[300px] rounded-2xl bg-slate-900 px-4 py-3.5 text-white">
        <p className="mb-1 text-[13px] font-bold text-blue-300">{keyword.word}</p>
        <p className="text-[13px] leading-relaxed">{keyword.def}</p>
      </div>
    </div>
  );
}
