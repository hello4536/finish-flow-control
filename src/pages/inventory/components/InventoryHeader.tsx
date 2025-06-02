
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface InventoryHeaderProps {
  onAddNewClick: () => void;
}

const InventoryHeader: React.FC<InventoryHeaderProps> = ({ onAddNewClick }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Inventory Management
        </h1>
        <p className="text-slate-600 mt-2 font-medium">
          Track stock levels, manage locations, and ensure optimal inventory control
        </p>
      </div>
      <div className="flex gap-3">
        <Button 
          onClick={onAddNewClick} 
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 px-6 py-3"
        >
          <PlusCircle className="h-5 w-5" />
          Add Inventory Item
        </Button>
      </div>
    </div>
  );
};

export default InventoryHeader;
