
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const InsightsTab: React.FC = () => {
  return (
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
  );
};

export default InsightsTab;
