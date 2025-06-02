
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const JobsHeader: React.FC = () => {
  const { toast } = useToast();
  
  const handleAddNew = () => {
    toast({
      title: "Create New Job",
      description: "The add job form would open here."
    });
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Jobs & Projects
        </h1>
        <p className="text-slate-600 mt-2 font-medium">
          Manage and track refinishing and restoration projects
        </p>
      </div>
      <div className="flex gap-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search jobs..." 
            className="pl-8 w-full sm:w-[250px] bg-white/80 backdrop-blur-sm border-slate-200 focus:border-purple-400 focus:ring-purple-400" 
          />
        </div>
        <Button 
          onClick={handleAddNew} 
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 px-6 py-3"
        >
          <Plus className="h-5 w-5" />
          Add New Job
        </Button>
      </div>
    </div>
  );
};

export default JobsHeader;
