export default function KeywordChip({ keyword, onTap }) {
  return (
    <button
      type="button"
      onClick={() => onTap(keyword)}
      className="rounded-lg bg-blue-50 px-2.5 py-1.5 text-[13px] font-bold text-blue-600"
    >
      {keyword.word}
    </button>
  );
}
