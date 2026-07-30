export default function MayaMessage({ message, swipeLeftLabel, swipeRightLabel }) {
  return (
    <div className="border-t border-slate-100 px-5 pb-4 pt-2.5">
      <div className="mb-2.5 flex items-start gap-2">
        <span className="text-xl">🤖</span>
        <p className="flex-1 rounded-xl bg-slate-50 px-2.5 py-2 text-[13px] text-slate-700">{message}</p>
      </div>
      <div className="flex justify-between text-[12.5px] font-semibold text-slate-400">
        <span>← {swipeLeftLabel}</span>
        <span className="text-green-600">{swipeRightLabel} →</span>
      </div>
    </div>
  );
}
