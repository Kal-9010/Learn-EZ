export default function LayerProgressBar({ topicName, percent }) {
  return (
    <div className="flex items-center justify-between px-5 pt-4">
      <span className="text-[13px] font-bold text-slate-500">{topicName}</span>
      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-blue-600 transition-[width] duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
