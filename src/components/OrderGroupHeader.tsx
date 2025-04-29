
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface OrderGroupHeaderProps {
  title: string;
  count: number;
  isOpen: boolean;
  onToggle: () => void;
}

const OrderGroupHeader: React.FC<OrderGroupHeaderProps> = ({
  title,
  count,
  isOpen,
  onToggle
}) => {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg border-b border-gray-100 sticky top-0 z-10 shadow-sm mb-2">
      <div className="flex items-center">
        <h3 className="font-medium text-gray-800">{title}</h3>
        <span className="ml-2 bg-gray-100 text-gray-700 text-xs rounded-full px-2 py-0.5">
          {count}
        </span>
      </div>
      <Button variant="ghost" size="sm" onClick={onToggle} className="p-2">
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export default OrderGroupHeader;
