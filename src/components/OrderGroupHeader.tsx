
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
    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg mb-4">
      <div className="flex items-center">
        <h3 className="font-medium">{title}</h3>
        <span className="ml-2 bg-gray-200 text-gray-700 text-xs rounded-full px-2 py-0.5">
          {count}
        </span>
      </div>
      <Button variant="ghost" size="sm" onClick={onToggle}>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export default OrderGroupHeader;
