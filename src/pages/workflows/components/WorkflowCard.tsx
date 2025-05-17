
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
import { ChevronDown, ChevronRight, Clipboard, Database, Edit, Copy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import EditWorkflowDialog from "./EditWorkflowDialog";

interface Step {
  id: number;
  name: string;
}

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
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleDuplicate = async () => {
    try {
      const { data, error } = await supabase
        .from("workflows")
        .insert([
          {
            name: `${name} (Copy)`,
            description,
            steps,
            trade,
            active_jobs: 0,
            workflow_number: `WF-${Math.floor(Math.random() * 10000)}`,
            status: 'active'
          }
        ])
        .select();

      if (error) throw error;

      toast({
        title: "Workflow duplicated",
        description: "The workflow has been duplicated successfully.",
      });
      
      onUpdate();
    } catch (error) {
      console.error("Error duplicating workflow:", error);
      toast({
        title: "Error duplicating workflow",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = async (updatedWorkflow: { name: string; description: string | null; steps: Step[] }) => {
    try {
      const { error } = await supabase
        .from("workflows")
        .update({
          name: updatedWorkflow.name,
          description: updatedWorkflow.description,
          steps: updatedWorkflow.steps
        })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Workflow updated",
        description: "The workflow has been updated successfully.",
      });
      
      onUpdate();
      setEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating workflow:", error);
      toast({
        title: "Error updating workflow",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

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
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Clipboard className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>{steps.length} steps</span>
              </div>
              <div className="flex items-center">
                <Database className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>{activeJobs} active jobs</span>
              </div>
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
              <h4 className="font-medium mb-2">Workflow Steps</h4>
              <div className="space-y-2">
                {steps.map((step) => (
                  <div key={step.id} className="flex items-center">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                      {step.id}
                    </div>
                    <div className="ml-2">{step.name}</div>
                  </div>
                ))}
                {steps.length === 0 && (
                  <div className="text-muted-foreground">No steps defined</div>
                )}
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <Button variant="outline" size="sm" onClick={() => setEditDialogOpen(true)}>
                  <Edit className="h-4 w-4 mr-2" /> Edit
                </Button>
                <Button size="sm" onClick={handleDuplicate}>
                  <Copy className="h-4 w-4 mr-2" /> Duplicate
                </Button>
              </div>
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
      />
    </>
  );
};

export default WorkflowCard;
