
import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ChartBarIcon, Clock, Send, Sparkles, MessageSquare, History, Search } from "lucide-react";
import { Link } from "react-router-dom";
import ChatMessage from "@/components/ChatMessage";
import QuickPrompt from "@/components/QuickPrompt";
import ChatHeader from "@/components/ChatHeader";
import ChatInput from "@/components/ChatInput";
import { toast } from "@/components/ui/sonner";

// Types for messages and quick prompts
interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

const TawilaBrain = () => {
  // Chat state management
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm Tawila Brain, your restaurant assistant. Ask me about menu optimization, customer trends, inventory management, or any other restaurant insights!",
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  
  // Sample chat history
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
    }
  ]);

  // Quick prompts for restaurant owners
  const quickPrompts = [
    { id: 'p1', icon: <ChartBarIcon className="h-4 w-4" />, text: "Analyze my top-selling dishes" },
    { id: 'p2', icon: <Clock className="h-4 w-4" />, text: "Forecast this weekend's sales" },
    { id: 'p3', icon: <Sparkles className="h-4 w-4" />, text: "Suggest menu improvements" },
    { id: 'p4', icon: <MessageSquare className="h-4 w-4" />, text: "Get customer feedback insights" },
  ];

  // Handle sending a new message
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `msg-${Date.now()}-user`,
      content: inputMessage,
      role: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsProcessing(true);
    
    // Simulate AI response (in a real app, this would call your backend)
    setTimeout(() => {
      const responseMessage: Message = {
        id: `msg-${Date.now()}-assistant`,
        content: generateResponse(inputMessage),
        role: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, responseMessage]);
      setIsProcessing(false);
      
      // Show a toast notification for the new insight
      toast("New insight available", {
        description: "Tawila Brain has analyzed your data and found new insights.",
      });
    }, 1500);
  };

  // Mock response generator
  const generateResponse = (question: string): string => {
    if (question.toLowerCase().includes('sales')) {
      return "Based on your historical data and current bookings, I predict your weekend sales to be approximately 15% higher than last weekend. The upcoming local festival is likely to increase foot traffic. Would you like specific day-by-day projections?";
    } else if (question.toLowerCase().includes('menu') || question.toLowerCase().includes('dish')) {
      return "Your top 3 most profitable dishes are Grilled Salmon ($14.50 profit margin), Premium Steak ($18.20 profit margin), and Truffle Pasta ($11.80 profit margin). However, your seafood platter has the highest customer satisfaction rating. Would you like recommendations on portion adjustments to improve margins further?";
    } else if (question.toLowerCase().includes('waste') || question.toLowerCase().includes('inventory')) {
      return "I've analyzed your inventory patterns and noticed that you're ordering 20% too much fresh produce weekly. By adjusting your order quantities and implementing a first-in-first-out system, you could reduce food waste by approximately 15% and save $450 monthly. Would you like a detailed waste reduction plan?";
    } else {
      return "That's an interesting question about your restaurant operations. Based on your data, I can help you analyze this further. Would you like me to provide specific metrics or actionable recommendations?";
    }
  };

  const handlePromptClick = (promptText: string) => {
    setInputMessage(promptText);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left sidebar */}
      <div className="hidden md:flex flex-col w-64 border-r bg-white">
        <div className="p-4 border-b">
          <Link to="/" className="flex items-center gap-2 text-xl font-semibold">
            <ArrowLeft className="h-4 w-4" />
            <span>Bistro Order Vista</span>
          </Link>
        </div>
        
        {/* Tabs for history and search */}
        <Tabs defaultValue="history" className="w-full">
          <div className="px-2 pt-2">
            <TabsList className="w-full">
              <TabsTrigger value="history" className="flex-1">History</TabsTrigger>
              <TabsTrigger value="search" className="flex-1">Search</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="history" className="mt-0">
            <ScrollArea className="h-[calc(100vh-10rem)]">
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
          </TabsContent>
          
          <TabsContent value="search" className="mt-0 p-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                className="pl-9" 
                placeholder="Search conversations..." 
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Main chat area */}
      <div className="flex flex-col flex-1">
        <ChatHeader />
        
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
              <TabsTrigger value="history" className="data-[state=active]:bg-white data-[state=active]:shadow-none md:hidden">
                <History className="h-4 w-4 mr-2" />
                History
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="chat" className="flex-1 flex flex-col p-0 mt-0">
            {/* Messages area */}
            <ScrollArea className="flex-1 p-4">
              <div className="max-w-3xl mx-auto space-y-4 pb-20">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {isProcessing && (
                  <div className="flex items-center text-sm text-gray-500 p-2">
                    <div className="animate-pulse">Tawila Brain is thinking...</div>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            {/* Quick prompts */}
            <div className="border-t bg-white p-2">
              <div className="max-w-3xl mx-auto">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {quickPrompts.map((prompt) => (
                    <QuickPrompt 
                      key={prompt.id} 
                      icon={prompt.icon} 
                      text={prompt.text} 
                      onClick={() => handlePromptClick(prompt.text)} 
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Input area */}
            <div className="border-t bg-white p-4">
              <div className="max-w-3xl mx-auto">
                <ChatInput 
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onSend={handleSendMessage}
                  isLoading={isProcessing}
                  placeholder="Ask Tawila Brain about your restaurant..."
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="insights" className="flex-1 p-4 mt-0 bg-gray-50">
            <div className="max-w-3xl mx-auto grid gap-4 md:grid-cols-2">
              <Card className="p-4">
                <h3 className="font-semibold text-lg">Top Performing Dishes</h3>
                <p className="text-gray-500 text-sm">Updated insights from your sales data</p>
                <div className="mt-4 text-sm">
                  <p>1. Grilled Salmon - $1,250 (15% increase)</p>
                  <p>2. Premium Steak - $980 (8% increase)</p>
                  <p>3. Truffle Pasta - $750 (stable)</p>
                </div>
                <Button variant="outline" className="mt-4 w-full">View Full Analysis</Button>
              </Card>
              
              <Card className="p-4">
                <h3 className="font-semibold text-lg">Weekly Revenue Forecast</h3>
                <p className="text-gray-500 text-sm">Predicted based on current trends</p>
                <div className="mt-4 text-sm">
                  <p>This Weekend: $8,500 (↑12% vs last week)</p>
                  <p>Next Week: $15,200 (↑5% vs last week)</p>
                </div>
                <Button variant="outline" className="mt-4 w-full">View Details</Button>
              </Card>
              
              <Card className="p-4">
                <h3 className="font-semibold text-lg">Inventory Optimization</h3>
                <p className="text-gray-500 text-sm">Reduce waste and save costs</p>
                <div className="mt-4 text-sm">
                  <p>Current Waste: 15% of inventory</p>
                  <p>Potential Savings: $450/month</p>
                </div>
                <Button variant="outline" className="mt-4 w-full">Get Recommendations</Button>
              </Card>
              
              <Card className="p-4">
                <h3 className="font-semibold text-lg">Customer Feedback</h3>
                <p className="text-gray-500 text-sm">Recent sentiment analysis</p>
                <div className="mt-4 text-sm">
                  <p>Overall Rating: 4.7/5 (↑0.2 vs last month)</p>
                  <p>Service: 4.8/5 | Food Quality: 4.9/5</p>
                </div>
                <Button variant="outline" className="mt-4 w-full">View All Feedback</Button>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="p-0 mt-0 md:hidden">
            <ScrollArea className="h-[calc(100vh-8rem)]">
              <div className="p-2 space-y-2">
                {chatHistory.map((chat) => (
                  <Card key={chat.id} className="p-3">
                    <div className="font-medium truncate">{chat.title}</div>
                    <div className="text-sm text-gray-500 truncate">{chat.lastMessage}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      {new Date(chat.timestamp).toLocaleDateString()}
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TawilaBrain;
