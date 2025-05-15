
import React, { useState } from "react";
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
import { Search } from "lucide-react";
import JobsTable from "./JobsTable";
import { useToast } from "@/hooks/use-toast";

const JobsList: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

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

  const handleRefresh = () => {
    toast({
      title: "Refreshing Jobs",
      description: "Job list refreshed successfully.",
    });
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="onhold">On Hold</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleExport}>Export</Button>
              <Button variant="outline" size="sm" onClick={handleFilter}>Filter</Button>
              <Button size="sm" onClick={handleRefresh}>Refresh</Button>
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
