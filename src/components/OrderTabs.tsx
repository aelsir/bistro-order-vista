
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface OrderTab {
  value: string;
  label: string;
  count?: number;
}

interface OrderTabsProps {
  tabs: OrderTab[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  children: React.ReactNode;
}

const OrderTabs: React.FC<OrderTabsProps> = ({ 
  tabs, 
  activeTab, 
  onTabChange,
  children 
}) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid grid-cols-5 mb-6">
        {tabs.map(tab => (
          <TabsTrigger key={tab.value} value={tab.value} className="relative">
            {tab.label}
            {tab.count !== undefined && (
              <span className="ml-2 bg-gray-200 text-gray-700 text-xs rounded-full px-2 py-0.5">
                {tab.count}
              </span>
            )}
          </TabsTrigger>
        ))}
      </TabsList>
      
      <TabsContent value={activeTab} className="mt-0">
        {children}
      </TabsContent>
    </Tabs>
  );
};

export default OrderTabs;
