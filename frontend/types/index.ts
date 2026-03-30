export interface Message {
  id?: number;
  text: string;
  sender: "user" | "bot";
  time: string;
}

export interface ChatResponse {
  reply: string;
  message_id: number;
}

export interface ChatHistoryItem {
  id: number;
  user_msg: string;
  bot_msg: string;
  created_at: string;
}