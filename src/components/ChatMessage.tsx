
import React from 'react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAssistant = message.role === 'assistant';
  
  return (
    <div className={`flex ${isAssistant ? 'justify-start' : 'justify-end'}`}>
      <div 
        className={`max-w-[80%] rounded-lg p-4 ${
          isAssistant 
            ? 'bg-white border border-gray-200 text-gray-800' 
            : 'bg-primary text-primary-foreground'
        }`}
      >
        <div className="whitespace-pre-wrap">{message.content}</div>
        <div 
          className={`text-xs mt-2 ${
            isAssistant ? 'text-gray-500' : 'text-primary-foreground/80'
          }`}
        >
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
