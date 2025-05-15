
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const JobsHeader: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-3xl font-bold tracking-tight">Jobs</h2>
      <div className="mt-2 flex items-center space-x-2 sm:mt-0">
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Add New Job
        </Button>
      </div>
    </div>
  );
};

export default JobsHeader;
