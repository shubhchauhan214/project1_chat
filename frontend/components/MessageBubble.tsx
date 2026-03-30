import { Message } from "@/types";

export default function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] px-3 py-2 rounded-lg text-sm ${
          isUser
            ? "bg-[#005c4b] text-white rounded-tr-none"
            : "bg-[#202c33] text-[#e9edef] rounded-tl-none"
        }`}
      >
        <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
        <p className="text-[10px] text-[#8696a0] text-right mt-1">{msg.time}</p>
      </div>
    </div>
  );
}