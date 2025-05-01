
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageSquare } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Bistro Order Vista</h1>
        <p className="text-xl text-gray-600 mb-8">Restaurant Order Management System</p>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/orders">
              <Button size="lg">View Orders</Button>
            </Link>
            <Link to="/brain">
              <Button size="lg" variant="outline" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Tawila Brain
              </Button>
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Try our new AI assistant for restaurant management insights!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
