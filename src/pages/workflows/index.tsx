
import React, { useState, useMemo } from "react";
import { useWorkflows } from "./hooks/useWorkflows";
import WorkflowsHeader from "./components/WorkflowsHeader";
import WorkflowsEmptyState from "./components/WorkflowsEmptyState";
import WorkflowsLoading from "./components/WorkflowsLoading";
import WorkflowsStatistics from "./components/WorkflowsStatistics";
import WorkflowsTabs from "./components/WorkflowsTabs";
import CreateWorkflowDialog from "./components/CreateWorkflowDialog";
import ImportWorkflowDialog from "./components/ImportWorkflowDialog";

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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="container mx-auto px-6 py-8">
          <WorkflowsLoading />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-8 space-y-8">
        <WorkflowsHeader 
          onCreateClick={() => setCreateDialogOpen(true)}
          onImportClick={() => setImportDialogOpen(true)}
        />

        {workflows.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg">
            <WorkflowsStatistics workflows={workflows} isLoading={isLoading} />
          </div>
        )}

        {workflows.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg">
            <WorkflowsEmptyState 
              onCreateClick={() => setCreateDialogOpen(true)}
            />
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg">
            <WorkflowsTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              workflows={workflows}
              getWorkflowsByTrade={getWorkflowsByTrade}
              getFilteredWorkflows={getFilteredWorkflows}
              onCreateClick={() => setCreateDialogOpen(true)}
              onImportClick={() => setImportDialogOpen(true)}
              onExportClick={exportWorkflows}
              fetchWorkflows={fetchWorkflows}
            />
          </div>
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
    </div>
  );
};

export default Workflows;
