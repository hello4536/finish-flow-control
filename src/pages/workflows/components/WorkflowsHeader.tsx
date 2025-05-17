
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import WorkflowSeeder from "./WorkflowSeeder";

interface WorkflowsHeaderProps {
  totalWorkflows: number;
  onCreateClick: () => void;
  onSeed: () => void;
}

const WorkflowsHeader: React.FC<WorkflowsHeaderProps> = ({ 
  totalWorkflows, 
  onCreateClick,
  onSeed
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-3xl font-bold tracking-tight">Workflows</h2>
      <div className="mt-2 flex items-center space-x-2 sm:mt-0">
        <Button className="gap-2" onClick={onCreateClick}>
          <Plus className="h-4 w-4" /> Create Workflow
        </Button>
        {totalWorkflows === 0 && <WorkflowSeeder onSeed={onSeed} />}
      </div>
    </div>
  );
};

export default WorkflowsHeader;
