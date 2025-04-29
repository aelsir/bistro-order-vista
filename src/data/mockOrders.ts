
export type OrderStatus = 'PENDING' | 'PAID' | 'DELIVERED' | 'CANCELLED';

export interface Order {
  id: string;
  orderNumber: string;
  amount: number;
  date: string;
  time: string;
  timestamp: string; // ISO date string for sorting and filtering
  status: OrderStatus;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  customer?: {
    name: string;
    phone?: string;
  };
  delivery?: {
    address?: string;
    notes?: string;
  };
}

export const mockOrders: Order[] = [
  {
    id: "5952286318",
    orderNumber: "#5952286318",
    amount: 128.96,
    date: "29/04/2025",
    time: "19:44:46",
    timestamp: "2025-04-29T19:44:46",
    status: "PENDING",
    items: [
      { name: "Beef Burger Deluxe", quantity: 4, price: 15.99 },
      { name: "Chicken Wings", quantity: 2, price: 12.99 },
      { name: "Garlic Bread", quantity: 1, price: 5.99 },
      { name: "Soft Drinks", quantity: 6, price: 2.99 }
    ],
    customer: {
      name: "John Smith",
      phone: "+44 123 456 7890"
    }
  },
  {
    id: "5951668026",
    orderNumber: "#5951668026",
    amount: 84.96,
    date: "29/04/2025",
    time: "19:34:28",
    timestamp: "2025-04-29T19:34:28",
    status: "PAID",
    items: [
      { name: "Margherita Pizza", quantity: 2, price: 14.99 },
      { name: "Caesar Salad", quantity: 2, price: 9.99 },
      { name: "Cheesecake", quantity: 1, price: 6.99 },
      { name: "Soft Drinks", quantity: 4, price: 2.99 }
    ],
    customer: {
      name: "Emma Johnson",
      phone: "+44 987 654 3210"
    },
    delivery: {
      address: "123 High Street, London",
      notes: "Please leave at door"
    }
  },
  {
    id: "5951624699",
    orderNumber: "#5951624699",
    amount: 84.96,
    date: "29/04/2025",
    time: "19:33:44",
    timestamp: "2025-04-29T19:33:44",
    status: "PAID",
    items: [
      { name: "Pepperoni Pizza", quantity: 2, price: 16.99 },
      { name: "Greek Salad", quantity: 1, price: 8.99 },
      { name: "Garlic Bread", quantity: 1, price: 5.99 },
      { name: "Tiramisu", quantity: 2, price: 7.99 },
      { name: "Soft Drinks", quantity: 4, price: 2.99 }
    ],
    customer: {
      name: "David Lee",
      phone: "+44 777 888 9999"
    }
  },
  {
    id: "5922457462",
    orderNumber: "#5922457462",
    amount: 34.97,
    date: "29/04/2025",
    time: "11:27:37",
    timestamp: "2025-04-29T11:27:37",
    status: "PENDING",
    items: [
      { name: "Veggie Burger", quantity: 1, price: 13.99 },
      { name: "French Fries", quantity: 1, price: 4.99 },
      { name: "Chocolate Milkshake", quantity: 2, price: 7.99 }
    ],
    customer: {
      name: "Sarah Williams"
    }
  },
  {
    id: "5922382698",
    orderNumber: "#5922382698",
    amount: 34.97,
    date: "29/04/2025",
    time: "11:26:22",
    timestamp: "2025-04-29T11:26:22",
    status: "PENDING",
    items: [
      { name: "Hawaiian Pizza", quantity: 1, price: 16.99 },
      { name: "Mozzarella Sticks", quantity: 1, price: 7.99 },
      { name: "Soft Drinks", quantity: 2, price: 2.99 }
    ],
    customer: {
      name: "Michael Brown",
      phone: "+44 555 123 4567"
    }
  },
  {
    id: "5922202268",
    orderNumber: "#5922202268",
    amount: 54.97,
    date: "29/04/2025",
    time: "11:23:22",
    timestamp: "2025-04-29T11:23:22",
    status: "PENDING",
    items: [
      { name: "BBQ Ribs", quantity: 1, price: 24.99 },
      { name: "Coleslaw", quantity: 1, price: 3.99 },
      { name: "Onion Rings", quantity: 1, price: 5.99 },
      { name: "Craft Beer", quantity: 2, price: 9.99 }
    ],
    customer: {
      name: "Robert Taylor",
      phone: "+44 777 123 4567"
    },
    delivery: {
      address: "45 Park Lane, Manchester",
      notes: "Third floor apartment"
    }
  },
  {
    id: "5922058251",
    orderNumber: "#5922058251",
    amount: 54.97,
    date: "29/04/2025",
    time: "11:20:58",
    timestamp: "2025-04-29T11:20:58",
    status: "PENDING",
    items: [
      { name: "Seafood Pasta", quantity: 2, price: 18.99 },
      { name: "Garlic Bread", quantity: 1, price: 5.99 },
      { name: "Tiramisu", quantity: 1, price: 7.99 },
      { name: "White Wine", quantity: 1, price: 24.99 }
    ],
    customer: {
      name: "Jennifer Adams",
      phone: "+44 777 555 1234"
    }
  },
  {
    id: "5921428396",
    orderNumber: "#5921428396",
    amount: 54.97,
    date: "29/04/2025",
    time: "11:10:28",
    timestamp: "2025-04-29T11:10:28",
    status: "PAID",
    items: [
      { name: "Sushi Platter", quantity: 1, price: 29.99 },
      { name: "Miso Soup", quantity: 2, price: 3.99 },
      { name: "Edamame", quantity: 1, price: 4.99 },
      { name: "Green Tea", quantity: 2, price: 2.99 }
    ],
    customer: {
      name: "Lisa Chen"
    }
  },
  {
    id: "5920143541",
    orderNumber: "#5920143541",
    amount: 54.97,
    date: "29/04/2025",
    time: "10:49:03",
    timestamp: "2025-04-29T10:49:03",
    status: "PAID",
    items: [
      { name: "Full English Breakfast", quantity: 2, price: 14.99 },
      { name: "Fresh Orange Juice", quantity: 2, price: 4.99 },
      { name: "Coffee", quantity: 2, price: 3.99 },
      { name: "Pastry Selection", quantity: 1, price: 8.99 }
    ],
    customer: {
      name: "Tom Wilson"
    },
    delivery: {
      address: "78 Queen Street, Edinburgh",
      notes: "Hotel reception"
    }
  },
  // Add some orders from yesterday
  {
    id: "5919854321",
    orderNumber: "#5919854321",
    amount: 76.50,
    date: "28/04/2025",
    time: "20:15:32",
    timestamp: "2025-04-28T20:15:32",
    status: "DELIVERED",
    items: [
      { name: "Steak Dinner", quantity: 2, price: 29.99 },
      { name: "Bottle of Red Wine", quantity: 1, price: 24.99 },
      { name: "Cheesecake", quantity: 2, price: 7.99 }
    ],
    customer: {
      name: "James Wilson"
    }
  },
  {
    id: "5919645123",
    orderNumber: "#5919645123",
    amount: 42.96,
    date: "28/04/2025",
    time: "19:22:14",
    timestamp: "2025-04-28T19:22:14",
    status: "DELIVERED",
    items: [
      { name: "Chicken Curry", quantity: 2, price: 15.99 },
      { name: "Naan Bread", quantity: 2, price: 2.99 },
      { name: "Rice", quantity: 2, price: 2.50 }
    ],
    customer: {
      name: "Mary Johnson"
    }
  },
  {
    id: "5919501234",
    orderNumber: "#5919501234",
    amount: 38.97,
    date: "28/04/2025",
    time: "14:45:09",
    timestamp: "2025-04-28T14:45:09",
    status: "CANCELLED",
    items: [
      { name: "Vegetarian Pizza", quantity: 1, price: 15.99 },
      { name: "Greek Salad", quantity: 1, price: 8.99 },
      { name: "Garlic Bread", quantity: 1, price: 5.99 },
      { name: "Soft Drinks", quantity: 2, price: 2.99 }
    ],
    customer: {
      name: "Daniel Brown"
    }
  }
];

export const getOrdersByStatus = (orders: Order[], status: string): Order[] => {
  if (status === 'ALL') return orders;
  return orders.filter(order => order.status === status);
};

export const getOrdersBySearchTerm = (orders: Order[], term: string): Order[] => {
  if (!term) return orders;
  const lowerTerm = term.toLowerCase();
  return orders.filter(order => 
    order.orderNumber.toLowerCase().includes(lowerTerm) ||
    order.id.toLowerCase().includes(lowerTerm) ||
    (order.customer?.name && order.customer.name.toLowerCase().includes(lowerTerm))
  );
};

export const getOrdersByDateRange = (
  orders: Order[], 
  from?: Date,
  to?: Date
): Order[] => {
  if (!from) return orders;
  
  return orders.filter(order => {
    const orderDate = new Date(order.timestamp);
    if (to) {
      return orderDate >= from && orderDate <= to;
    }
    return orderDate >= from;
  });
};

export const groupOrdersByDate = (orders: Order[]) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const thisWeekStart = new Date(today);
  thisWeekStart.setDate(thisWeekStart.getDate() - thisWeekStart.getDay());
  
  const lastWeekStart = new Date(thisWeekStart);
  lastWeekStart.setDate(lastWeekStart.getDate() - 7);
  
  const groups = {
    today: [] as Order[],
    yesterday: [] as Order[],
    thisWeek: [] as Order[],
    lastWeek: [] as Order[],
    older: [] as Order[]
  };
  
  orders.forEach(order => {
    const orderDate = new Date(order.timestamp);
    
    if (orderDate >= today) {
      groups.today.push(order);
    } else if (orderDate >= yesterday) {
      groups.yesterday.push(order);
    } else if (orderDate >= thisWeekStart) {
      groups.thisWeek.push(order);
    } else if (orderDate >= lastWeekStart) {
      groups.lastWeek.push(order);
    } else {
      groups.older.push(order);
    }
  });
  
  return groups;
};

export const getOrderStatistics = (orders: Order[]) => {
  const totalOrders = orders.length;
  const totalAmount = orders.reduce((sum, order) => sum + order.amount, 0);
  
  const pendingOrders = orders.filter(order => order.status === 'PENDING').length;
  const paidOrders = orders.filter(order => order.status === 'PAID').length;
  const deliveredOrders = orders.filter(order => order.status === 'DELIVERED').length;
  const cancelledOrders = orders.filter(order => order.status === 'CANCELLED').length;
  
  return {
    totalOrders,
    totalAmount: totalAmount.toFixed(2),
    pendingOrders,
    paidOrders,
    deliveredOrders,
    cancelledOrders,
    averageOrderValue: (totalAmount / Math.max(totalOrders, 1)).toFixed(2)
  };
};
