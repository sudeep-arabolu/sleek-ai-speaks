
import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage("");
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [message]);

  // Handle Cmd/Ctrl + Enter to submit
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === "Enter" && (e.metaKey || e.ctrlKey)) || (e.key === "Enter" && !e.shiftKey)) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 border-t rounded-b-lg shadow-sm">
      <div className="relative flex items-center">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question..."
          rows={1}
          className="flex-1 resize-none bg-muted/30 border border-input rounded-full py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!message.trim() || isLoading}
          className={`absolute right-2 rounded-full p-2 text-white transition-colors ${
            message.trim() && !isLoading
              ? "bg-primary hover:bg-primary/90"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          <Send size={18} />
        </button>
      </div>
      <div className="text-xs text-gray-500 mt-2 ml-2">
        Press Cmd/Ctrl + Enter to send
      </div>
    </form>
  );
};

export default ChatInput;
