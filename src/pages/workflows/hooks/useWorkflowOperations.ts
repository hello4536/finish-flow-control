
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Workflow, Step, generateWorkflowNumber } from "../utils/types";
import { Json } from "@/integrations/supabase/types";

export const useWorkflowOperations = (workflow: Workflow, onUpdate: () => void) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleDuplicate = async () => {
    try {
      // Convert steps to a format compatible with Supabase's JSON type
      const workflowToInsert = {
        name: `${workflow.name} (Copy)`,
        description: workflow.description,
        steps: workflow.steps as unknown as Json, // Cast to Json type for Supabase
        trade: workflow.trade,
        active_jobs: 0,
        workflow_number: generateWorkflowNumber(),
        status: 'active'
      };

      const { data, error } = await supabase
        .from("workflows")
        .insert(workflowToInsert)
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
      // Update workflow with type-safe object - convert steps to Json type
      const workflowUpdate = {
        name: updatedWorkflow.name,
        description: updatedWorkflow.description,
        steps: updatedWorkflow.steps as unknown as Json // Cast to Json type for Supabase
      };
      
      const { error } = await supabase
        .from("workflows")
        .update(workflowUpdate)
        .eq("id", workflow.id);

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

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("workflows")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Workflow deleted",
        description: "The workflow has been deleted successfully.",
      });
      
      onUpdate();
      setEditDialogOpen(false);
    } catch (error) {
      console.error("Error deleting workflow:", error);
      toast({
        title: "Error deleting workflow",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return {
    editDialogOpen,
    setEditDialogOpen,
    handleDuplicate,
    handleEdit,
    handleDelete
  };
};
