import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useEquipment } from '@/hooks/useEquipment';
import { useEquipmentMaintenance } from '@/hooks/useEquipmentMaintenance';
import { useToast } from '@/hooks/use-toast';
import { MaintenanceRecord } from '@/types/equipment';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { cn } from '@/lib/utils';
interface AddMaintenanceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const maintenanceTypes = ['Preventative', 'Repair', 'Cleaning', 'Calibration', 'Inspection', 'Parts Replacement', 'Other'];
const formSchema = z.object({
  equipmentId: z.string({
    required_error: "Equipment is required"
  }),
  maintenanceType: z.string({
    required_error: "Maintenance type is required"
  }),
  performedBy: z.string({
    required_error: "Performed by is required"
  }),
  maintenanceDate: z.date({
    required_error: "Maintenance date is required"
  }),
  nextMaintenanceDate: z.date().optional(),
  cost: z.string().optional().transform(val => val ? parseFloat(val) : undefined),
  notes: z.string().optional()
});
type FormValues = z.infer<typeof formSchema>;
const AddMaintenanceDialog: React.FC<AddMaintenanceDialogProps> = ({
  open,
  onOpenChange
}) => {
  const {
    equipment,
    isLoading: loadingEquipment
  } = useEquipment();
  const {
    addMaintenanceRecord
  } = useEquipmentMaintenance();
  const {
    toast
  } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notes: ''
    }
  });
  const onSubmit = async (values: FormValues) => {
    try {
      const selectedEquipment = equipment.find(e => e.id === values.equipmentId);
      if (!selectedEquipment) {
        toast({
          title: "Error",
          description: "Selected equipment not found",
          variant: "destructive"
        });
        return;
      }
      const maintenanceRecord: Partial<MaintenanceRecord> = {
        equipment: {
          id: selectedEquipment.id,
          name: selectedEquipment.name,
          type: selectedEquipment.type
        },
        maintenanceType: values.maintenanceType,
        performedBy: values.performedBy,
        maintenanceDate: values.maintenanceDate.toISOString(),
        nextMaintenanceDate: values.nextMaintenanceDate?.toISOString(),
        cost: values.cost,
        notes: values.notes
      };
      await addMaintenanceRecord(maintenanceRecord);
      toast({
        title: "Success",
        description: "Maintenance record added successfully"
      });
      form.reset();
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };
  return <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-blue-600">Add Maintenance Record</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="equipmentId" render={({
            field
          }) => <FormItem>
                  <FormLabel>Equipment</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select equipment" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {loadingEquipment ? <SelectItem value="loading" disabled>Loading...</SelectItem> : equipment.map(item => <SelectItem key={item.id} value={item.id}>
                          {item.name} ({item.type})
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>} />
            
            <FormField control={form.control} name="maintenanceType" render={({
            field
          }) => <FormItem>
                  <FormLabel>Maintenance Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select maintenance type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {maintenanceTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>} />
            
            <FormField control={form.control} name="performedBy" render={({
            field
          }) => <FormItem>
                  <FormLabel>Performed By</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Technician name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField control={form.control} name="maintenanceDate" render={({
              field
            }) => <FormItem>
                    <FormLabel>Maintenance Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? format(field.value, "PP") : "Select date"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>} />
              
              <FormField control={form.control} name="nextMaintenanceDate" render={({
              field
            }) => <FormItem>
                    <FormLabel>Next Maintenance Date (Optional)</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? format(field.value, "PP") : "Select date"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value || undefined} onSelect={field.onChange} initialFocus />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>} />
            </div>
            
            <FormField control={form.control} name="cost" render={({
            field
          }) => <FormItem>
                  <FormLabel>Cost (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" step="0.01" placeholder="0.00" />
                  </FormControl>
                  <FormDescription>Enter the cost of maintenance</FormDescription>
                  <FormMessage />
                </FormItem>} />
            
            <FormField control={form.control} name="notes" render={({
            field
          }) => <FormItem>
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Additional details about the maintenance" rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="text-red-600">
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-500">Add Record</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>;
};
export default AddMaintenanceDialog;