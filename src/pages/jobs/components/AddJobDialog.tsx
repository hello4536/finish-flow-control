
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

interface AddJobDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface JobFormData {
  name: string;
  description: string;
  client: string;
  assigned_to: string;
  priority: string;
  due_date: string;
  estimated_hours: number;
}

const AddJobDialog: React.FC<AddJobDialogProps> = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<JobFormData>();

  const onSubmit = async (data: JobFormData) => {
    try {
      // Here you would typically save to your database
      console.log("Creating job:", data);
      
      toast({
        title: "Job Created Successfully",
        description: `Job "${data.name}" has been created and assigned to ${data.assigned_to}.`
      });
      
      reset();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create job. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Create New Job
          </DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new refinishing job or project.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Job Name *</Label>
              <Input
                id="name"
                {...register("name", { required: "Job name is required" })}
                placeholder="e.g., Kitchen Cabinet Refinishing"
              />
              {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="client">Client Name *</Label>
              <Input
                id="client"
                {...register("client", { required: "Client name is required" })}
                placeholder="e.g., John Smith"
              />
              {errors.client && <p className="text-sm text-red-600">{errors.client.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Describe the job details, materials needed, special requirements..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="assigned_to">Assigned To</Label>
              <Input
                id="assigned_to"
                {...register("assigned_to")}
                placeholder="Employee name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="estimated_hours">Estimated Hours</Label>
              <Input
                id="estimated_hours"
                type="number"
                step="0.5"
                min="0"
                {...register("estimated_hours", { valueAsNumber: true })}
                placeholder="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="due_date">Due Date</Label>
            <Input
              id="due_date"
              type="date"
              {...register("due_date")}
            />
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            >
              Create Job
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddJobDialog;
