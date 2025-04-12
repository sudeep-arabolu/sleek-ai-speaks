
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
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div 
        className={`
          max-w-[80%] md:max-w-[70%] p-3 rounded-2xl 
          ${isUser 
            ? "bg-chat-user-bubble text-chat-user-text rounded-tr-none" 
            : "bg-chat-ai-bubble text-chat-ai-text rounded-tl-none"
          }
        `}
      >
        <p className="text-sm md:text-base whitespace-pre-wrap">{message.text}</p>
        <div className={`text-xs mt-1 ${isUser ? "text-gray-600" : "text-gray-300"}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
