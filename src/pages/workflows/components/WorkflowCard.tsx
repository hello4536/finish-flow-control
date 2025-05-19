
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
import { ChevronDown, ChevronRight, Clock, Layers, Activity } from "lucide-react";
import EditWorkflowDialog from "./EditWorkflowDialog";
import WorkflowSummary from "./WorkflowSummary";
import WorkflowStepsList from "./WorkflowStepsList";
import WorkflowActions from "./WorkflowActions";
import { useWorkflowOperations } from "../hooks/useWorkflowOperations";
import { Step, STATUS_COLORS, TRADE_COLORS } from "../utils/types";
import { formatDistanceToNow } from "date-fns";

interface WorkflowCardProps {
  id: string;
  name: string;
  description: string | null;
  steps: Step[];
  trade: string;
  activeJobs: number;
  status?: string;
  created_at?: string;
  onUpdate: () => void;
}

const WorkflowCard: React.FC<WorkflowCardProps> = ({
  id,
  name,
  description,
  steps,
  trade,
  activeJobs,
  status = "active",
  created_at,
  onUpdate,
}) => {
  const [expanded, setExpanded] = useState(false);
  const { editDialogOpen, setEditDialogOpen, handleDuplicate, handleEdit, handleDelete } = 
    useWorkflowOperations(
      { id, name, description, steps, trade, active_jobs: activeJobs, status },
      onUpdate
    );

  // Get appropriate color for the status
  const statusColor = STATUS_COLORS[status as keyof typeof STATUS_COLORS] || STATUS_COLORS.active;
  const tradeColor = TRADE_COLORS[trade] || "";

  return (
    <>
      <Card className={`card-hover transition-all duration-300 border-l-4 ${tradeColor}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{name}</CardTitle>
            <div className="flex items-center gap-2">
              <Badge 
                className={`${statusColor} border px-2 py-0.5 text-xs font-medium capitalize`}
              >
                {status}
              </Badge>
              <Badge className="bg-blue-50 text-blue-800 hover:bg-blue-100">{trade}</Badge>
            </div>
          </div>
          <CardDescription>{description || "No description"}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm">
            <div className="flex flex-col gap-2">
              <WorkflowSummary stepsCount={steps.length} activeJobs={activeJobs} />
              {created_at && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <Clock className="h-3 w-3" />
                  <span>Created {formatDistanceToNow(new Date(created_at))} ago</span>
                </div>
              )}
            </div>
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
              <div className="grid gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Workflow Steps</span>
                </div>
                <WorkflowStepsList steps={steps} />

                {activeJobs > 0 && (
                  <div className="flex items-center gap-2 mt-1">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      This workflow is currently used in <strong>{activeJobs}</strong> active jobs
                    </span>
                  </div>
                )}
              </div>
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
          active_jobs: activeJobs,
          status: status as any
        }}
        onSubmit={handleEdit}
        onDelete={handleDelete}
      />
    </>
  );
};

export default WorkflowCard;
