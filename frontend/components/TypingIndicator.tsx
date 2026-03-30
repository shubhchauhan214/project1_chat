export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-[#202c33] px-4 py-3 rounded-lg rounded-tl-none">
        <div className="flex gap-1 items-center">
          <span className="w-2 h-2 bg-[#8696a0] rounded-full animate-bounce [animation-delay:0ms]"></span>
          <span className="w-2 h-2 bg-[#8696a0] rounded-full animate-bounce [animation-delay:150ms]"></span>
          <span className="w-2 h-2 bg-[#8696a0] rounded-full animate-bounce [animation-delay:300ms]"></span>
        </div>
      </div>
    </div>
  );
}