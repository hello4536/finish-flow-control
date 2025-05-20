
import React, { useState, useMemo } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import { useWorkflows } from "./hooks/useWorkflows";
import { TRADE_CATEGORIES, TRADE_KEYS, WorkflowStatistics } from "./utils/types";
import WorkflowsGrid from "./components/WorkflowsGrid";
import WorkflowsHeader from "./components/WorkflowsHeader";
import WorkflowsEmptyState from "./components/WorkflowsEmptyState";
import WorkflowsTabsActions from "./components/WorkflowsTabsActions";
import CreateWorkflowDialog from "./components/CreateWorkflowDialog";
import ImportWorkflowDialog from "./components/ImportWorkflowDialog";
import WorkflowSearch from "./components/WorkflowSearch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layers, Activity, Clock, CheckCircle } from "lucide-react";

const Workflows: React.FC = () => {
  const [activeTab, setActiveTab] = useState("wood");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const {
    workflows,
    isLoading,
    fetchWorkflows,
    getWorkflowsByTrade,
    createWorkflow,
    exportWorkflows,
    importWorkflows
  } = useWorkflows();

  // Calculate statistics
  const statistics: WorkflowStatistics = useMemo(() => {
    const totalWorkflows = workflows.length;
    const activeJobs = workflows.reduce((sum, w) => sum + w.active_jobs, 0);
    const avgStepsPerWorkflow = workflows.length > 0
      ? workflows.reduce((sum, w) => sum + w.steps.length, 0) / workflows.length
      : 0;
    const efficiency = 85; // This would come from actual data in a real implementation
    
    return {
      totalWorkflows,
      activeJobs,
      completedJobs: Math.round(activeJobs * 0.7), // Placeholder calculation
      efficiency
    };
  }, [workflows]);

  // Filter workflows based on search query
  const getFilteredWorkflows = (trade: string) => {
    const tradeWorkflows = getWorkflowsByTrade(trade);
    
    if (!searchQuery) return tradeWorkflows;
    
    return tradeWorkflows.filter(workflow => 
      workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (workflow.description && workflow.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const handleCreateWorkflow = async (newWorkflow: any) => {
    const success = await createWorkflow(newWorkflow);
    if (success) {
      setCreateDialogOpen(false);
    }
  };

  const handleImportWorkflows = async (importedWorkflows: any[]) => {
    const success = await importWorkflows(importedWorkflows);
    if (success) {
      setImportDialogOpen(false);
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
      <WorkflowsHeader 
        onCreateClick={() => setCreateDialogOpen(true)}
        onImportClick={() => setImportDialogOpen(true)}
      />

      {workflows.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Workflows</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{statistics.totalWorkflows}</span>
                <Layers className="h-5 w-5 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{statistics.activeJobs}</span>
                <Activity className="h-5 w-5 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{statistics.completedJobs}</span>
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Efficiency Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{statistics.efficiency}%</span>
                <Clock className="h-5 w-5 text-amber-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {workflows.length === 0 ? (
        <WorkflowsEmptyState 
          onCreateClick={() => setCreateDialogOpen(true)}
        />
      ) : (
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <TabsList>
              {TRADE_KEYS.map((tradeKey, index) => (
                <TabsTrigger key={tradeKey} value={tradeKey}>
                  {TRADE_CATEGORIES[index]}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <WorkflowSearch 
                searchQuery={searchQuery} 
                onSearchChange={setSearchQuery} 
              />
              <div className="flex items-center">
                <WorkflowsTabsActions 
                  onImportClick={() => setImportDialogOpen(true)}
                  onExportClick={() => exportWorkflows(activeTab)}
                />
              </div>
            </div>
          </div>

          {TRADE_KEYS.map((tradeKey, index) => {
            const tradeWorkflows = getWorkflowsByTrade(tradeKey);
            const filteredWorkflows = getFilteredWorkflows(tradeKey);
            
            return (
              <TabsContent key={tradeKey} value={tradeKey} className="mt-6">
                <WorkflowsGrid 
                  workflows={tradeWorkflows} 
                  filteredWorkflows={filteredWorkflows}
                  trade={TRADE_CATEGORIES[index]}
                  onUpdate={fetchWorkflows}
                  onCreateClick={() => setCreateDialogOpen(true)}
                  searchQuery={searchQuery}
                />
              </TabsContent>
            );
          })}
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
