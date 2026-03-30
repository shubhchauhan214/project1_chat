import { ChatResponse, ChatHistoryItem } from "@/types";

const API_URL = "http://localhost:8000";

export async function sendMessage(message: string): Promise<ChatResponse> {
  const res = await fetch(`${API_URL}/chat/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) throw new Error("Message could not be sent");

  return res.json();
}

export async function getChatHistory(): Promise<ChatHistoryItem[]> {
  const res = await fetch(`${API_URL}/chat/history`);

  if (!res.ok) throw new Error("Chat history does not exist");

  return res.json();
}