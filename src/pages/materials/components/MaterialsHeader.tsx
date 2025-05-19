
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Database } from "lucide-react";

interface MaterialsHeaderProps {
  onAddNewClick: () => void;
  showSeedButton?: boolean;
  onSeedData?: () => void;
}

const MaterialsHeader: React.FC<MaterialsHeaderProps> = ({ 
  onAddNewClick,
  showSeedButton = false,
  onSeedData
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Materials Management</h1>
      <div className="flex gap-2">
        {showSeedButton && onSeedData && (
          <Button 
            variant="outline"
            onClick={onSeedData}
            className="flex items-center gap-2"
          >
            <Database className="h-5 w-5" />
            Add Sample Data
          </Button>
        )}
        <Button 
          onClick={onAddNewClick}
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-5 w-5" />
          Add New Material
        </Button>
      </div>
    </div>
  );
};

export default MaterialsHeader;
