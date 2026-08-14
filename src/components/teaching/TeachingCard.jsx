import { useState } from 'react';
import { motion } from 'framer-motion';
import TinderCard from 'react-tinder-card';
import LayerProgressBar from './LayerProgressBar.jsx';
import KeywordChip from './KeywordChip.jsx';
import KeywordTooltip from './KeywordTooltip.jsx';
import MayaMessage from './MayaMessage.jsx';
import Layer1 from './Layer1.jsx';
import Layer2 from './Layer2.jsx';
import Layer3 from './Layer3.jsx';
import Layer4 from './Layer4.jsx';

const LAYER_COMPONENTS = { 1: Layer1, 2: Layer2, 3: Layer3, 4: Layer4 };

export default function TeachingCard({ topicName, layerIndex, layer, cardKey, onSwipeLeft, onSwipeRight }) {
  const [openTooltip, setOpenTooltip] = useState(null);
  const [swipeStamp, setSwipeStamp] = useState(null); // null | 'left' | 'right'
  const LayerBody = LAYER_COMPONENTS[layerIndex];

  function handleCardLeftScreen(dir) {
    if (dir === 'left') onSwipeLeft();
    else if (dir === 'right') onSwipeRight();
  }

  return (
    <motion.div
      key={cardKey}
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="relative flex flex-1 flex-col overflow-hidden"
    >
      {/* Static stack-depth silhouettes — purely decorative, suggest more cards behind the active one */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-5 bottom-0 top-3 rounded-3xl bg-white/50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 bottom-0 top-6 rounded-3xl bg-white/70"
      />

      <TinderCard
        onCardLeftScreen={handleCardLeftScreen}
        onSwipeRequirementFulfilled={(dir) => setSwipeStamp(dir)}
        onSwipeRequirementUnfulfilled={() => setSwipeStamp(null)}
        preventSwipe={['up', 'down']}
        swipeRequirementType="position"
        swipeThreshold={100}
        className="relative flex h-full w-full flex-col bg-white"
      >
        {swipeStamp && (
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute top-6 z-30 -rotate-6 rounded-xl border-4 px-4 py-1.5 text-lg font-extrabold uppercase tracking-wide ${
              swipeStamp === 'right'
                ? 'right-6 border-green-500 text-green-500'
                : 'left-6 border-blue-500 text-blue-500'
            }`}
          >
            {swipeStamp === 'right' ? 'Got it' : 'Go deeper'}
          </div>
        )}

        <LayerProgressBar topicName={topicName} percent={layerIndex * 25} />

        <div className="flex-1 overflow-auto px-5 pb-2 pt-4">
          <LayerBody layer={layer} />
          <div className="mb-3 flex flex-wrap gap-2">
            {(layer.keywords || []).map((kw) => (
              <KeywordChip key={kw.word} keyword={kw} onTap={setOpenTooltip} />
            ))}
          </div>
        </div>

        {openTooltip && <KeywordTooltip keyword={openTooltip} onDismiss={() => setOpenTooltip(null)} />}

        <MayaMessage
          message={layer.mayaMessage}
          swipeLeftLabel={layer.swipeLeft}
          swipeRightLabel={layer.swipeRight}
        />
      </TinderCard>
    </motion.div>
  );
}
