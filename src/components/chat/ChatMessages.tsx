
import React, { useRef, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage from "@/components/ChatMessage";
import { Message } from '@/types/chat';

interface ChatMessagesProps {
  messages: Message[];
  isProcessing: boolean;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isProcessing }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  return (
    <ScrollArea className="flex-1 p-4">
      <div className="max-w-3xl mx-auto space-y-4 pb-20">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isProcessing && (
          <div className="flex items-center text-sm text-gray-500 p-2">
            <div className="animate-pulse">Tawila Brain is thinking...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};

export default ChatMessages;
