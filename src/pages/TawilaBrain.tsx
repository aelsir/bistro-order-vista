
import React, { useState, useRef, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ChartBarIcon, Clock, Sparkles, MessageSquare, Search, BarChart3, Plus, Book, Database } from "lucide-react";
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
  type?: 'text' | 'order-summary';
  orders?: Order[];
}

interface Order {
  id: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: string;
  customer: string;
  date: Date;
  type: 'delivery' | 'pickup';
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
      content: "Welcome to Tawila Brain! I'm your restaurant management assistant. How can I help you today? You can ask me about your orders, menu analytics, or customer insights.",
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [language, setLanguage] = useState('en');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Suggested responses based on context
  const [suggestions, setSuggestions] = useState([
    "Show me today's orders",
    "What are my top-selling dishes?",
    "How's customer satisfaction this week?"
  ]);

  // History displayed on the right side
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
      lastMessage: 'Analyze last month's reviews', 
      timestamp: new Date(Date.now() - 432000000)  // 5 days ago
    }
  ]);

  // Categories for quick prompts
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

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
    
    // Generate new suggestions based on context
    generateNewSuggestions(inputMessage);
    
    // Simulate AI response (in a real app, this would call your backend)
    setTimeout(() => {
      const responseMessage = generateResponse(inputMessage);
      setMessages(prev => [...prev, responseMessage]);
      setIsProcessing(false);
      
      // Show a toast notification for the new insight
      if (Math.random() > 0.5) {
        toast("New insight available", {
          description: "Tawila Brain has analyzed your data and found new insights.",
        });
      }
    }, 1500);
  };

  // Mock response generator
  const generateResponse = (question: string): Message => {
    // Check for order-related queries
    if (question.toLowerCase().includes('order') || question.toLowerCase().includes('today')) {
      return {
        id: `msg-${Date.now()}-assistant`,
        content: "Here are today's orders. The lunch rush is performing well with a 12% increase compared to last week. Would you like more detailed analysis?",
        role: 'assistant',
        timestamp: new Date(),
        type: 'order-summary',
        orders: [
          {
            id: '1234',
            customer: 'John Smith',
            status: 'completed',
            total: 42.75,
            date: new Date(),
            type: 'delivery',
            items: [
              { name: 'Margherita Pizza', quantity: 1, price: 16.99 },
              { name: 'Caesar Salad', quantity: 1, price: 8.99 },
              { name: 'Tiramisu', quantity: 1, price: 7.99 },
              { name: 'Sparkling Water', quantity: 2, price: 3.99 }
            ]
          },
          {
            id: '1235',
            customer: 'Maria Garcia',
            status: 'in-progress',
            total: 35.50,
            date: new Date(),
            type: 'pickup',
            items: [
              { name: 'Seafood Pasta', quantity: 1, price: 22.50 },
              { name: 'Garlic Bread', quantity: 1, price: 5.99 },
              { name: 'Lemonade', quantity: 1, price: 3.99 }
            ]
          }
        ]
      };
    } else if (question.toLowerCase().includes('sales') || question.toLowerCase().includes('revenue') || question.toLowerCase().includes('forecast')) {
      return {
        id: `msg-${Date.now()}-assistant`,
        content: "Based on your historical data and current bookings, I predict your weekend sales to be approximately 15% higher than last weekend. The upcoming local festival is likely to increase foot traffic. Would you like specific day-by-day projections?",
        role: 'assistant',
        timestamp: new Date()
      };
    } else if (question.toLowerCase().includes('menu') || question.toLowerCase().includes('dish')) {
      return {
        id: `msg-${Date.now()}-assistant`,
        content: "Your top 3 most profitable dishes are Grilled Salmon ($14.50 profit margin), Premium Steak ($18.20 profit margin), and Truffle Pasta ($11.80 profit margin). However, your seafood platter has the highest customer satisfaction rating. Would you like recommendations on portion adjustments to improve margins further?",
        role: 'assistant',
        timestamp: new Date()
      };
    } else if (question.toLowerCase().includes('waste') || question.toLowerCase().includes('inventory')) {
      return {
        id: `msg-${Date.now()}-assistant`,
        content: "I've analyzed your inventory patterns and noticed that you're ordering 20% too much fresh produce weekly. By adjusting your order quantities and implementing a first-in-first-out system, you could reduce food waste by approximately 15% and save $450 monthly. Would you like a detailed waste reduction plan?",
        role: 'assistant',
        timestamp: new Date()
      };
    } else if (question.toLowerCase().includes('staff') || question.toLowerCase().includes('schedul')) {
      return {
        id: `msg-${Date.now()}-assistant`,
        content: "Based on your recent sales trends, I recommend scheduling 2 additional servers for Friday evening between 6-10pm and adding another chef on Saturday from 11am-2pm to handle the expected lunch rush. This should reduce customer wait times while maintaining your labor cost percentage.",
        role: 'assistant',
        timestamp: new Date()
      };
    } else if (question.toLowerCase().includes('feedback') || question.toLowerCase().includes('review') || question.toLowerCase().includes('customer')) {
      return {
        id: `msg-${Date.now()}-assistant`,
        content: "Customer sentiment analysis shows that your service speed improved by 12% this month! However, there's been a slight 3% decrease in food quality ratings, particularly for seafood dishes. The most positive feedback mentions your new seasonal desserts and friendly staff.",
        role: 'assistant',
        timestamp: new Date()
      };
    } else if (question.toLowerCase().includes('marketing') || question.toLowerCase().includes('campaign')) {
      return {
        id: `msg-${Date.now()}-assistant`,
        content: "Based on customer data, I recommend a mid-week dining promotion targeting local professionals. A 'Business Lunch Express' offering that guarantees 30-minute service could attract more weekday traffic during your current slow periods (Tuesday-Thursday). Would you like me to draft sample promotional content?",
        role: 'assistant',
        timestamp: new Date()
      };
    } else {
      return {
        id: `msg-${Date.now()}-assistant`,
        content: "That's an interesting question about your restaurant operations. Based on your data, I can help you analyze this further. Would you like me to provide specific metrics or actionable recommendations?",
        role: 'assistant',
        timestamp: new Date()
      };
    }
  };

  // Generate new contextual suggestions
  const generateNewSuggestions = (question: string) => {
    if (question.toLowerCase().includes('menu') || question.toLowerCase().includes('dish')) {
      setSuggestions([
        "Which dishes should we remove?",
        "Suggest seasonal menu items",
        "Analyze menu pricing strategy"
      ]);
    } else if (question.toLowerCase().includes('order') || question.toLowerCase().includes('delivery')) {
      setSuggestions([
        "Which delivery service is most profitable?",
        "Show me order trends by time of day",
        "How can we improve order completion time?"
      ]);
    } else if (question.toLowerCase().includes('staff') || question.toLowerCase().includes('employee')) {
      setSuggestions([
        "Optimize weekend staffing levels",
        "Identify top-performing servers",
        "Schedule staff training session"
      ]);
    } else {
      setSuggestions([
        "Compare this week to last week",
        "Show me customer retention data",
        "Identify cost-saving opportunities"
      ]);
    }
  };

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

  const startNewChat = () => {
    setMessages([
      {
        id: `msg-${Date.now()}-assistant`,
        content: "How can I help you manage your restaurant today?",
        role: 'assistant',
        timestamp: new Date()
      }
    ]);
    toast("New conversation started", {
      description: "Your previous conversation has been saved to history",
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
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            
            {/* Quick prompts */}
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
                        onClick={() => handlePromptClick(prompt.text)}
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
                        onClick={() => handlePromptClick(prompt.text)}
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
                        onClick={() => handlePromptClick(prompt.text)}
                        isNew={prompt.isNew}
                      />
                    ))}
                  </div>
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
                  suggestions={suggestions}
                  onSuggestionClick={handleSuggestionClick}
                />
                <div className="mt-2 flex justify-end">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs h-7"
                    onClick={startNewChat}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    New conversation
                  </Button>
                </div>
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
        </Tabs>
      </div>

      {/* Right sidebar for chat history */}
      <div className="hidden lg:flex flex-col w-80 border-l bg-white">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-semibold">Conversation History</h2>
          <Button variant="ghost" size="sm" onClick={startNewChat}>
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
    </div>
  );
};

export default TawilaBrain;
