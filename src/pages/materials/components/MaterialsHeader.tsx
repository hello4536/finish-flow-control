
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface MaterialsHeaderProps {
  onAddNewClick: () => void;
}

const MaterialsHeader: React.FC<MaterialsHeaderProps> = ({
  onAddNewClick
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Materials Management
        </h1>
        <p className="text-slate-600 mt-2 font-medium">
          Manage inventory, track usage, and ensure compliance across all materials
        </p>
      </div>
      <div className="flex gap-3">
        <Button 
          onClick={onAddNewClick} 
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 px-6 py-3"
        >
          <PlusCircle className="h-5 w-5" />
          Add New Material
        </Button>
      </div>
    </div>
  );
};

export default MaterialsHeader;
