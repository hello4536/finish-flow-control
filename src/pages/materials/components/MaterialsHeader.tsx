import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
interface MaterialsHeaderProps {
  onAddNewClick: () => void;
}
const MaterialsHeader: React.FC<MaterialsHeaderProps> = ({
  onAddNewClick
}) => {
  return <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-purple-600">Materials Management</h1>
      <div className="flex gap-2">
        <Button onClick={onAddNewClick} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500">
          <PlusCircle className="h-5 w-5" />
          Add New Material
        </Button>
      </div>
    </div>;
};
export default MaterialsHeader;