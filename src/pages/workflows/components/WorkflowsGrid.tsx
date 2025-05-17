
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import WorkflowCard from "./WorkflowCard";

interface Step {
  id: number;
  name: string;
}

interface Workflow {
  id: string;
  name: string;
  description: string | null;
  steps: Step[];
  trade: string;
  active_jobs: number;
}

interface WorkflowsGridProps {
  workflows: Workflow[];
  trade: string;
  onUpdate: () => void;
}

const WorkflowsGrid: React.FC<WorkflowsGridProps> = ({ workflows, trade, onUpdate }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {workflows.map((workflow) => (
        <WorkflowCard
          key={workflow.id}
          id={workflow.id}
          name={workflow.name}
          description={workflow.description}
          steps={workflow.steps}
          trade={workflow.trade}
          activeJobs={workflow.active_jobs}
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
          <Button className="mt-4">Create Workflow</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkflowsGrid;
