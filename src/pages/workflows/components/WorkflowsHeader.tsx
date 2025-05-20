
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileUp } from "lucide-react";

interface WorkflowsHeaderProps {
  onCreateClick: () => void;
  onImportClick: () => void;
}

const WorkflowsHeader: React.FC<WorkflowsHeaderProps> = ({
  onCreateClick,
  onImportClick
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Workflows</h1>
      <div className="flex gap-2">
        <Button 
          variant="outline"
          onClick={onImportClick}
          className="flex items-center gap-2"
        >
          <FileUp className="h-5 w-5" />
          Import
        </Button>
        <Button 
          onClick={onCreateClick}
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-5 w-5" />
          Create Workflow
        </Button>
      </div>
    </div>
  );
};

export default WorkflowsHeader;
