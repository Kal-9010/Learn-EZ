export default function Layer2({ layer }) {
  return (
    <>
      <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-400">{layer.sectionLabel}</p>
      <div className="mb-3 rounded-xl border-l-4 border-green-600 bg-green-50 p-3.5">
        <p className="mb-1 text-[13px] font-bold text-green-800">
          {layer.storyGood.emoji} {layer.storyGood.company}
        </p>
        <p className="text-[13.5px] leading-relaxed text-green-800">{layer.storyGood.body}</p>
      </div>
      <div className="mb-4 rounded-xl border-l-4 border-red-600 bg-red-50 p-3.5">
        <p className="mb-1 text-[13px] font-bold text-red-800">
          {layer.storyBad.emoji} {layer.storyBad.company}
        </p>
        <p className="text-[13.5px] leading-relaxed text-red-800">{layer.storyBad.body}</p>
      </div>
    </>
  );
}
