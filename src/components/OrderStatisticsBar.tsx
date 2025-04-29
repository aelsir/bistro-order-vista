
import React from 'react';

interface OrderStatistic {
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
}

interface OrderStatisticsBarProps {
  statistics: OrderStatistic[];
}

const OrderStatisticsBar: React.FC<OrderStatisticsBarProps> = ({ statistics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statistics.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <p className="text-sm text-gray-500">{stat.label}</p>
          <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
          {stat.change && (
            <p className={`text-xs mt-2 flex items-center ${
              stat.changeType === 'positive' ? 'text-green-600' :
              stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-500'
            }`}>
              {stat.changeType === 'positive' && '↑ '}
              {stat.changeType === 'negative' && '↓ '}
              {stat.change}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderStatisticsBar;
