import { createContext, useCallback, useContext, useState } from 'react';
import { useCurrentTopic } from './TopicContext.jsx';
import { askMaya } from '../lib/mayaChat.js';
import { SEED_TOPICS } from '../data/seed/index.js';

const MayaChatContext = createContext(null);

const WELCOME_MESSAGE = {
  role: 'maya',
  text: "Hi, I'm Maya! Ask me anything about the PM concepts you're studying.",
};

// Chat history is in-memory only for now — it resets on page reload. No
// Supabase table exists for it yet, and adding one (+ RLS policies) is a
// separate scope decision from "make Maya prominent."
export function MayaChatProvider({ children }) {
  const { currentSubTopicId, currentLayerIndex } = useCurrentTopic();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [sending, setSending] = useState(false);

  const subTopic = currentSubTopicId ? SEED_TOPICS[currentSubTopicId] : null;
  const activeLayer = subTopic ? subTopic.layers[currentLayerIndex - 1] : null;

  const sendMessage = useCallback(
    async (text) => {
      const trimmed = text.trim();
      if (!trimmed || sending) return;

      setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
      setSending(true);

      const reply = await askMaya({
        message: trimmed,
        topicName: subTopic?.topic,
        layerHeadline: activeLayer?.headline,
      });

      setMessages((prev) => [...prev, { role: 'maya', text: reply }]);
      setSending(false);
    },
    [sending, subTopic, activeLayer]
  );

  const value = {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen((v) => !v),
    messages,
    sending,
    sendMessage,
    topicName: subTopic?.topic || null,
  };

  return <MayaChatContext.Provider value={value}>{children}</MayaChatContext.Provider>;
}

export function useMayaChat() {
  const ctx = useContext(MayaChatContext);
  if (!ctx) throw new Error('useMayaChat must be used within a MayaChatProvider');
  return ctx;
}
