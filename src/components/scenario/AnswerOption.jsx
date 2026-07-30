const STYLES = {
  unselected: 'border-slate-200 bg-white',
  selected: 'border-blue-600 bg-blue-50',
  correct: 'border-green-600 bg-green-50',
  wrong: 'border-red-600 bg-red-50',
  'reveal-correct': 'border-green-600 bg-green-50',
};

const DOT_STYLES = {
  unselected: 'border-slate-300 bg-transparent',
  selected: 'border-blue-600 bg-blue-600',
  correct: 'border-green-600 bg-green-600',
  wrong: 'border-red-600 bg-red-600',
  'reveal-correct': 'border-green-600 bg-green-600',
};

const ICONS = { correct: '✅', wrong: '❌', 'reveal-correct': '✅' };

export default function AnswerOption({ text, state, onClick }) {
  const isLocked = state !== 'unselected' && state !== 'selected';
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-[44px] items-center gap-2.5 rounded-xl border-[1.5px] px-3.5 py-3 text-left ${STYLES[state]} ${isLocked ? 'pointer-events-none' : ''}`}
    >
      <span className={`h-[18px] w-[18px] flex-shrink-0 rounded-full border-[1.5px] ${DOT_STYLES[state]}`} />
      <span className="flex-1 text-[13.5px] text-slate-900">{text}</span>
      {ICONS[state] && <span className="text-sm">{ICONS[state]}</span>}
    </button>
  );
}
