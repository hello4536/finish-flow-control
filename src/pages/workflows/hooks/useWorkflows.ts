
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Workflow, Step, getTradeFilter } from "../utils/types";
import { Json } from "@/integrations/supabase/types";

export const useWorkflows = () => {
  const { toast } = useToast();
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWorkflows = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("workflows")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        // Parse JSONB steps field
        const parsedData = data.map(workflow => ({
          ...workflow,
          steps: workflow.steps as unknown as Step[]
        }));
        setWorkflows(parsedData);
      }
    } catch (error) {
      console.error("Error fetching workflows:", error);
      toast({
        title: "Error fetching workflows",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getWorkflowsByTrade = (trade: string) => {
    const tradeFilter = getTradeFilter(trade);
    return workflows.filter(workflow => workflow.trade === tradeFilter);
  };

  const createWorkflow = async (newWorkflow: Omit<Workflow, 'id'>) => {
    try {
      const workflowToInsert = {
        name: newWorkflow.name,
        description: newWorkflow.description,
        steps: newWorkflow.steps as unknown as Json,
        trade: newWorkflow.trade,
        active_jobs: 0,
        workflow_number: `WF-${Math.floor(Math.random() * 10000)}`,
        status: 'active'
      };
      
      const { data, error } = await supabase
        .from('workflows')
        .insert(workflowToInsert)
        .select();
      
      if (error) throw error;
      
      toast({
        title: "Workflow created",
        description: "Your new workflow has been created successfully.",
      });
      
      await fetchWorkflows();
      return true;
    } catch (error) {
      console.error("Error creating workflow:", error);
      toast({
        title: "Error creating workflow",
        description: "Please try again later.",
        variant: "destructive",
      });
      return false;
    }
  };

  const exportWorkflows = async (activeTab: string) => {
    try {
      const selectedWorkflows = getWorkflowsByTrade(activeTab);
      if (selectedWorkflows.length === 0) {
        toast({
          title: "No workflows to export",
          description: "There are no workflows in this category to export.",
          variant: "destructive",
        });
        return;
      }

      // Create JSON file for download
      const workflowsJson = JSON.stringify(selectedWorkflows, null, 2);
      const blob = new Blob([workflowsJson], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${activeTab}-workflows.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Update last_exported_at timestamp in database
      for (const workflow of selectedWorkflows) {
        await supabase
          .from('workflows')
          .update({ last_exported_at: new Date().toISOString() })
          .eq('id', workflow.id);
      }

      toast({
        title: "Workflows exported",
        description: `Successfully exported ${selectedWorkflows.length} workflows.`,
      });
    } catch (error) {
      console.error("Error exporting workflows:", error);
      toast({
        title: "Error exporting workflows",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const importWorkflows = async (importedWorkflows: any[]) => {
    try {
      if (!importedWorkflows.length) {
        toast({
          title: "No workflows to import",
          description: "The selected file does not contain any valid workflows.",
          variant: "destructive",
        });
        return false;
      }

      // Format workflows for import - ensure steps are properly formatted
      const workflowsToInsert = importedWorkflows.map(wf => {
        return {
          name: wf.name,
          description: wf.description,
          steps: wf.steps || [] as unknown as Json,
          trade: wf.trade,
          active_jobs: wf.active_jobs || 0,
          workflow_number: `WF-${Math.floor(Math.random() * 10000)}`,
          status: 'active',
          last_imported_at: new Date().toISOString()
        };
      });

      const { data, error } = await supabase
        .from('workflows')
        .insert(workflowsToInsert)
        .select();

      if (error) throw error;

      toast({
        title: "Workflows imported",
        description: `Successfully imported ${workflowsToInsert.length} workflows.`,
      });

      await fetchWorkflows();
      return true;
    } catch (error) {
      console.error("Error importing workflows:", error);
      toast({
        title: "Error importing workflows",
        description: "Please try again later.",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    fetchWorkflows();
  }, []);

  return {
    workflows,
    isLoading,
    fetchWorkflows,
    getWorkflowsByTrade,
    createWorkflow,
    exportWorkflows,
    importWorkflows
  };
};
