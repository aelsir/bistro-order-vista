
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { ChatSession } from '@/types/chat';

interface HistorySidebarProps {
  chatHistory: ChatSession[];
  onNewChat: () => void;
}

const HistorySidebar: React.FC<HistorySidebarProps> = ({ chatHistory, onNewChat }) => {
  return (
    <div className="hidden lg:flex flex-col w-80 border-l bg-white">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="font-semibold">Conversation History</h2>
        <Button variant="ghost" size="sm" onClick={onNewChat}>
          <Plus className="h-4 w-4 mr-1" />
          New
        </Button>
      </div>
      
      <div className="p-2 border-b">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input 
            className="pl-9" 
            placeholder="Search conversations..." 
          />
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          {chatHistory.map((chat) => (
            <Card key={chat.id} className="p-3 hover:bg-gray-50 cursor-pointer">
              <div className="font-medium truncate">{chat.title}</div>
              <div className="text-sm text-gray-500 truncate">{chat.lastMessage}</div>
              <div className="text-xs text-gray-400 mt-1">
                {new Date(chat.timestamp).toLocaleDateString()}
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
      
      <div className="p-3 border-t">
        <Link to="/">
          <Button variant="outline" size="sm" className="w-full">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HistorySidebar;
