
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import WorkflowsGrid from "./components/WorkflowsGrid";
import WorkflowSeeder from "./components/WorkflowSeeder";

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
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Create Workflow
          </Button>
          {workflows.length === 0 && <WorkflowSeeder />}
        </div>
      </div>

      {workflows.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <h3 className="text-xl font-semibold mb-2">No workflows found</h3>
          <p className="text-muted-foreground mb-6">
            You don't have any workflows yet. Create your first workflow or use the seeder to add sample data.
          </p>
          <div className="flex gap-4">
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Create First Workflow
            </Button>
            <WorkflowSeeder />
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
              <Button variant="outline" size="sm">
                Import
              </Button>
              <Button variant="outline" size="sm">
                Export
              </Button>
            </div>
          </div>

          {tradeKeys.map((tradeKey, index) => (
            <TabsContent key={tradeKey} value={tradeKey} className="mt-6">
              <WorkflowsGrid 
                workflows={getWorkflowsByTrade(tradeKey)} 
                trade={tradeCategories[index]}
              />
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
};

export default Workflows;
