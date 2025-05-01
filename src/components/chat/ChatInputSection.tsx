
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import ChatInput from "@/components/ChatInput";

interface ChatInputSectionProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onSend: () => void;
  isLoading: boolean;
  suggestions?: string[];
  onSuggestionClick?: (suggestion: string) => void;
  onNewChat: () => void;
}

const ChatInputSection: React.FC<ChatInputSectionProps> = ({
  value,
  onChange,
  onKeyDown,
  onSend,
  isLoading,
  suggestions,
  onSuggestionClick,
  onNewChat
}) => {
  return (
    <div className="border-t bg-white p-4">
      <div className="max-w-3xl mx-auto">
        <ChatInput 
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onSend={onSend}
          isLoading={isLoading}
          placeholder="Ask Tawila Brain about your restaurant..."
          suggestions={suggestions}
          onSuggestionClick={onSuggestionClick}
        />
        <div className="mt-2 flex justify-end">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs h-7"
            onClick={onNewChat}
          >
            <Plus className="h-3 w-3 mr-1" />
            New conversation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInputSection;
