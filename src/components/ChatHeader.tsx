
import React from 'react';
import { Button } from '@/components/ui/button';
import { History } from 'lucide-react';

const ChatHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between border-b bg-white p-4">
      <div>
        <h1 className="text-xl font-bold">Tawila Brain</h1>
        <p className="text-sm text-gray-500">Your restaurant management co-pilot</p>
      </div>
      <Button variant="outline" size="icon">
        <History className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ChatHeader;
