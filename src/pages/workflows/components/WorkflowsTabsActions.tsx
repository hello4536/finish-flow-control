
import React from "react";
import { Button } from "@/components/ui/button";
import { Import, FileText } from "lucide-react";

interface WorkflowsTabsActionsProps {
  onImportClick: () => void;
  onExportClick: () => void;
}

const WorkflowsTabsActions: React.FC<WorkflowsTabsActionsProps> = ({ 
  onImportClick, 
  onExportClick 
}) => {
  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={onImportClick}>
        <Import className="h-4 w-4 mr-2" /> Import
      </Button>
      <Button variant="outline" size="sm" onClick={onExportClick}>
        <FileText className="h-4 w-4 mr-2" /> Export
      </Button>
    </div>
  );
};

export default WorkflowsTabsActions;
