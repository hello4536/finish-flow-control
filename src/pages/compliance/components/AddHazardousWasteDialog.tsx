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
  waste_id: z.string().min(1, {
    message: "Waste ID is required"
  }),
  material: z.string().min(1, {
    message: "Material is required"
  }),
  quantity: z.string().min(1, {
    message: "Quantity is required"
  }),
  unit: z.string().min(1, {
    message: "Unit is required"
  }),
  disposal_date: z.string().min(1, {
    message: "Disposal date is required"
  }),
  disposal_method: z.string().min(1, {
    message: "Disposal method is required"
  }),
  handler: z.string().min(1, {
    message: "Handler is required"
  }),
  status: z.string().min(1, {
    message: "Status is required"
  }),
  manifest_number: z.string().optional(),
  notes: z.string().optional()
});

const disposalMethods = ["Licensed Contractor", "Industrial Waste Facility", "On-site Treatment", "Recycling Facility", "Hazardous Waste Landfill"];
const units = ["gallons", "liters", "kg", "lbs", "drums", "containers"];

interface AddHazardousWasteDialogProps {
  onAddHazardousWaste: (data: any) => void;
  children?: React.ReactNode;
}

const AddHazardousWasteDialog: React.FC<AddHazardousWasteDialogProps> = ({
  onAddHazardousWaste,
  children
}) => {
  const [open, setOpen] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      waste_id: "HW-" + new Date().getTime().toString().slice(-4),
      material: "",
      quantity: "",
      unit: "",
      disposal_date: new Date().toISOString().slice(0, 10),
      disposal_method: "",
      handler: "",
      status: "Pending",
      manifest_number: "",
      notes: ""
    }
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    onAddHazardousWaste({
      ...data,
      quantity: parseFloat(data.quantity)
    });
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className="gap-1 bg-purple-600 hover:bg-purple-500">
            <PlusCircle className="h-4 w-4" />
            Add Waste Record
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add Hazardous Waste Record</DialogTitle>
          <DialogDescription>
            Enter information about the hazardous waste material that requires disposal.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="waste_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Waste ID</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="HW-0001" />
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
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Disposed">Disposed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="material"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Material</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Paint Thinner, Solvents, etc." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" placeholder="10" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Unit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {units.map(unit => (
                          <SelectItem key={unit} value={unit}>
                            {unit}
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
                name="disposal_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Disposal Date</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="manifest_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Manifest #</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="MN-12345 (optional)" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="disposal_method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Disposal Method</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Disposal Method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {disposalMethods.map(method => (
                        <SelectItem key={method} value={method}>
                          {method}
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
              name="handler"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Handler</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Disposal Company or Internal" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Additional details about this waste" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setOpen(false)} type="button">
                Cancel
              </Button>
              <Button type="submit">Save Record</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddHazardousWasteDialog;
