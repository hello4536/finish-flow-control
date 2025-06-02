
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileUp } from "lucide-react";

interface WorkflowsHeaderProps {
  onCreateClick: () => void;
  onImportClick: () => void;
}

const WorkflowsHeader: React.FC<WorkflowsHeaderProps> = ({
  onCreateClick,
  onImportClick
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Workflows
        </h1>
        <p className="text-slate-600 mt-2 font-medium">
          Manage and optimize your production workflows across all trades
        </p>
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          onClick={onImportClick} 
          className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-white transition-all duration-300"
        >
          <FileUp className="h-5 w-5" />
          Import
        </Button>
        <Button 
          onClick={onCreateClick} 
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <PlusCircle className="h-5 w-5" />
          Create Workflow
        </Button>
      </div>
    </div>
  );
};

export default WorkflowsHeader;
