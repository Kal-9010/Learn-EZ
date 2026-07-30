export default function Layer3({ layer }) {
  return (
    <>
      <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-400">{layer.sectionLabel}</p>
      <div className="mb-3 rounded-xl bg-slate-100 p-3.5 text-[13.5px] leading-relaxed text-slate-700">
        {layer.situation.emoji} {layer.situation.text}
      </div>
      <div className="mb-2.5 rounded-xl border-l-4 border-green-600 bg-green-50 p-3.5">
        <p className="mb-1 text-xs font-bold text-green-800">✅ Good PM</p>
        <p className="text-[13.5px] leading-relaxed text-green-800">{layer.goodPM.text}</p>
      </div>
      <div className="mb-3 rounded-xl border-l-4 border-red-600 bg-red-50 p-3.5">
        <p className="mb-1 text-xs font-bold text-red-800">❌ Bad PM</p>
        <p className="text-[13.5px] leading-relaxed text-red-800">{layer.badPM.text}</p>
      </div>
      <p className="mb-3.5 text-[12.5px] italic text-slate-500">{layer.interviewerNote}</p>
    </>
  );
}
