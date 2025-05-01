
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartBarIcon, MessageSquare } from 'lucide-react';
import ChatHeader from "@/components/ChatHeader";
import { ChatSession } from '@/types/chat';
import useTawilaChatState from '@/hooks/useTawilaChatState';
import ChatMessages from '@/components/chat/ChatMessages';
import QuickPromptsSection from '@/components/chat/QuickPromptsSection';
import ChatInputSection from '@/components/chat/ChatInputSection';
import InsightsTab from '@/components/chat/InsightsTab';
import HistorySidebar from '@/components/chat/HistorySidebar';
import { toast } from "@/components/ui/sonner";

const TawilaBrain = () => {
  // Chat state management from custom hook
  const {
    messages,
    inputMessage,
    setInputMessage,
    isProcessing,
    suggestions,
    handleSendMessage,
    startNewChat
  } = useTawilaChatState();
  
  const [activeTab, setActiveTab] = useState('chat');
  const [language, setLanguage] = useState('en');

  // Chat history displayed on the right side
  const [chatHistory] = useState<ChatSession[]>([
    { 
      id: 'history1', 
      title: 'Menu Analysis', 
      lastMessage: 'Which dishes have the highest profit margin?', 
      timestamp: new Date(Date.now() - 3600000)  // 1 hour ago
    },
    { 
      id: 'history2', 
      title: 'Sales Forecast', 
      lastMessage: 'What will be our expected revenue this weekend?', 
      timestamp: new Date(Date.now() - 86400000)  // 1 day ago
    },
    { 
      id: 'history3', 
      title: 'Inventory Optimization', 
      lastMessage: 'How can I reduce food waste?', 
      timestamp: new Date(Date.now() - 172800000)  // 2 days ago
    },
    { 
      id: 'history4', 
      title: 'Staff Scheduling', 
      lastMessage: 'Suggest optimal staffing for next weekend', 
      timestamp: new Date(Date.now() - 259200000)  // 3 days ago
    },
    { 
      id: 'history5', 
      title: 'Customer Feedback', 
      lastMessage: "Analyze last month's reviews", 
      timestamp: new Date(Date.now() - 432000000)  // 5 days ago
    }
  ]);

  const handlePromptClick = (promptText: string) => {
    setInputMessage(promptText);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    toast("Language changed", {
      description: `Tawila Brain will now communicate in ${lang === 'en' ? 'English' : lang === 'es' ? 'Spanish' : lang === 'fr' ? 'French' : 'Arabic'}`,
    });
  };

  const handleSettingsClick = () => {
    toast("Settings", {
      description: "AI settings panel will be available soon",
    });
  };
  
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main chat area */}
      <div className="flex flex-col flex-1">
        <ChatHeader 
          onLanguageChange={handleLanguageChange} 
          currentLanguage={language}
          onSettingsClick={handleSettingsClick}
        />
        
        {/* Tabs for different functionalities */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <div className="border-b bg-white px-4">
            <TabsList className="h-12">
              <TabsTrigger value="chat" className="data-[state=active]:bg-white data-[state=active]:shadow-none">
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="insights" className="data-[state=active]:bg-white data-[state=active]:shadow-none">
                <ChartBarIcon className="h-4 w-4 mr-2" />
                Insights
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="chat" className="flex-1 flex flex-col p-0 mt-0">
            {/* Messages area */}
            <ChatMessages messages={messages} isProcessing={isProcessing} />
            
            {/* Quick prompts */}
            <QuickPromptsSection onPromptClick={handlePromptClick} />
            
            {/* Input area */}
            <ChatInputSection
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              onSend={handleSendMessage}
              isLoading={isProcessing}
              suggestions={suggestions}
              onSuggestionClick={handleSuggestionClick}
              onNewChat={startNewChat}
            />
          </TabsContent>
          
          <TabsContent value="insights" className="flex-1 p-4 mt-0 bg-gray-50">
            <InsightsTab />
          </TabsContent>
        </Tabs>
      </div>

      {/* Right sidebar for chat history */}
      <HistorySidebar chatHistory={chatHistory} onNewChat={startNewChat} />
    </div>
  );
};

export default TawilaBrain;
