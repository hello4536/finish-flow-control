import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
const JobsHeader: React.FC = () => {
  const {
    toast
  } = useToast();
  const handleAddNew = () => {
    toast({
      title: "Create New Job",
      description: "The add job form would open here."
    });
  };
  return <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
      <div>
        <h1 className="text-3xl font-bold text-purple-700">Jobs & Projects</h1>
        <p className="text-muted-foreground">
          Manage and track refinishing and restoration projects
        </p>
      </div>
      <div className="flex gap-2 w-full sm:w-auto">
        <div className="relative flex-1 sm:flex-initial">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search jobs..." className="pl-8 w-full sm:w-[250px]" />
        </div>
        <Button onClick={handleAddNew} className="flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-purple-700 text-sm font-semibold">
          <Plus className="h-4 w-4" />
          Add New Job
        </Button>
      </div>
    </div>;
};
export default JobsHeader;