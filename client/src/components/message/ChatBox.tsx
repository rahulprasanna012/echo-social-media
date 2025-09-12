import type { ChatMessage } from "@/context/ChatContext.tsx";
import React, { useEffect, useRef } from "react";

const ChatBox: React.FC<{
  currentUserId: string|undefined;
  messages: ChatMessage[];
}> = ({ currentUserId, messages }) => {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="p-4 space-y-3">
      {messages.map((msg) => {
        const isMine = msg.senderId === currentUserId;
        return (
          <div
            key={msg._id}
            className={`flex ${isMine ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 shadow ${
                isMine ? "bg-purple-600 text-white" : "bg-white"
              }`}
            >
              {msg.text && <p className="text-sm">{msg.text}</p>}
              {/* {msg.image && (
                <img
                  src={msg.image}
                  alt="sent content"
                  className="rounded-md max-w-full mt-1"
                />
              )} */}
              <p className={`text-[10px] mt-1 opacity-70 text-right`}>
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        );
      })}
      <div ref={endRef} />
    </div>
  );
};

export default ChatBox;
