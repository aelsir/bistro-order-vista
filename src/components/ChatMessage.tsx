
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Order {
  id: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: string;
  customer: string;
  date: Date;
  type: 'delivery' | 'pickup';
}

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  type?: 'text' | 'order-summary';
  orders?: Order[];
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAssistant = message.role === 'assistant';
  
  return (
    <div className={`flex ${isAssistant ? 'justify-start' : 'justify-end'}`}>
      <div 
        className={`max-w-[90%] rounded-lg p-4 ${
          isAssistant 
            ? 'bg-white border border-gray-200 text-gray-800' 
            : 'bg-primary text-primary-foreground'
        }`}
      >
        {message.type === 'order-summary' && message.orders && (
          <div className="mb-3">
            <h4 className="font-medium mb-2">Order Summary</h4>
            <div className="space-y-3">
              {message.orders.map((order) => (
                <Card key={order.id} className="p-3 bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Order #{order.id}</span>
                        <Badge variant={order.status === 'completed' ? 'default' : 'outline'}>
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500">
                        {order.customer} - {new Date(order.date).toLocaleString()}
                      </p>
                    </div>
                    <Badge variant={order.type === 'delivery' ? 'secondary' : 'outline'}>
                      {order.type}
                    </Badge>
                  </div>
                  <div className="text-sm">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex justify-between">
                        <span>
                          {item.quantity}x {item.name}
                        </span>
                        <span>${item.price.toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="border-t mt-1 pt-1 font-medium flex justify-between">
                      <span>Total</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
        <div className="whitespace-pre-wrap">{message.content}</div>
        <div 
          className={`text-xs mt-2 ${
            isAssistant ? 'text-gray-500' : 'text-primary-foreground/80'
          }`}
        >
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
