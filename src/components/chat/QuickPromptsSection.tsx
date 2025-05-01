
import React from 'react';
import QuickPrompt from '@/components/QuickPrompt';
import { BarChart3, Book, ChartBarIcon, Clock, Database, MessageSquare, Sparkles } from 'lucide-react';
import { QuickPromptItem } from '@/types/chat';

interface QuickPromptsSectionProps {
  onPromptClick: (text: string) => void;
}

const QuickPromptsSection: React.FC<QuickPromptsSectionProps> = ({ onPromptClick }) => {
  const promptCategories = {
    analytics: [
      { id: 'p1', icon: <ChartBarIcon className="h-4 w-4" />, text: "Analyze my top-selling dishes", isNew: false },
      { id: 'p2', icon: <BarChart3 className="h-4 w-4" />, text: "Sales forecast for this weekend", isNew: false },
      { id: 'p3', icon: <Sparkles className="h-4 w-4" />, text: "Suggest menu improvements", isNew: true }
    ],
    operations: [
      { id: 'p4', icon: <Clock className="h-4 w-4" />, text: "Optimize staff scheduling", isNew: false },
      { id: 'p5', icon: <Database className="h-4 w-4" />, text: "Inventory status and recommendations", isNew: false }
    ],
    customers: [
      { id: 'p6', icon: <MessageSquare className="h-4 w-4" />, text: "Customer feedback insights", isNew: false },
      { id: 'p7', icon: <Book className="h-4 w-4" />, text: "Create marketing campaign", isNew: true }
    ]
  };

  return (
    <div className="border-t bg-white p-2">
      <div className="max-w-3xl mx-auto">
        <div className="mb-1">
          <h4 className="text-sm font-medium px-2 text-gray-700">Analytics</h4>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {promptCategories.analytics.map((prompt) => (
              <QuickPrompt 
                key={prompt.id} 
                icon={prompt.icon} 
                text={prompt.text} 
                onClick={() => onPromptClick(prompt.text)}
                isNew={prompt.isNew}
              />
            ))}
          </div>
        </div>
        <div className="mb-1">
          <h4 className="text-sm font-medium px-2 text-gray-700">Operations</h4>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {promptCategories.operations.map((prompt) => (
              <QuickPrompt 
                key={prompt.id} 
                icon={prompt.icon} 
                text={prompt.text} 
                onClick={() => onPromptClick(prompt.text)}
                isNew={prompt.isNew}
              />
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium px-2 text-gray-700">Customers</h4>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {promptCategories.customers.map((prompt) => (
              <QuickPrompt 
                key={prompt.id} 
                icon={prompt.icon} 
                text={prompt.text} 
                onClick={() => onPromptClick(prompt.text)}
                isNew={prompt.isNew}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickPromptsSection;
