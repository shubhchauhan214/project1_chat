import { useRef } from "react";
import { Message } from "@/types";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

interface Props {
  messages: Message[];
  loading: boolean;
  bottomRef: React.RefObject<HTMLDivElement | null>;
}

export default function MessageList({ messages, loading, bottomRef }: Props) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1">
      {messages.length === 0 && (
        <div className="flex items-center justify-center h-full">
          <p className="text-[#8696a0] text-sm">Ask anything...</p>
        </div>
      )}

      {messages.map((msg, index) => (
        <MessageBubble key={index} msg={msg} />
      ))}

      {loading && <TypingIndicator />}

      <div ref={bottomRef} />
    </div>
  );
}