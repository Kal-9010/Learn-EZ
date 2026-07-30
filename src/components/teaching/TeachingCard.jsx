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
      <TinderCard
        onCardLeftScreen={handleCardLeftScreen}
        preventSwipe={['up', 'down']}
        swipeRequirementType="position"
        swipeThreshold={100}
        className="flex h-full w-full flex-col bg-white"
      >
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
