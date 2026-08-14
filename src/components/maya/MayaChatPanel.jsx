import { useEffect, useRef, useState } from 'react';
import { X, Send } from 'lucide-react';
import { useMayaChat } from '../../context/MayaChatContext.jsx';

export default function MayaChatPanel() {
  const { isOpen, close, messages, sending, sendMessage, topicName } = useMayaChat();
  const [draft, setDraft] = useState('');
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  async function handleSend(e) {
    e.preventDefault();
    const text = draft;
    setDraft('');
    await sendMessage(text);
  }

  return (
    <div
      className={`fixed inset-0 z-40 flex flex-col justify-end bg-slate-900/40 transition-opacity duration-200 ${
        isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
      onClick={close}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`flex h-[80dvh] flex-col rounded-t-3xl bg-white shadow-[0_-8px_30px_rgba(15,23,42,0.2)] transition-transform duration-300 ease-out ${
          isOpen ? 'translate-y-0' : 'translate-y-[100%]'
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <p className="text-[15px] font-extrabold text-slate-900">🤖 Maya</p>
            <p className="text-xs text-slate-500">{topicName ? `On: ${topicName}` : 'Your PM mentor'}</p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close chat"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500"
          >
            <X size={18} />
          </button>
        </div>

        <div ref={listRef} className="flex-1 overflow-auto px-5 py-4">
          <div className="flex flex-col gap-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed ${
                  m.role === 'maya' ? 'self-start bg-slate-100 text-slate-700' : 'self-end bg-blue-600 text-white'
                }`}
              >
                {m.text}
              </div>
            ))}
            {sending && (
              <div className="max-w-[85%] self-start rounded-2xl bg-slate-100 px-3.5 py-2.5 text-[13.5px] text-slate-400">
                Maya is typing…
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-slate-100 px-4 py-3">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Ask Maya anything…"
            className="h-11 flex-1 rounded-xl bg-slate-100 px-3.5 text-sm text-slate-900 outline-none placeholder:text-slate-400"
          />
          <button
            type="submit"
            disabled={!draft.trim() || sending}
            aria-label="Send message"
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white disabled:bg-slate-300"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
