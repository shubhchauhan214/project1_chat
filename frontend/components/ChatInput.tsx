interface Props {
  input: string;
  loading: boolean;
  setInput: (val: string) => void;
  handleSend: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
}

export default function ChatInput({
  input,
  loading,
  setInput,
  handleSend,
  handleKeyDown,
}: Props) {
  return (
    <div className="px-3 py-3 bg-[#202c33] flex items-end gap-2">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Message likho..."
        rows={1}
        className="flex-1 bg-[#2a3942] text-[#e9edef] placeholder-[#8696a0] rounded-lg px-4 py-2 text-sm resize-none outline-none max-h-32 overflow-y-auto"
      />
      <button
        onClick={handleSend}
        disabled={loading || !input.trim()}
        className="w-10 h-10 rounded-full bg-[#00a884] flex items-center justify-center disabled:opacity-40 hover:bg-[#00c79a] transition-colors"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
          <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
        </svg>
      </button>
    </div>
  );
}