
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

const JobsHeader: React.FC = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [jobName, setJobName] = useState("");
  const [jobNumber, setJobNumber] = useState("");
  const [jobStatus, setJobStatus] = useState("upcoming");
  const [trade, setTrade] = useState("Wood Finishing");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!jobName || !jobNumber || !trade) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Insert the new job into the Supabase database
      const { data, error } = await supabase.from("jobs").insert([
        {
          job_number: jobNumber,
          name: jobName,
          trade: trade,
          assigned_to: assignedTo || null,
          due_date: dueDate || null,
          status: jobStatus,
        }
      ]).select();
      
      if (error) {
        throw error;
      }
      
      // Show success toast
      toast({
        title: "Job Created",
        description: `New job "${jobName}" has been created successfully.`,
      });
      
      // Reset form and close dialog
      resetForm();
      setOpen(false);
      
      // Optionally, you could emit an event or use a context to refresh the jobs list
      
    } catch (error: any) {
      console.error("Error creating job:", error);
      toast({
        title: "Error creating job",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setJobName("");
    setJobNumber("");
    setJobStatus("upcoming");
    setTrade("Wood Finishing");
    setAssignedTo("");
    setDueDate("");
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-3xl font-bold tracking-tight">Jobs</h2>
      <div className="mt-2 flex items-center space-x-2 sm:mt-0">
        <Dialog open={open} onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Add New Job
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Add New Job</DialogTitle>
                <DialogDescription>
                  Fill in the details to create a new job.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="job-number">Job Number</Label>
                  <Input 
                    id="job-number" 
                    value={jobNumber} 
                    onChange={(e) => setJobNumber(e.target.value)} 
                    placeholder="E.g., J-1001" 
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="job-name">Job Name</Label>
                  <Input 
                    id="job-name" 
                    value={jobName} 
                    onChange={(e) => setJobName(e.target.value)} 
                    placeholder="Enter job name" 
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="trade">Trade</Label>
                  <Select 
                    value={trade} 
                    onValueChange={setTrade}
                  >
                    <SelectTrigger id="trade">
                      <SelectValue placeholder="Select trade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Wood Finishing">Wood Finishing</SelectItem>
                      <SelectItem value="Wood Refinishing">Wood Refinishing</SelectItem>
                      <SelectItem value="Exterior Paint">Exterior Paint</SelectItem>
                      <SelectItem value="Interior Paint">Interior Paint</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="assigned-to">Assigned To</Label>
                  <Input 
                    id="assigned-to" 
                    value={assignedTo} 
                    onChange={(e) => setAssignedTo(e.target.value)} 
                    placeholder="Enter assignee name (optional)"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={jobStatus} 
                    onValueChange={setJobStatus}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="on_hold">On Hold</SelectItem>
                      <SelectItem value="complete">Complete</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="due-date">Due Date</Label>
                  <Input 
                    id="due-date" 
                    type="date" 
                    value={dueDate} 
                    onChange={(e) => setDueDate(e.target.value)} 
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Job"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default JobsHeader;
