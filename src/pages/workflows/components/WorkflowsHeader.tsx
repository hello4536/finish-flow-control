
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
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Workflows</h2>
        <p className="text-muted-foreground mt-1">
          {totalWorkflows > 0 
            ? `Manage your ${totalWorkflows} workflow template${totalWorkflows !== 1 ? 's' : ''}`
            : "Create workflow templates for your finishing processes"
          }
        </p>
      </div>
      <div className="mt-4 flex items-center space-x-2 sm:mt-0">
        <Button className="gap-2" onClick={onCreateClick}>
          <Plus className="h-4 w-4" /> Create Workflow
        </Button>
        {totalWorkflows === 0 && <WorkflowSeeder onSeed={onSeed} />}
      </div>
    </div>
  );
};

export default WorkflowsHeader;
