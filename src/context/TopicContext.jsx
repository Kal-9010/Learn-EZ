import { createContext, useContext, useState } from 'react';

const TopicContext = createContext(null);

export function TopicProvider({ children }) {
  const [currentSubTopicId, setCurrentSubTopicId] = useState(null);
  const [currentLayerIndex, setCurrentLayerIndex] = useState(1);

  const value = {
    currentSubTopicId,
    setCurrentSubTopicId,
    currentLayerIndex,
    setCurrentLayerIndex,
  };
  return <TopicContext.Provider value={value}>{children}</TopicContext.Provider>;
}

export function useCurrentTopic() {
  const ctx = useContext(TopicContext);
  if (!ctx) throw new Error('useCurrentTopic must be used within a TopicProvider');
  return ctx;
}
