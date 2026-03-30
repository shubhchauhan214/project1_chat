"use client";

import { useChat } from "@/hooks/useChat";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

export default function ChatWindow() {
  const { messages, input, setInput, loading, bottomRef, handleSend, handleKeyDown } = useChat();

  return (
    <div className="flex flex-col h-screen bg-[#111b21]">
      <ChatHeader loading={loading} />
      <MessageList messages={messages} loading={loading} bottomRef={bottomRef} />
      <ChatInput
        input={input}
        loading={loading}
        setInput={setInput}
        handleSend={handleSend}
        handleKeyDown={handleKeyDown}
      />
    </div>
  );
}