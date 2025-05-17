
import React, { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import { useWorkflows } from "./hooks/useWorkflows";
import { TRADE_CATEGORIES, TRADE_KEYS } from "./utils/types";
import WorkflowsGrid from "./components/WorkflowsGrid";
import WorkflowsHeader from "./components/WorkflowsHeader";
import WorkflowsEmptyState from "./components/WorkflowsEmptyState";
import WorkflowsTabsActions from "./components/WorkflowsTabsActions";
import CreateWorkflowDialog from "./components/CreateWorkflowDialog";
import ImportWorkflowDialog from "./components/ImportWorkflowDialog";

const Workflows: React.FC = () => {
  const [activeTab, setActiveTab] = useState("wood");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  
  const {
    workflows,
    isLoading,
    fetchWorkflows,
    getWorkflowsByTrade,
    createWorkflow,
    exportWorkflows,
    importWorkflows
  } = useWorkflows();

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
        totalWorkflows={workflows.length} 
        onCreateClick={() => setCreateDialogOpen(true)}
        onSeed={fetchWorkflows}
      />

      {workflows.length === 0 ? (
        <WorkflowsEmptyState 
          onCreateClick={() => setCreateDialogOpen(true)}
          onSeed={fetchWorkflows}
        />
      ) : (
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between">
            <TabsList>
              {TRADE_KEYS.map((tradeKey, index) => (
                <TabsTrigger key={tradeKey} value={tradeKey}>
                  {TRADE_CATEGORIES[index]}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <WorkflowsTabsActions 
              onImportClick={() => setImportDialogOpen(true)}
              onExportClick={() => exportWorkflows(activeTab)}
            />
          </div>

          {TRADE_KEYS.map((tradeKey, index) => (
            <TabsContent key={tradeKey} value={tradeKey} className="mt-6">
              <WorkflowsGrid 
                workflows={getWorkflowsByTrade(tradeKey)} 
                trade={TRADE_CATEGORIES[index]}
                onUpdate={fetchWorkflows}
                onCreateClick={() => setCreateDialogOpen(true)}
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
