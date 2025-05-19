
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  requirement_id: z.string().min(1, { message: "Requirement ID is required" }),
  department: z.string().min(1, { message: "Department is required" }),
  equipment: z.string().min(1, { message: "Equipment is required" }),
  standard: z.string().min(1, { message: "Standard is required" }),
  required_by: z.string().min(1, { message: "Requiring agency is required" }),
  last_inspection: z.string().min(1, { message: "Last inspection date is required" }),
  next_inspection: z.string().min(1, { message: "Next inspection date is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  notes: z.string().optional(),
});

const departments = ["Production", "Finishing", "Assembly", "Shipping", "Receiving", "Maintenance", "All"];
const standards = ["ANSI Z87.1", "ANSI S3.19", "N95", "NFPA 70E", "29 CFR 1910.132", "29 CFR 1910.134"];
const agencies = ["OSHA", "EPA", "NIOSH", "NFPA", "Internal Policy", "State Regulation"];

interface AddPPERequirementDialogProps {
  onAddPPERequirement: (data: any) => void;
}

const AddPPERequirementDialog: React.FC<AddPPERequirementDialogProps> = ({ onAddPPERequirement }) => {
  const [open, setOpen] = React.useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      requirement_id: "PPE-" + new Date().getTime().toString().slice(-4),
      department: "",
      equipment: "",
      standard: "",
      required_by: "",
      last_inspection: new Date().toISOString().slice(0, 10),
      next_inspection: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().slice(0, 10),
      status: "Pending Review",
      notes: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    onAddPPERequirement(data);
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-1">
          <PlusCircle className="h-4 w-4" />
          Add PPE Requirement
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add PPE Requirement</DialogTitle>
          <DialogDescription>
            Enter information about the required personal protective equipment.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="requirement_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Requirement ID</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="PPE-0001" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Compliant">Compliant</SelectItem>
                        <SelectItem value="Non-Compliant">Non-Compliant</SelectItem>
                        <SelectItem value="Pending Review">Pending Review</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Department" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="equipment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Equipment</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Safety Glasses, Respirator, etc." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="standard"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Standard</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Standard" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {standards.map((std) => (
                          <SelectItem key={std} value={std}>
                            {std}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="required_by"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Required By</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Agency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {agencies.map((agency) => (
                          <SelectItem key={agency} value={agency}>
                            {agency}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="last_inspection"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Inspection</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="next_inspection"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Next Inspection</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Additional details about this requirement" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setOpen(false)} type="button">
                Cancel
              </Button>
              <Button type="submit">Save Requirement</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPPERequirementDialog;
