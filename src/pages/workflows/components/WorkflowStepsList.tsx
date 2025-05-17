
import React from "react";
import { Step } from "../utils/types";
import WorkflowStep from "./WorkflowStep";

interface WorkflowStepsListProps {
  steps: Step[];
}

const WorkflowStepsList: React.FC<WorkflowStepsListProps> = ({ steps }) => {
  return (
    <div className="mt-4 border-t pt-4">
      <h4 className="font-medium mb-2">Workflow Steps</h4>
      <div className="space-y-2">
        {steps.map((step) => (
          <WorkflowStep key={step.id} step={step} />
        ))}
        {steps.length === 0 && (
          <div className="text-muted-foreground">No steps defined</div>
        )}
      </div>
    </div>
  );
};

export default WorkflowStepsList;
