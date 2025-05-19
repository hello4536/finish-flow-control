
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import EditWorkflowDialog from "./EditWorkflowDialog";
import WorkflowSummary from "./WorkflowSummary";
import WorkflowStepsList from "./WorkflowStepsList";
import WorkflowActions from "./WorkflowActions";
import { useWorkflowOperations } from "../hooks/useWorkflowOperations";
import { Step } from "../utils/types";

interface WorkflowCardProps {
  id: string;
  name: string;
  description: string | null;
  steps: Step[];
  trade: string;
  activeJobs: number;
  onUpdate: () => void;
}

const WorkflowCard: React.FC<WorkflowCardProps> = ({
  id,
  name,
  description,
  steps,
  trade,
  activeJobs,
  onUpdate,
}) => {
  const [expanded, setExpanded] = useState(false);
  const { editDialogOpen, setEditDialogOpen, handleDuplicate, handleEdit, handleDelete } = 
    useWorkflowOperations(
      { id, name, description, steps, trade, active_jobs: activeJobs },
      onUpdate
    );

  return (
    <>
      <Card className="card-hover">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{name}</CardTitle>
            <Badge className="mr-2">{trade}</Badge>
          </div>
          <CardDescription>{description || "No description"}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm">
            <WorkflowSummary stepsCount={steps.length} activeJobs={activeJobs} />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="gap-1"
            >
              {expanded ? (
                <>
                  Hide Details <ChevronDown className="h-4 w-4" />
                </>
              ) : (
                <>
                  Show Details <ChevronRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>

          {expanded && (
            <div className="mt-4 border-t pt-4">
              <WorkflowStepsList steps={steps} />
              <WorkflowActions 
                onEdit={() => setEditDialogOpen(true)}
                onDuplicate={handleDuplicate}
              />
            </div>
          )}
        </CardContent>
      </Card>

      <EditWorkflowDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        workflow={{
          id,
          name,
          description,
          steps,
          trade,
          active_jobs: activeJobs
        }}
        onSubmit={handleEdit}
        onDelete={handleDelete}
      />
    </>
  );
};

export default WorkflowCard;
