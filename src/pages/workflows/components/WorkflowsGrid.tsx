
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import WorkflowCard from "./WorkflowCard";
import { Workflow } from "../utils/types";

interface WorkflowsGridProps {
  workflows: Workflow[];
  filteredWorkflows: Workflow[];
  trade: string;
  onUpdate: () => void;
  onCreateClick: () => void;
  searchQuery: string;
}

const WorkflowsGrid: React.FC<WorkflowsGridProps> = ({ 
  workflows, 
  filteredWorkflows,
  trade, 
  onUpdate,
  onCreateClick,
  searchQuery
}) => {
  // Display message when no workflows match search
  if (searchQuery && filteredWorkflows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h3 className="text-lg font-medium mb-2">No matching workflows found</h3>
        <p className="text-muted-foreground mb-4">
          Try adjusting your search term or create a new workflow
        </p>
        <Button onClick={onCreateClick}>Create New Workflow</Button>
      </div>
    );
  }
  
  // Workflows to display - either filtered or all
  const displayedWorkflows = searchQuery ? filteredWorkflows : workflows;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {displayedWorkflows.map((workflow) => (
        <WorkflowCard
          key={workflow.id}
          id={workflow.id}
          name={workflow.name}
          description={workflow.description}
          steps={workflow.steps}
          trade={workflow.trade}
          activeJobs={workflow.active_jobs}
          status={workflow.status}
          created_at={workflow.created_at}
          onUpdate={onUpdate}
        />
      ))}
      <Card className="flex flex-col items-center justify-center card-hover border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-8">
          <div className="rounded-full bg-primary/10 p-3 mb-4">
            <Plus className="h-6 w-6 text-primary" />
          </div>
          <p className="text-lg font-medium">Add {trade} Workflow</p>
          <p className="text-sm text-muted-foreground text-center mt-1">
            Create a new workflow template for your {trade.toLowerCase()} processes
          </p>
          <Button className="mt-4" onClick={onCreateClick}>Create Workflow</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkflowsGrid;
