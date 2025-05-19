
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const InventoryHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Inventory Management</h1>
      <Button className="flex items-center gap-2">
        <PlusCircle className="h-5 w-5" />
        Add New Item
      </Button>
    </div>
  );
};

export default InventoryHeader;
