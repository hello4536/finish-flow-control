
import React from "react";
import { Clipboard, Database } from "lucide-react";
import { Step } from "../utils/types";

interface WorkflowSummaryProps {
  stepsCount: number;
  activeJobs: number;
}

const WorkflowSummary: React.FC<WorkflowSummaryProps> = ({ stepsCount, activeJobs }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center">
        <Clipboard className="h-4 w-4 mr-1 text-muted-foreground" />
        <span>{stepsCount} steps</span>
      </div>
      <div className="flex items-center">
        <Database className="h-4 w-4 mr-1 text-muted-foreground" />
        <span>{activeJobs} active jobs</span>
      </div>
    </div>
  );
};

export default WorkflowSummary;
