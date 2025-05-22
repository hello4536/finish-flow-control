import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
const FormSchema = z.object({
  inspection_id: z.string().min(1, "Inspection ID is required"),
  date: z.date({
    required_error: "Inspection date is required"
  }),
  product: z.string().min(1, "Product name is required"),
  inspector: z.string().min(1, "Inspector name is required"),
  status: z.enum(["Passed", "Failed", "Pending"], {
    required_error: "Status is required"
  }),
  notes: z.string().optional()
});
type FormValues = z.infer<typeof FormSchema>;
interface AddInspectionDialogProps {
  onAddInspection: (data: Omit<FormValues, "date"> & {
    date: string;
  }) => void;
}
export default function AddInspectionDialog({
  onAddInspection
}: AddInspectionDialogProps) {
  const [open, setOpen] = React.useState(false);
  const {
    toast
  } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      inspection_id: `INS-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      notes: ""
    }
  });
  function onSubmit(data: FormValues) {
    // Format date as YYYY-MM-DD
    const formattedDate = format(data.date, "yyyy-MM-dd");
    onAddInspection({
      ...data,
      date: formattedDate
    });
    toast({
      title: "Inspection added",
      description: `Inspection ${data.inspection_id} has been created`
    });
    form.reset({
      inspection_id: `INS-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      notes: ""
    });
    setOpen(false);
  }
  return <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 text-white bg-purple-600 hover:bg-purple-500">
          <Plus className="h-4 w-4" /> Add Inspection
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Quality Inspection</DialogTitle>
          <DialogDescription>
            Enter the details for the new quality inspection.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="inspection_id" render={({
            field
          }) => <FormItem>
                  <FormLabel>Inspection ID</FormLabel>
                  <FormControl>
                    <Input placeholder="INS-001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
            
            <FormField control={form.control} name="date" render={({
            field
          }) => <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus className="p-3 pointer-events-auto" />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>} />
            
            <FormField control={form.control} name="product" render={({
            field
          }) => <FormItem>
                  <FormLabel>Product</FormLabel>
                  <FormControl>
                    <Input placeholder="Product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
            
            <FormField control={form.control} name="inspector" render={({
            field
          }) => <FormItem>
                  <FormLabel>Inspector</FormLabel>
                  <FormControl>
                    <Input placeholder="Inspector name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
            
            <FormField control={form.control} name="status" render={({
            field
          }) => <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select inspection status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Passed">Passed</SelectItem>
                      <SelectItem value="Failed">Failed</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>} />
            
            <FormField control={form.control} name="notes" render={({
            field
          }) => <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter any additional notes here" className="resize-none" {...field} />
                  </FormControl>
                  <FormDescription>
                    Optional notes about the inspection.
                  </FormDescription>
                  <FormMessage />
                </FormItem>} />
            
            <DialogFooter>
              <Button type="submit">Create Inspection</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>;
}