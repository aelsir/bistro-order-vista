
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Language } from 'lucide-react';

interface ChatHeaderProps {
  onLanguageChange: (language: string) => void;
  currentLanguage: string;
  onSettingsClick: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  onLanguageChange, 
  currentLanguage,
  onSettingsClick
}) => {
  return (
    <div className="flex items-center justify-between border-b bg-white p-4">
      <div>
        <h1 className="text-xl font-bold">Tawila Brain</h1>
        <p className="text-sm text-gray-500">Your restaurant management co-pilot</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 border rounded-md px-2 py-1">
          <Language className="h-4 w-4 text-gray-500" />
          <Select 
            value={currentLanguage} 
            onValueChange={onLanguageChange}
          >
            <SelectTrigger className="border-0 p-0 h-6 w-24 shadow-none">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="ar">Arabic</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" size="icon" onClick={onSettingsClick}>
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
