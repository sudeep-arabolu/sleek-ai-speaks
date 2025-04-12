
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
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} px-4 my-2`}>
      <div 
        className={`
          max-w-[70%] md:max-w-[60%] p-2.5 rounded-2xl shadow-sm
          ${isUser 
            ? "bg-gradient-to-r from-chat-user-bubble to-chat-user-bubble/90 text-chat-user-text rounded-tr-none" 
            : "bg-gradient-to-r from-chat-ai-bubble to-chat-ai-bubble/90 text-chat-ai-text rounded-tl-none"
          }
        `}
      >
        <p className="text-sm md:text-base whitespace-pre-wrap">{message.text}</p>
        <div className={`text-xs mt-1 opacity-70 ${isUser ? "text-gray-600" : "text-gray-200"}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
