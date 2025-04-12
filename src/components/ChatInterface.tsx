
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
    <div className="chat-container bg-white shadow-md rounded-xl overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-white/10 p-1.5 rounded-full">
            <Bot size={20} />
          </div>
          <h1 className="text-lg font-medium">AI Assistant</h1>
        </div>
        <div className="text-xs bg-white/20 py-1 px-2 rounded-full flex items-center">
          <span className="w-2 h-2 bg-green-300 rounded-full mr-1.5"></span>
          Online
        </div>
      </div>
      
      <div className="chat-messages py-3">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {isLoading && (
          <div className="flex justify-start px-4 mt-2">
            <div className="bg-chat-ai-bubble text-chat-ai-text p-2 rounded-2xl rounded-tl-none max-w-[60%] md:max-w-[50%] shadow-sm">
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
