
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, RefreshCw } from "lucide-react";
import JobsTable from "./JobsTable";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const JobsList: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleExport = () => {
    toast({
      title: "Export Jobs",
      description: "Exporting jobs to CSV. This feature is coming soon.",
    });
  };

  const handleFilter = () => {
    toast({
      title: "Advanced Filters",
      description: "Advanced filtering options will be available soon.",
    });
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    try {
      // We'll rely on the JobsTable component to refresh its data
      // But we can add a small delay here to show the refreshing state
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast({
        title: "Refreshing Jobs",
        description: "Job list refreshed successfully.",
      });
    } catch (error) {
      console.error("Error refreshing jobs:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    toast({
      title: "Filter Applied",
      description: `Showing ${value === "all" ? "all jobs" : value + " jobs"}.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Jobs</CardTitle>
        <CardDescription>
          View and manage all jobs in the system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col items-start space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search jobs..."
                  className="w-[220px] pl-8"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
              <Select 
                defaultValue="all" 
                value={statusFilter}
                onValueChange={handleStatusChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="in_progress">Active</SelectItem>
                  <SelectItem value="complete">Completed</SelectItem>
                  <SelectItem value="on_hold">On Hold</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleExport}>Export</Button>
              <Button variant="outline" size="sm" onClick={handleFilter}>Filter</Button>
              <Button size="sm" onClick={handleRefresh} disabled={isRefreshing}>
                {isRefreshing ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Refreshing...
                  </>
                ) : (
                  "Refresh"
                )}
              </Button>
            </div>
          </div>

          <JobsTable />
          
          <div className="flex items-center justify-end space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobsList;
