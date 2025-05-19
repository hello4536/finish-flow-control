
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface WorkflowSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const WorkflowSearch: React.FC<WorkflowSearchProps> = ({ 
  searchQuery, 
  onSearchChange 
}) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type="text"
        placeholder="Search workflows..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 w-full md:w-[300px]"
      />
    </div>
  );
};

export default WorkflowSearch;
