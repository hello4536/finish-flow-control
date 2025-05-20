
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface WorkflowsEmptyStateProps {
  onCreateClick: () => void;
}

const WorkflowsEmptyState: React.FC<WorkflowsEmptyStateProps> = ({ onCreateClick }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <h3 className="text-xl font-semibold mb-2">No workflows found</h3>
      <p className="text-muted-foreground mb-6">
        You don't have any workflows yet. Create your first workflow to get started.
      </p>
      <div className="flex gap-4">
        <Button onClick={onCreateClick}>
          <Plus className="h-4 w-4 mr-2" /> Create First Workflow
        </Button>
      </div>
    </div>
  );
};

export default WorkflowsEmptyState;
