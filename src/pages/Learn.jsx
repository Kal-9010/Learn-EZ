import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary.jsx';
import TeachingCard from '../components/teaching/TeachingCard.jsx';
import SupportOverlay from '../components/teaching/SupportOverlay.jsx';
import ScenarioTest from '../components/scenario/ScenarioTest.jsx';
import PassedScreen from '../components/scenario/PassedScreen.jsx';
import FailedScreen from '../components/scenario/FailedScreen.jsx';
import { useCurrentTopic } from '../context/TopicContext.jsx';
import { useProgress } from '../context/ProgressContext.jsx';
import { generateFreshAnalogy } from '../lib/freshAnalogy.js';
import { generateFailureFeedback } from '../lib/scenarioFeedback.js';
import { SEED_TOPICS, DEFAULT_TOPIC_ID, getNextContentTopicId } from '../data/seed/index.js';

export default function Learn() {
  const navigate = useNavigate();
  const { currentSubTopicId, setCurrentSubTopicId, currentLayerIndex, setCurrentLayerIndex } = useCurrentTopic();
  const { progress, updateProgress } = useProgress();

  const [mode, setMode] = useState('layer'); // 'layer' | 'support' | 'scenario' | 'passed' | 'failed'
  const [freshLayer1, setFreshLayer1] = useState(null);
  const [freshVersion, setFreshVersion] = useState(0);
  const [previousHeadlines, setPreviousHeadlines] = useState([]);
  const [loadingFresh, setLoadingFresh] = useState(false);

  const [passedResult, setPassedResult] = useState({ accuracy: 0, timeSpentMin: 0, scenariosPassed: 0 });
  const [failedFeedback, setFailedFeedback] = useState(null);
  const [loadingFeedback, setLoadingFeedback] = useState(false);

  // Onboarding's topic-selection screen isn't built yet (flagged before Phase 3)
  // — default to a seed sub-topic so /learn works standalone.
  useEffect(() => {
    if (!currentSubTopicId) setCurrentSubTopicId(DEFAULT_TOPIC_ID);
  }, [currentSubTopicId, setCurrentSubTopicId]);

  const subTopic = SEED_TOPICS[currentSubTopicId] || SEED_TOPICS[DEFAULT_TOPIC_ID];

  // Resets local teaching/scenario state whenever the active sub-topic
  // changes, and seeds its first progress entry. Without this, switching to
  // a different topic (e.g. via SubTopicDetail's "Continue learning") would
  // resume mid-layer or mid-scenario from whatever the previous topic's
  // state happened to be, or skip re-initializing progress for it.
  useEffect(() => {
    setMode('layer');
    setFreshLayer1(null);
    setFreshVersion(0);
    setPreviousHeadlines([]);
    setCurrentLayerIndex(1);

    if (!progress[subTopic.id]) {
      updateProgress(subTopic.id, { status: 'in_progress', current_layer: 1, last_accessed: Date.now() });
    }
    // Deliberately keyed only on the topic id — progress/updateProgress are
    // stable-enough context values and including them would re-run this on
    // every progress update, not just on an actual topic switch.
  }, [subTopic.id]);

  const seedLayer1 = subTopic.layers[0];
  const activeLayer =
    currentLayerIndex === 1 && freshLayer1 ? freshLayer1 : subTopic.layers[currentLayerIndex - 1];

  function goToNextTopicOrProgress() {
    const nextId = getNextContentTopicId(subTopic.id);
    if (nextId) {
      setCurrentSubTopicId(nextId);
    } else {
      navigate('/progress');
    }
  }

  function handleSwipeLeft() {
    if (currentLayerIndex < 4) {
      const next = currentLayerIndex + 1;
      setCurrentLayerIndex(next);
      updateProgress(subTopic.id, { current_layer: next, last_accessed: Date.now() });
    } else {
      setMode('support');
    }
  }

  function handleSwipeRight() {
    setMode('scenario');
  }

  // Shared by the Layer 4 support overlay ("Try a fresh explanation") and the
  // failed-scenarios screen ("Review concept again") — both generate a new
  // analogy and restart at Layer 1 per the PRD.
  async function loadFreshAnalogy() {
    setLoadingFresh(true);
    const result = await generateFreshAnalogy({
      topic: subTopic.topic,
      previousHeadlines,
      seedLayer1,
    });
    if (result.headline) {
      setPreviousHeadlines((prev) => [...prev, result.headline]);
    }
    setFreshLayer1(result);
    setFreshVersion((v) => v + 1);
    setCurrentLayerIndex(1);
    setLoadingFresh(false);
    setMode('layer');

    const current = progress[subTopic.id] || {};
    updateProgress(subTopic.id, {
      loop_count: (current.loop_count || 0) + 1,
      current_layer: 1,
      last_accessed: Date.now(),
    });
  }

  function handleMoveToNext() {
    updateProgress(subTopic.id, { status: 'needs_review' });
    goToNextTopicOrProgress();
  }

  async function handleReviewAgain() {
    await loadFreshAnalogy();
    updateProgress(subTopic.id, { status: 'needs_review' });
  }

  function handleAllPassed({ accuracy, timeSpentMin, scenariosPassed }) {
    setPassedResult({ accuracy, timeSpentMin, scenariosPassed });
    setMode('passed');
  }

  async function handleAllFailed({ wrongAnswers, scenariosPassed }) {
    setMode('failed');
    setFailedFeedback(null);
    setLoadingFeedback(true);
    updateProgress(subTopic.id, { scenarios_passed: scenariosPassed, last_accessed: Date.now() });
    const feedback = await generateFailureFeedback({ topic: subTopic.topic, wrongAnswers });
    setFailedFeedback(feedback);
    setLoadingFeedback(false);
  }

  function handleNextTopic() {
    updateProgress(subTopic.id, {
      status: 'complete',
      quiz_accuracy: passedResult.accuracy,
      time_spent: passedResult.timeSpentMin,
      scenarios_passed: passedResult.scenariosPassed,
      current_layer: 4,
      last_accessed: Date.now(),
    });
    goToNextTopicOrProgress();
  }

  return (
    <ErrorBoundary>
      {mode === 'layer' && (
        <main className="flex h-[100dvh] flex-col overflow-hidden bg-slate-100">
          <TeachingCard
            topicName={subTopic.topic}
            layerIndex={currentLayerIndex}
            layer={activeLayer}
            cardKey={`${subTopic.id}-${currentLayerIndex}-${freshVersion}`}
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
          />
        </main>
      )}

      {mode === 'support' && (
        <SupportOverlay loading={loadingFresh} onTryFresh={loadFreshAnalogy} onMoveToNext={handleMoveToNext} />
      )}

      {mode === 'scenario' && (
        <ScenarioTest
          topicName={subTopic.topic}
          scenarios={subTopic.scenarios}
          onAllPassed={handleAllPassed}
          onAllFailed={handleAllFailed}
        />
      )}

      {mode === 'passed' && (
        <PassedScreen
          topicName={subTopic.topic}
          accuracy={passedResult.accuracy}
          timeSpentMin={passedResult.timeSpentMin}
          onNextTopic={handleNextTopic}
        />
      )}

      {mode === 'failed' && (
        <FailedScreen
          feedback={failedFeedback}
          loading={loadingFeedback}
          onReviewAgain={handleReviewAgain}
          onMoveToNext={handleMoveToNext}
        />
      )}
    </ErrorBoundary>
  );
}
