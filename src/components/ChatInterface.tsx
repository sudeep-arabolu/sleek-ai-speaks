
import React, { useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import useChat from "../hooks/useChat";
import { Bot } from "lucide-react";

const ChatInterface: React.FC = () => {
  const { messages, isLoading, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
      <div className="bg-primary text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-white/10 p-2 rounded-full">
            <Bot size={24} />
          </div>
          <h1 className="text-xl font-semibold">AI Assistant</h1>
        </div>
        <div className="text-xs bg-white/20 py-1 px-3 rounded-full">
          Online
        </div>
      </div>
      
      <div className="chat-messages">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-chat-ai-bubble text-chat-ai-text p-3 rounded-2xl rounded-tl-none max-w-[80%] md:max-w-[70%]">
              <div className="dots-typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatInterface;
