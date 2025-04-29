
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Bistro Order Vista</h1>
        <p className="text-xl text-gray-600 mb-8">Restaurant Order Management System</p>
        <div className="space-x-4">
          <Link to="/orders">
            <Button size="lg">View Orders</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
