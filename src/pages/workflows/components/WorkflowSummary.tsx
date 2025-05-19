
import React from "react";
import { Layers, Activity } from "lucide-react";

interface WorkflowSummaryProps {
  stepsCount: number;
  activeJobs: number;
}

const WorkflowSummary: React.FC<WorkflowSummaryProps> = ({ stepsCount, activeJobs }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1.5">
        <Layers className="h-4 w-4 text-blue-600" />
        <span className="text-sm">
          <strong>{stepsCount}</strong> Steps
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <Activity className="h-4 w-4 text-emerald-600" />
        <span className="text-sm">
          <strong>{activeJobs}</strong> Active Jobs
        </span>
      </div>
    </div>
  );
};

export default WorkflowSummary;
