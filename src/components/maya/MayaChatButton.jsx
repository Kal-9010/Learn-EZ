import { Sparkles } from 'lucide-react';
import { useMayaChat } from '../../context/MayaChatContext.jsx';

export default function MayaChatButton() {
  const { isOpen, open } = useMayaChat();

  if (isOpen) return null;

  return (
    <button
      type="button"
      onClick={open}
      aria-label="Chat with Maya"
      className="fixed bottom-6 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-[0_8px_24px_rgba(37,99,235,0.45)] active:scale-95"
    >
      <Sparkles size={24} />
    </button>
  );
}
