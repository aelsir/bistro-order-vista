
import React from 'react';
import { Button } from '@/components/ui/button';

interface QuickPromptProps {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
}

const QuickPrompt: React.FC<QuickPromptProps> = ({ icon, text, onClick }) => {
  return (
    <Button 
      variant="outline" 
      className="flex items-center gap-2 whitespace-nowrap py-2 px-3 h-auto text-sm"
      onClick={onClick}
    >
      {icon}
      <span>{text}</span>
    </Button>
  );
};

export default QuickPrompt;
