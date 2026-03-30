import { useState, useEffect, useRef } from "react";
import { sendMessage, getChatHistory } from "@/lib/api";
import { Message, ChatHistoryItem } from "@/types";

function getTime() {
  return new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // fetch chat history on page load
  useEffect(() => {
    async function loadHistory() {
      try {
        const history = await getChatHistory();
        const formatted: Message[] = [];

        [...history].reverse().forEach((item: ChatHistoryItem) => {
          formatted.push({
            id: item.id,
            text: item.user_msg,
            sender: "user",
            time: new Date(item.created_at).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          });
          formatted.push({
            text: item.bot_msg,
            sender: "bot",
            time: new Date(item.created_at).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          });
        });

        setMessages(formatted);
      } catch (err) {
        console.error("Chat history could not be loaded:", err);
      }
    }
    loadHistory();
  }, []);

  // scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    if (!input.trim() || loading) return;

    const userMsg: Message = { text: input, sender: "user", time: getTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const data = await sendMessage(input);
      const botMsg: Message = { text: data.reply, sender: "bot", time: getTime() };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: "Error occured, please try again.", sender: "bot", time: getTime() },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return { messages, input, setInput, loading, bottomRef, handleSend, handleKeyDown };
}