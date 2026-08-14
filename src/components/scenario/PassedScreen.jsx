import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function PassedScreen({ topicName, accuracy, timeSpentMin, onNextTopic }) {
  useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 80,
      startVelocity: 40,
      origin: { y: 0.6 },
      colors: ['#2563eb', '#16a34a', '#f59e0b'],
    });
  }, []);

  return (
    <main className="flex h-[100dvh] flex-col items-center justify-center px-7 py-16 text-center">
      <div className="mb-3.5 text-6xl">🎉</div>
      <h2 className="mb-[18px] text-xl font-extrabold text-slate-900">{topicName} — Mastered!</h2>

      <div className="mb-[22px] flex gap-6">
        <div>
          <div className="text-xl font-extrabold text-green-600">{accuracy}%</div>
          <div className="text-[11.5px] text-slate-500">Accuracy</div>
        </div>
        <div>
          <div className="text-xl font-extrabold text-slate-900">{timeSpentMin}m</div>
          <div className="text-[11.5px] text-slate-500">Time spent</div>
        </div>
      </div>

      <div className="mb-[22px] flex items-start gap-2 rounded-xl bg-slate-50 p-3 text-left">
        <span className="text-xl">🤖</span>
        <p className="text-[13px] text-slate-700">That's exactly how to answer this in a Google interview. Well done!</p>
      </div>

      <button
        type="button"
        onClick={onNextTopic}
        className="h-[52px] w-full rounded-2xl bg-blue-600 text-[15px] font-bold text-white"
      >
        Next topic →
      </button>
    </main>
  );
}
