export default function Layer1({ layer }) {
  return (
    <>
      <div className="mb-3 mt-2 text-center text-5xl">{layer.emoji}</div>
      <h2 className="mb-3 text-center text-xl font-extrabold leading-snug text-slate-900">
        {layer.headline}
      </h2>
      <p className="mb-4 text-center text-sm leading-relaxed text-slate-700">{layer.explanation}</p>
    </>
  );
}
