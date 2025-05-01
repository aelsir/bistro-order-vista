
export interface Order {
  id: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: string;
  customer: string;
  date: Date;
  type: 'delivery' | 'pickup';
}

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  type?: 'text' | 'order-summary';
  orders?: Order[];
}

export interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

export interface QuickPromptItem {
  id: string;
  icon: React.ReactNode;
  text: string;
  isNew?: boolean;
}
