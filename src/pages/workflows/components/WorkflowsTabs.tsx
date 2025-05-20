
import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { TRADE_CATEGORIES, TRADE_KEYS } from "../utils/types";
import WorkflowSearch from "./WorkflowSearch";
import WorkflowsTabsActions from "./WorkflowsTabsActions";
import WorkflowsGrid from "./WorkflowsGrid";
import { Workflow } from "../utils/types";

interface WorkflowsTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  workflows: Workflow[];
  getWorkflowsByTrade: (trade: string) => Workflow[];
  getFilteredWorkflows: (trade: string) => Workflow[];
  onCreateClick: () => void;
  onImportClick: () => void;
  onExportClick: (tab: string) => void;
  fetchWorkflows: () => void;
}

const WorkflowsTabs: React.FC<WorkflowsTabsProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  workflows,
  getWorkflowsByTrade,
  getFilteredWorkflows,
  onCreateClick,
  onImportClick,
  onExportClick,
  fetchWorkflows,
}) => {
  return (
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
              onImportClick={onImportClick}
              onExportClick={() => onExportClick(activeTab)}
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
              onCreateClick={onCreateClick}
              searchQuery={searchQuery}
            />
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export default WorkflowsTabs;
