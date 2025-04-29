
import React, { useState, useEffect, useMemo } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { 
  mockOrders, 
  getOrdersByStatus, 
  getOrdersBySearchTerm, 
  getOrdersByDateRange,
  groupOrdersByDate,
  getOrderStatistics,
  type Order 
} from '@/data/mockOrders';
import OrderStatusBadge from '@/components/OrderStatusBadge';
import OrderFilterBar from '@/components/OrderFilterBar';
import OrderTabs from '@/components/OrderTabs';
import OrderStatisticsBar from '@/components/OrderStatisticsBar';
import OrderGroupHeader from '@/components/OrderGroupHeader';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { ArrowLeft, Package, Truck } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Orders = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined
  });
  
  const [activeTab, setActiveTab] = useState('ALL');
  const [expandedGroups, setExpandedGroups] = useState({
    today: true,
    yesterday: true,
    thisWeek: true,
    lastWeek: false,
    older: false
  });
  
  // Order detail modal
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  // Reset filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('ALL');
    setDateRange({ from: undefined, to: undefined });
    setActiveTab('ALL');
  };
  
  // View order details
  const handleViewDetails = (orderId: string) => {
    const order = mockOrders.find(o => o.id === orderId);
    if (order) {
      setSelectedOrder(order);
    } else {
      toast({
        title: "Error",
        description: "Order not found",
        variant: "destructive"
      });
    }
  };
  
  // Toggle group expansion
  const toggleGroup = (group: keyof typeof expandedGroups) => {
    setExpandedGroups(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };
  
  // Apply filters
  useEffect(() => {
    setStatusFilter(activeTab);
  }, [activeTab]);
  
  // Filtered orders
  const filteredOrders = useMemo(() => {
    let filtered = mockOrders;
    
    // Apply tab/status filter
    filtered = getOrdersByStatus(filtered, statusFilter);
    
    // Apply search
    filtered = getOrdersBySearchTerm(filtered, searchTerm);
    
    // Apply date range
    filtered = getOrdersByDateRange(filtered, dateRange.from, dateRange.to);
    
    return filtered;
  }, [statusFilter, searchTerm, dateRange]);
  
  // Group orders by date
  const groupedOrders = useMemo(() => {
    return groupOrdersByDate(filteredOrders);
  }, [filteredOrders]);
  
  // Order statistics
  const statistics = useMemo(() => {
    return getOrderStatistics(mockOrders);
  }, []);
  
  // Tab counts
  const tabCounts = useMemo(() => {
    return {
      ALL: mockOrders.length,
      PENDING: mockOrders.filter(o => o.status === 'PENDING').length,
      PAID: mockOrders.filter(o => o.status === 'PAID').length,
      DELIVERED: mockOrders.filter(o => o.status === 'DELIVERED').length,
      CANCELLED: mockOrders.filter(o => o.status === 'CANCELLED').length
    };
  }, []);

  const getDeliveryTypeIcon = (order: Order) => {
    if (order.delivery && order.delivery.address) {
      return <Truck className="h-4 w-4 text-blue-500" />;
    }
    return <Package className="h-4 w-4 text-gray-500" />;
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" className="p-0 mr-4">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold">Order Management</h1>
      </div>
      
      {/* Statistics */}
      <OrderStatisticsBar statistics={[
        { label: 'Total Orders', value: statistics.totalOrders },
        { label: 'Pending Orders', value: statistics.pendingOrders },
        { label: 'Today\'s Revenue', value: `£${statistics.totalAmount}`, change: '+12.5% from yesterday', changeType: 'positive' },
        { label: 'Average Order Value', value: `£${statistics.averageOrderValue}` }
      ]} />
      
      {/* Filter Bar */}
      <OrderFilterBar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        onResetFilters={handleResetFilters}
      />
      
      {/* Tabs */}
      <OrderTabs 
        tabs={[
          { value: 'ALL', label: 'All', count: tabCounts.ALL },
          { value: 'PENDING', label: 'Pending', count: tabCounts.PENDING },
          { value: 'PAID', label: 'Paid', count: tabCounts.PAID },
          { value: 'DELIVERED', label: 'Delivered', count: tabCounts.DELIVERED },
          { value: 'CANCELLED', label: 'Cancelled', count: tabCounts.CANCELLED }
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      >
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No orders found matching your filters.</p>
            <Button variant="outline" className="mt-4" onClick={handleResetFilters}>
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Today's Orders */}
            {groupedOrders.today.length > 0 && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <OrderGroupHeader
                  title="Today"
                  count={groupedOrders.today.length}
                  isOpen={expandedGroups.today}
                  onToggle={() => toggleGroup('today')}
                />
                {expandedGroups.today && (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {groupedOrders.today.map(order => (
                        <TableRow 
                          key={order.id}
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => handleViewDetails(order.id)}
                        >
                          <TableCell className="font-medium">{order.orderNumber}</TableCell>
                          <TableCell>{order.time}</TableCell>
                          <TableCell>{getDeliveryTypeIcon(order)}</TableCell>
                          <TableCell>£{order.amount.toFixed(2)}</TableCell>
                          <TableCell>
                            <OrderStatusBadge status={order.status} />
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">View</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            )}
            
            {/* Yesterday's Orders */}
            {groupedOrders.yesterday.length > 0 && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <OrderGroupHeader
                  title="Yesterday"
                  count={groupedOrders.yesterday.length}
                  isOpen={expandedGroups.yesterday}
                  onToggle={() => toggleGroup('yesterday')}
                />
                {expandedGroups.yesterday && (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {groupedOrders.yesterday.map(order => (
                        <TableRow 
                          key={order.id}
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => handleViewDetails(order.id)}
                        >
                          <TableCell className="font-medium">{order.orderNumber}</TableCell>
                          <TableCell>{order.time}</TableCell>
                          <TableCell>{getDeliveryTypeIcon(order)}</TableCell>
                          <TableCell>£{order.amount.toFixed(2)}</TableCell>
                          <TableCell>
                            <OrderStatusBadge status={order.status} />
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">View</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            )}
            
            {/* This Week's Orders */}
            {groupedOrders.thisWeek.length > 0 && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <OrderGroupHeader
                  title="This Week"
                  count={groupedOrders.thisWeek.length}
                  isOpen={expandedGroups.thisWeek}
                  onToggle={() => toggleGroup('thisWeek')}
                />
                {expandedGroups.thisWeek && (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {groupedOrders.thisWeek.map(order => (
                        <TableRow 
                          key={order.id}
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => handleViewDetails(order.id)}
                        >
                          <TableCell className="font-medium">{order.orderNumber}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.time}</TableCell>
                          <TableCell>{getDeliveryTypeIcon(order)}</TableCell>
                          <TableCell>£{order.amount.toFixed(2)}</TableCell>
                          <TableCell>
                            <OrderStatusBadge status={order.status} />
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">View</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            )}
            
            {/* Last Week's Orders */}
            {groupedOrders.lastWeek.length > 0 && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <OrderGroupHeader
                  title="Last Week"
                  count={groupedOrders.lastWeek.length}
                  isOpen={expandedGroups.lastWeek}
                  onToggle={() => toggleGroup('lastWeek')}
                />
                {expandedGroups.lastWeek && (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {groupedOrders.lastWeek.map(order => (
                        <TableRow 
                          key={order.id}
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => handleViewDetails(order.id)}
                        >
                          <TableCell className="font-medium">{order.orderNumber}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.time}</TableCell>
                          <TableCell>{getDeliveryTypeIcon(order)}</TableCell>
                          <TableCell>£{order.amount.toFixed(2)}</TableCell>
                          <TableCell>
                            <OrderStatusBadge status={order.status} />
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">View</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            )}
            
            {/* Older Orders */}
            {groupedOrders.older.length > 0 && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <OrderGroupHeader
                  title="Older"
                  count={groupedOrders.older.length}
                  isOpen={expandedGroups.older}
                  onToggle={() => toggleGroup('older')}
                />
                {expandedGroups.older && (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {groupedOrders.older.map(order => (
                        <TableRow 
                          key={order.id}
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => handleViewDetails(order.id)}
                        >
                          <TableCell className="font-medium">{order.orderNumber}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.time}</TableCell>
                          <TableCell>{getDeliveryTypeIcon(order)}</TableCell>
                          <TableCell>£{order.amount.toFixed(2)}</TableCell>
                          <TableCell>
                            <OrderStatusBadge status={order.status} />
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">View</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            )}
          </div>
        )}
      </OrderTabs>
      
      {/* Order Detail Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
        {selectedOrder && (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Order Details: {selectedOrder.orderNumber}</DialogTitle>
              <DialogDescription>Complete information about this order</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Date & Time</p>
                  <p>{selectedOrder.date} {selectedOrder.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-medium">{selectedOrder.status}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-2">Order Items</p>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between border-b border-gray-100 pb-2">
                      <div>
                        <span className="font-medium">{item.quantity}x </span>
                        <span>{item.name}</span>
                      </div>
                      <span>£{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between font-bold text-lg pt-2">
                <span>Total</span>
                <span>£{selectedOrder.amount.toFixed(2)}</span>
              </div>
              
              {selectedOrder.customer && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">Customer</p>
                  <p className="font-medium">{selectedOrder.customer.name}</p>
                  {selectedOrder.customer.phone && (
                    <p className="text-sm">{selectedOrder.customer.phone}</p>
                  )}
                </div>
              )}
              
              {selectedOrder.delivery && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">Delivery Information</p>
                  {selectedOrder.delivery.address && (
                    <p>{selectedOrder.delivery.address}</p>
                  )}
                  {selectedOrder.delivery.notes && (
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-medium">Notes: </span>{selectedOrder.delivery.notes}
                    </p>
                  )}
                </div>
              )}
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </Button>
              <Button>
                Process Order
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default Orders;
