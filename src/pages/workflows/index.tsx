
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Plus, Import, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import WorkflowsGrid from "./components/WorkflowsGrid";
import WorkflowSeeder from "./components/WorkflowSeeder";
import CreateWorkflowDialog from "./components/CreateWorkflowDialog";
import ImportWorkflowDialog from "./components/ImportWorkflowDialog";
import { Json } from "@/integrations/supabase/types";

// Define the Step interface to match what Supabase expects
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

const Workflows: React.FC = () => {
  const { toast } = useToast();
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("wood");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const tradeCategories = ["Wood Finishing", "Auto Body", "Interior Paint", "Exterior Paint"];
  const tradeKeys = ["wood", "auto", "interior", "exterior"];

  useEffect(() => {
    fetchWorkflows();
  }, []);

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
    let tradeFilter = "";
    
    switch(trade) {
      case "wood":
        tradeFilter = "Wood Finishing";
        break;
      case "auto":
        tradeFilter = "Auto Body";
        break;
      case "interior":
        tradeFilter = "Interior Paint";
        break;
      case "exterior":
        tradeFilter = "Exterior Paint";
        break;
    }
    
    return workflows.filter(workflow => workflow.trade === tradeFilter);
  };

  const handleCreateWorkflow = async (newWorkflow: Omit<Workflow, 'id'>) => {
    try {
      // Convert Step[] to a Json type for Supabase to store correctly as JSON
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
      
      fetchWorkflows();
      setCreateDialogOpen(false);
    } catch (error) {
      console.error("Error creating workflow:", error);
      toast({
        title: "Error creating workflow",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const exportWorkflows = async () => {
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

  const handleImportWorkflows = async (importedWorkflows: any[]) => {
    try {
      if (!importedWorkflows.length) {
        toast({
          title: "No workflows to import",
          description: "The selected file does not contain any valid workflows.",
          variant: "destructive",
        });
        return;
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

      fetchWorkflows();
      setImportDialogOpen(false);
    } catch (error) {
      console.error("Error importing workflows:", error);
      toast({
        title: "Error importing workflows",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Workflows</h2>
        <div className="mt-2 flex items-center space-x-2 sm:mt-0">
          <Button className="gap-2" onClick={() => setCreateDialogOpen(true)}>
            <Plus className="h-4 w-4" /> Create Workflow
          </Button>
          {workflows.length === 0 && <WorkflowSeeder onSeed={fetchWorkflows} />}
        </div>
      </div>

      {workflows.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <h3 className="text-xl font-semibold mb-2">No workflows found</h3>
          <p className="text-muted-foreground mb-6">
            You don't have any workflows yet. Create your first workflow or use the seeder to add sample data.
          </p>
          <div className="flex gap-4">
            <Button onClick={() => setCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" /> Create First Workflow
            </Button>
            <WorkflowSeeder onSeed={fetchWorkflows} />
          </div>
        </div>
      ) : (
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="wood">Wood Finishing</TabsTrigger>
              <TabsTrigger value="auto">Auto Body</TabsTrigger>
              <TabsTrigger value="interior">Interior Paint</TabsTrigger>
              <TabsTrigger value="exterior">Exterior Paint</TabsTrigger>
            </TabsList>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setImportDialogOpen(true)}>
                <Import className="h-4 w-4 mr-2" /> Import
              </Button>
              <Button variant="outline" size="sm" onClick={exportWorkflows}>
                <FileText className="h-4 w-4 mr-2" /> Export
              </Button>
            </div>
          </div>

          {tradeKeys.map((tradeKey, index) => (
            <TabsContent key={tradeKey} value={tradeKey} className="mt-6">
              <WorkflowsGrid 
                workflows={getWorkflowsByTrade(tradeKey)} 
                trade={tradeCategories[index]}
                onUpdate={fetchWorkflows}
              />
            </TabsContent>
          ))}
        </Tabs>
      )}

      <CreateWorkflowDialog 
        open={createDialogOpen} 
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreateWorkflow}
      />

      <ImportWorkflowDialog
        open={importDialogOpen}
        onOpenChange={setImportDialogOpen}
        onImport={handleImportWorkflows}
      />
    </div>
  );
};

export default Workflows;
