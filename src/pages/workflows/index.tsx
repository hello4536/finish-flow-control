
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
    return <WorkflowsLoading />;
  }

  return (
    <div className="space-y-6">
      <WorkflowsHeader 
        onCreateClick={() => setCreateDialogOpen(true)}
        onImportClick={() => setImportDialogOpen(true)}
      />

      {workflows.length > 0 && (
        <WorkflowsStatistics workflows={workflows} isLoading={isLoading} />
      )}

      {workflows.length === 0 ? (
        <WorkflowsEmptyState 
          onCreateClick={() => setCreateDialogOpen(true)}
        />
      ) : (
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
