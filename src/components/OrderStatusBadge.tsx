
import React from 'react';
import { cn } from "@/lib/utils";

type OrderStatus = 'PENDING' | 'PAID' | 'DELIVERED' | 'CANCELLED';

interface OrderStatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status, className }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'PENDING':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'PAID':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'DELIVERED':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'CANCELLED':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <span className={cn(
      'px-3 py-1 rounded-full text-sm font-medium border',
      getStatusStyles(),
      className
    )}>
      {status}
    </span>
  );
};

export default OrderStatusBadge;
