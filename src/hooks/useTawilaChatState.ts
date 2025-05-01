
import { useState } from 'react';
import { Message, Order } from '@/types/chat';
import { toast } from "@/components/ui/sonner";

export const useTawilaChatState = () => {
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
  
  // Suggested responses based on context
  const [suggestions, setSuggestions] = useState([
    "Show me today's orders",
    "What are my top-selling dishes?",
    "How's customer satisfaction this week?"
  ]);

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

  return {
    messages,
    inputMessage,
    setInputMessage,
    isProcessing,
    suggestions,
    handleSendMessage,
    generateNewSuggestions,
    startNewChat
  };
};

export default useTawilaChatState;
