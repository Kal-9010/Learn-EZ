import { useRef, useState } from 'react';
import AnswerOption from './AnswerOption.jsx';

export default function ScenarioTest({ topicName, scenarios, onAllPassed, onAllFailed }) {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [attempt, setAttempt] = useState(1);
  const [selected, setSelected] = useState(null);
  const [answerState, setAnswerState] = useState('unselected'); // unselected|selected|wrong1|correct|wrong2
  const [scenarioAnswers, setScenarioAnswers] = useState([]);
  const [scenarioResults, setScenarioResults] = useState(() => Array(scenarios.length).fill(null));
  const [transition, setTransition] = useState(null); // null|'passed'|'failed'
  const [seeWrong, setSeeWrong] = useState(false);
  const [scenarioWrongLog, setScenarioWrongLog] = useState([]);

  const startTimeRef = useRef(Date.now());
  const sessionLogRef = useRef([]); // { correct, firstAttemptCorrect, question, selectedText, correctText }

  const scenario = scenarios[scenarioIndex];
  const question = scenario.questions[questionIndex];

  function selectOption(i) {
    if (answerState === 'unselected' || answerState === 'selected') {
      setSelected(i);
      setAnswerState('selected');
    }
  }

  function submitAnswer() {
    const correct = selected === question.correct;
    if (correct) {
      sessionLogRef.current.push({
        correct: true,
        firstAttemptCorrect: attempt === 1,
        question: question.q,
        selectedText: question.options[selected],
        correctText: question.options[question.correct],
      });
      setAnswerState('correct');
      setScenarioAnswers((prev) => [...prev, true]);
    } else if (attempt === 1) {
      setAnswerState('wrong1');
      setTimeout(() => {
        setAnswerState('unselected');
        setSelected(null);
        setAttempt(2);
      }, 1300);
    } else {
      const entry = {
        correct: false,
        firstAttemptCorrect: false,
        question: question.q,
        selectedText: question.options[selected],
        correctText: question.options[question.correct],
      };
      sessionLogRef.current.push(entry);
      setScenarioWrongLog((prev) => [...prev, entry]);
      setAnswerState('wrong2');
      setScenarioAnswers((prev) => [...prev, false]);
    }
  }

  function nextQuestion() {
    const total = scenario.questions.length;
    if (questionIndex + 1 < total) {
      setQuestionIndex((q) => q + 1);
      setAttempt(1);
      setSelected(null);
      setAnswerState('unselected');
      return;
    }

    const correctCount = scenarioAnswers.filter(Boolean).length;
    const passed = correctCount >= Math.ceil(total / 2);
    const results = [...scenarioResults];
    results[scenarioIndex] = passed ? 'passed' : 'failed';
    setScenarioResults(results);
    setTransition(passed ? 'passed' : 'failed');

    setTimeout(() => {
      if (scenarioIndex + 1 < scenarios.length) {
        setScenarioIndex((s) => s + 1);
        setQuestionIndex(0);
        setAttempt(1);
        setSelected(null);
        setAnswerState('unselected');
        setScenarioAnswers([]);
        setScenarioWrongLog([]);
        setTransition(null);
        setSeeWrong(false);
      } else {
        const passedCount = results.filter((r) => r === 'passed').length;
        const timeSpentMin = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 60000));
        const log = sessionLogRef.current;
        const accuracy = log.length
          ? Math.round((log.filter((l) => l.firstAttemptCorrect).length / log.length) * 100)
          : 0;

        if (passedCount >= Math.ceil(scenarios.length / 2)) {
          onAllPassed({ accuracy, timeSpentMin, scenariosPassed: passedCount });
        } else {
          onAllFailed({ wrongAnswers: log.filter((l) => !l.correct), scenariosPassed: passedCount });
        }
      }
    }, passed ? 1500 : 2000);
  }

  const isNudge = answerState === 'wrong1';
  const isExplained = answerState === 'correct' || answerState === 'wrong2';

  return (
    <main className="relative flex h-[100dvh] flex-col overflow-hidden bg-white">
      <div className="px-5 pb-2.5 pt-16">
        <p className="mb-0.5 text-[15px] font-extrabold text-slate-900">Test: {topicName}</p>
        <p className="mb-2.5 text-xs text-slate-500">
          Scenario {scenarioIndex + 1} of {scenarios.length}
        </p>
        <div className="flex gap-1.5">
          {scenarioResults.map((r, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full ${
                r === 'passed'
                  ? 'bg-green-600'
                  : r === 'failed'
                    ? 'bg-red-600'
                    : i === scenarioIndex
                      ? 'bg-blue-600'
                      : 'bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto px-5 pb-4 pt-1.5">
        <div className="mb-2.5 flex items-center gap-2">
          <span className="text-lg">{scenario.emoji}</span>
          <span className="text-sm font-bold text-slate-900">{scenario.company}</span>
        </div>
        <div className="mb-3.5 rounded-xl bg-slate-100 p-3.5 text-[13.5px] leading-relaxed text-slate-700">
          🏢 {scenario.situation}
        </div>
        <div className="mb-3.5 h-px bg-slate-200" />
        <p className="mb-1.5 text-xs font-bold text-slate-400">
          Q{questionIndex + 1} of {scenario.questions.length}
        </p>
        <p className="mb-3.5 text-[15px] font-bold leading-snug text-slate-900">{question.q}</p>

        <div className="mb-3 flex flex-col gap-2.5">
          {question.options.map((text, i) => {
            let state = 'unselected';
            const isSel = selected === i;
            if (answerState === 'selected' && isSel) state = 'selected';
            if (answerState === 'wrong1' && isSel) state = 'wrong';
            if (answerState === 'correct' && isSel) state = 'correct';
            if (answerState === 'wrong2') {
              if (isSel) state = 'wrong';
              if (i === question.correct) state = 'reveal-correct';
            }
            return <AnswerOption key={i} text={text} state={state} onClick={() => selectOption(i)} />;
          })}
        </div>

        {isNudge && (
          <p className="mb-3 rounded-xl bg-orange-50 p-3 text-[13px] leading-relaxed text-orange-800">
            Not quite — think about what the interviewer is really testing here. One more try.
          </p>
        )}

        {isExplained && (
          <div className={`mb-3 rounded-xl p-3.5 ${answerState === 'correct' ? 'bg-green-50' : 'bg-slate-100'}`}>
            <p
              className={`text-[13px] leading-relaxed ${
                answerState === 'correct' ? 'text-green-800' : 'text-slate-700'
              }`}
            >
              {answerState === 'wrong2'
                ? `The correct answer: ${question.options[question.correct]}. ${question.explanation}`
                : question.explanation}
            </p>
          </div>
        )}
      </div>

      <div className="px-5 pb-6 pt-2.5">
        {isExplained ? (
          <button
            type="button"
            onClick={nextQuestion}
            className="h-[52px] w-full rounded-2xl bg-blue-600 text-[15px] font-bold text-white"
          >
            Next question →
          </button>
        ) : (
          <button
            type="button"
            onClick={submitAnswer}
            disabled={selected === null || answerState === 'wrong1'}
            className="h-[52px] w-full rounded-2xl bg-blue-600 text-[15px] font-bold text-white disabled:bg-slate-300"
          >
            Submit Answer
          </button>
        )}
      </div>

      {transition && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/95 px-6 text-center">
          <div className="mb-2.5 text-4xl">{transition === 'passed' ? '✅' : '❌'}</div>
          <p className="mb-1.5 text-base font-extrabold text-slate-900">
            {transition === 'passed'
              ? `Scenario ${scenarioIndex + 1} complete`
              : `Scenario ${scenarioIndex + 1} — let's keep going`}
          </p>
          {transition === 'failed' && (
            <>
              <button
                type="button"
                onClick={() => setSeeWrong((v) => !v)}
                className="text-[13px] font-semibold text-blue-600"
              >
                See what went wrong ›
              </button>
              {seeWrong && (
                <div className="mt-3 flex max-w-[320px] flex-col gap-2 text-left">
                  {scenarioWrongLog.map((w, i) => (
                    <div key={i} className="rounded-lg bg-slate-100 p-2.5 text-xs text-slate-700">
                      <p className="mb-1 font-semibold">{w.question}</p>
                      <p>
                        You said: <span className="text-red-700">{w.selectedText}</span>
                      </p>
                      <p>
                        Correct: <span className="text-green-700">{w.correctText}</span>
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </main>
  );
}
