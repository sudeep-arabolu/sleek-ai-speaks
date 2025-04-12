
import React from "react";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === "user";
  
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} px-4 my-1.5`}>
      <div 
        className={`
          max-w-[75%] md:max-w-[65%] p-2.5 rounded-2xl shadow-sm
          ${isUser 
            ? "bg-gradient-to-r from-chat-user-bubble to-chat-user-bubble/95 text-chat-user-text rounded-tr-none" 
            : "bg-gradient-to-r from-chat-ai-bubble to-chat-ai-bubble/95 text-chat-ai-text rounded-tl-none"
          }
        `}
      >
        <p className="text-sm md:text-base whitespace-pre-wrap leading-relaxed">{message.text}</p>
        <div className={`text-[10px] mt-1 opacity-70 ${isUser ? "text-gray-600" : "text-gray-200"}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
