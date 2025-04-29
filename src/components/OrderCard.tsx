
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import OrderStatusBadge from './OrderStatusBadge';
import { CalendarIcon, Clock } from 'lucide-react';

interface OrderCardProps {
  order: {
    id: string;
    amount: number;
    date: string;
    time: string;
    status: 'PENDING' | 'PAID' | 'DELIVERED' | 'CANCELLED';
  };
  onViewDetails: (orderId: string) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onViewDetails }) => {
  return (
    <Card className="w-full transition-all hover:shadow-md">
      <CardContent className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{order.id}</h3>
            <p className="text-xl font-bold mt-1 text-gray-800">£{order.amount.toFixed(2)}</p>
            
            <div className="flex items-center gap-2 mt-3 text-gray-500 text-sm">
              <CalendarIcon className="h-4 w-4" />
              <span>{order.date}</span>
              <Clock className="h-4 w-4 ml-2" />
              <span>{order.time}</span>
            </div>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>
        
        <div className="mt-4 pt-3 border-t border-gray-100">
          <Button 
            variant="outline" 
            onClick={() => onViewDetails(order.id)}
            className="w-full"
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
