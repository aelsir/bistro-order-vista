
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface QuickPromptProps {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
  category?: string;
  isNew?: boolean;
}

const QuickPrompt: React.FC<QuickPromptProps> = ({ 
  icon, 
  text, 
  onClick, 
  category, 
  isNew = false
}) => {
  return (
    <div className="flex flex-col gap-1">
      {category && <span className="text-xs text-gray-500 px-1">{category}</span>}
      <Button 
        variant="outline" 
        className={cn(
          "flex items-center gap-2 whitespace-nowrap py-2 px-3 h-auto text-sm relative", 
          isNew && "border-primary"
        )}
        onClick={onClick}
      >
        {icon}
        <span>{text}</span>
        {isNew && (
          <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full px-1.5">
            New
          </span>
        )}
      </Button>
    </div>
  );
};

export default QuickPrompt;
