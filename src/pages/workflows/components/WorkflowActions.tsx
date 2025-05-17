
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Copy } from "lucide-react";

interface WorkflowActionsProps {
  onEdit: () => void;
  onDuplicate: () => void;
}

const WorkflowActions: React.FC<WorkflowActionsProps> = ({ onEdit, onDuplicate }) => {
  return (
    <div className="mt-4 flex justify-end space-x-2">
      <Button variant="outline" size="sm" onClick={onEdit}>
        <Edit className="h-4 w-4 mr-2" /> Edit
      </Button>
      <Button size="sm" onClick={onDuplicate}>
        <Copy className="h-4 w-4 mr-2" /> Duplicate
      </Button>
    </div>
  );
};

export default WorkflowActions;
