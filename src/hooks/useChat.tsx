
import { useState, useEffect, useCallback } from "react";
import { Message } from "../components/MessageBubble";
import { v4 as uuidv4 } from "uuid";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! I'm your AI assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate AI response delay (normally this would be an API call)
  const getAIResponse = useCallback((userMessage: string): Promise<string> => {
    return new Promise((resolve) => {
      // Simulate different response times
      const delay = 1000 + Math.random() * 2000;
      
      setTimeout(() => {
        // This is where you'd normally call your AI API
        // For now we'll just echo with some pre-defined responses
        const responses = [
          `I understand you're asking about "${userMessage}". That's an interesting question.`,
          `Thanks for your message. I'd be happy to help with "${userMessage}".`,
          `Regarding "${userMessage}", I can provide some insights based on my knowledge.`,
          `I've processed your query about "${userMessage}" and here's what I can tell you.`,
          `Thank you for asking about "${userMessage}". Let me think about that for a moment.`,
        ];
        
        const responseIndex = Math.floor(Math.random() * responses.length);
        resolve(responses[responseIndex]);
      }, delay);
    });
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      text,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Get AI response
      const aiResponseText = await getAIResponse(text);
      
      // Add AI response
      const aiMessage: Message = {
        id: uuidv4(),
        text: aiResponseText,
        sender: "ai",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      
      // Add error message
      const errorMessage: Message = {
        id: uuidv4(),
        text: "Sorry, I encountered an error processing your request. Please try again.",
        sender: "ai",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [getAIResponse]);

  return {
    messages,
    isLoading,
    sendMessage,
  };
};

export default useChat;
