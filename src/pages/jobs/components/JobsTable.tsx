import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { useDevMode } from "@/context/DevModeContext";
interface Job {
  id: string;
  job_number: string;
  name: string;
  current_step: string | null;
  trade: string;
  assigned_to: string | null;
  due_date: string | null;
  status: string;
}
const JobsTable: React.FC = () => {
  const {
    toast
  } = useToast();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const {
    isDevMode
  } = useDevMode();

  // Mock jobs data for dev mode
  const mockJobs: Job[] = [
    {
      id: "1",
      job_number: "WW-2023-001",
      name: "Cherry Table Refinishing",
      current_step: "Stain Application",
      trade: "Woodworking",
      assigned_to: "Thomas Wright",
      due_date: "2025-05-22",
      status: "in_progress"
    }, 
    {
      id: "2",
      job_number: "WW-2023-002",
      name: "Oak Cabinet Restoration",
      current_step: "Surface Preparation",
      trade: "Woodworking",
      assigned_to: "Emily Carpenter",
      due_date: "2025-05-23",
      status: "in_progress"
    }, 
    {
      id: "3",
      job_number: "WW-2023-003",
      name: "Walnut Dining Set Refinish",
      current_step: "Final Coat Polyurethane",
      trade: "Woodworking",
      assigned_to: "Robert Mills",
      due_date: "2025-05-21",
      status: "in_progress"
    }, 
    {
      id: "4",
      job_number: "WW-2023-004",
      name: "Maple Floors Resealing",
      current_step: "Complete",
      trade: "Woodworking",
      assigned_to: "Sarah Turner",
      due_date: "2025-05-18",
      status: "complete"
    }, 
    {
      id: "5",
      job_number: "WW-2023-005",
      name: "Cedar Chest Restoration",
      current_step: "Initial Assessment",
      trade: "Woodworking",
      assigned_to: "James Wood",
      due_date: "2025-05-25",
      status: "upcoming"
    }, 
    {
      id: "6",
      job_number: "WW-2023-006",
      name: "Custom Mahogany Bookshelf",
      current_step: "Client Approval",
      trade: "Woodworking",
      assigned_to: "Thomas Wright",
      due_date: "2025-05-24",
      status: "on_hold"
    }, 
    {
      id: "7",
      job_number: "WW-2023-007",
      name: "Antique Pine Table Repair",
      current_step: "Wood Filler Application",
      trade: "Woodworking",
      assigned_to: "Emily Carpenter",
      due_date: "2025-05-19",
      status: "in_progress"
    }, 
    {
      id: "8",
      job_number: "WW-2023-008",
      name: "Birch Kitchen Countertops",
      current_step: "Sanding",
      trade: "Woodworking",
      assigned_to: "Robert Mills",
      due_date: "2025-05-26",
      status: "upcoming"
    }
  ];
  
  useEffect(() => {
    if (isDevMode) {
      setJobs(mockJobs);
      setIsLoading(false);
      return;
    }
    fetchJobs();
  }, [isDevMode]);
  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const {
        data,
        error
      } = await supabase.from("jobs").select("*").order("created_at", {
        ascending: false
      });
      if (error) {
        throw error;
      }
      if (data) {
        setJobs(data);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast({
        title: "Error fetching jobs",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleViewJob = (jobId: string, jobName: string) => {
    toast({
      title: `Viewing Job: ${jobId}`,
      description: `Details for ${jobName} will be displayed soon.`
    });
  };
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in_progress":
        return <Badge className="bg-amber-500 whitespace-nowrap px-3">In Progress</Badge>;
      case "complete":
        return <Badge className="bg-green-500">Complete</Badge>;
      case "on_hold":
        return <Badge variant="outline" className="bg-red-500 text-white">On Hold</Badge>;
      case "upcoming":
        return <Badge variant="outline">Upcoming</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch (error) {
      return dateString;
    }
  };
  if (isLoading) {
    return <div className="flex justify-center items-center p-8">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>;
  }
  return <div className="rounded-lg border bg-gray-50">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Job ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Current Step</TableHead>
            <TableHead>Trade</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.length > 0 ? jobs.map(job => <TableRow key={job.id}>
                <TableCell className="font-medium">{job.job_number}</TableCell>
                <TableCell>{job.name}</TableCell>
                <TableCell>{job.current_step || "-"}</TableCell>
                <TableCell>{job.trade}</TableCell>
                <TableCell>{job.assigned_to || "-"}</TableCell>
                <TableCell>{formatDate(job.due_date)}</TableCell>
                <TableCell>
                  {getStatusBadge(job.status)}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleViewJob(job.job_number, job.name)}>View</Button>
                </TableCell>
              </TableRow>) : <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                No jobs found. Create your first job by clicking the "Add New Job" button above.
              </TableCell>
            </TableRow>}
        </TableBody>
      </Table>
    </div>;
};
export default JobsTable;
