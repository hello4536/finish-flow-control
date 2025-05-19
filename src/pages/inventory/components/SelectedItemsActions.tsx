
import React from 'react';
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface SelectedItemsActionsProps {
  selectedItems: string[];
  onDelete: () => void;
}

const SelectedItemsActions: React.FC<SelectedItemsActionsProps> = ({ 
  selectedItems, 
  onDelete 
}) => {
  if (selectedItems.length === 0) {
    return null;
  }

  return (
    <div className="flex justify-end mb-4">
      <Button 
        variant="destructive" 
        size="sm" 
        onClick={onDelete}
        className="flex items-center gap-1"
      >
        <Trash2 className="h-4 w-4" />
        Delete ({selectedItems.length})
      </Button>
    </div>
  );
};

export default SelectedItemsActions;
