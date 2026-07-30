import { Link, useNavigate, useParams } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext.jsx';
import { useCurrentTopic } from '../context/TopicContext.jsx';
import { TOPICS_LIST } from '../data/topicsList.js';
import { formatRelativeDate } from '../lib/formatRelativeDate.js';

const STATUS_META = {
  complete: { icon: '✅', label: 'Complete' },
  needs_review: { icon: '⚠️', label: 'Needs review' },
  in_progress: { icon: '⏳', label: 'In progress' },
  not_started: { icon: '🔒', label: 'Not started' },
};

export default function SubTopicDetail() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const { progress } = useProgress();
  const { setCurrentSubTopicId } = useCurrentTopic();

  const topic = TOPICS_LIST.find((t) => t.id === topicId);

  if (!topic) {
    return (
      <main className="flex min-h-full flex-col items-center justify-center gap-3 px-6 py-16 text-center">
        <p className="text-sm text-slate-400">Topic not found.</p>
        <Link to="/progress" className="text-sm font-semibold text-blue-600">
          ← Back to progress
        </Link>
      </main>
    );
  }

  const entry = progress[topic.id] || {};
  const status = entry.status || 'not_started';
  const meta = STATUS_META[status];
  const layersCompleted = status === 'complete' ? 4 : status === 'not_started' ? 0 : Math.max(0, (entry.current_layer || 1) - 1);
  const scenariosPassed = entry.scenarios_passed ?? 0;

  return (
    <main className="flex min-h-full flex-col px-6 py-16">
      <Link to="/progress" className="mb-6 text-sm font-semibold text-slate-500">
        ← Back to progress
      </Link>

      <h1 className="mb-1 text-xl font-extrabold text-slate-900">{topic.title}</h1>
      <p className="mb-6 text-sm font-semibold text-slate-500">
        {meta.icon} {meta.label}
      </p>

      <div className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-4">
        <Row label="Quiz accuracy" value={`${entry.quiz_accuracy ?? 0}%`} />
        <Row label="Layers completed" value={`${layersCompleted} of 4`} />
        <Row label="Scenarios passed" value={`${scenariosPassed} of 3`} />
        <Row label="Time spent" value={`${entry.time_spent ?? 0} mins`} />
        <Row label="Last accessed" value={formatRelativeDate(entry.last_accessed)} />
      </div>

      {topic.hasContent && (
        <button
          type="button"
          onClick={() => {
            setCurrentSubTopicId(topic.id);
            navigate('/learn');
          }}
          className="mt-6 h-[52px] w-full rounded-2xl bg-blue-600 text-[15px] font-bold text-white"
        >
          {status === 'not_started' ? 'Start learning →' : 'Continue learning →'}
        </button>
      )}
    </main>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between border-b border-slate-50 pb-3 text-sm last:border-0 last:pb-0">
      <span className="text-slate-500">{label}</span>
      <span className="font-semibold text-slate-900">{value}</span>
    </div>
  );
}
