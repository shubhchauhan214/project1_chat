export default function ChatHeader({ loading }: { loading: boolean }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-[#202c33] shadow-md">
      <div className="w-10 h-10 rounded-full bg-[#00a884] flex items-center justify-center text-white font-bold text-lg">
        AI
      </div>
      <div>
        <p className="text-white font-medium text-sm">AI Assistant</p>
        <p className="text-[#8696a0] text-xs">
          {loading ? "typing..." : "online"}
        </p>
      </div>
    </div>
  );
}