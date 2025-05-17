
import React from "react";
import { Step } from "../utils/types";

interface WorkflowStepProps {
  step: Step;
}

const WorkflowStep: React.FC<WorkflowStepProps> = ({ step }) => {
  return (
    <div className="flex items-center">
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
        {step.id}
      </div>
      <div className="ml-2">{step.name}</div>
    </div>
  );
};

export default WorkflowStep;
