
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const JobsHeader: React.FC = () => {
  const { toast } = useToast();

  const handleAddNewJob = () => {
    toast({
      title: "Add New Job",
      description: "This feature is coming soon. Job creation form will be implemented here.",
    });
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-3xl font-bold tracking-tight">Jobs</h2>
      <div className="mt-2 flex items-center space-x-2 sm:mt-0">
        <Button className="gap-2" onClick={handleAddNewJob}>
          <Plus className="h-4 w-4" /> Add New Job
        </Button>
      </div>
    </div>
  );
};

export default JobsHeader;
