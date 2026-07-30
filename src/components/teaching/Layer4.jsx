export default function Layer4({ layer }) {
  return (
    <>
      <p className="mb-1.5 text-center text-xs font-bold uppercase tracking-wide text-slate-400">
        {layer.sectionLabel}
      </p>
      <h2 className="mb-3.5 text-center text-lg font-extrabold text-slate-900">{layer.analogyTitle}</h2>
      {layer.levels.map((text, i) => (
        <div key={i} className="mb-2.5 flex gap-2.5">
          <span className="flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-[11px] font-bold text-white">
            {i + 1}
          </span>
          <p className="text-[13.5px] leading-relaxed text-slate-700">{text}</p>
        </div>
      ))}
      <div className="my-3 rounded-xl bg-blue-50 p-3.5">
        <p className="mb-1 text-xs font-bold text-blue-700">Interviewers often ask next:</p>
        <p className="text-[13.5px] italic text-blue-900">"{layer.followupQ}"</p>
      </div>
    </>
  );
}
