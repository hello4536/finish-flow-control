import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useEquipment } from '@/hooks/useEquipment';
const equipmentSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.'
  }),
  type: z.string().min(1, {
    message: 'Type is required.'
  }),
  brand: z.string().optional(),
  model: z.string().optional(),
  serialNumber: z.string().optional(),
  purchaseDate: z.string().optional(),
  purchaseCost: z.string().optional(),
  condition: z.string().min(1, {
    message: 'Condition is required.'
  }),
  status: z.string().min(1, {
    message: 'Status is required.'
  }),
  notes: z.string().optional()
});
type EquipmentFormValues = z.infer<typeof equipmentSchema>;
interface AddEquipmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const AddEquipmentDialog: React.FC<AddEquipmentDialogProps> = ({
  open,
  onOpenChange
}) => {
  const {
    addEquipment
  } = useEquipment();
  const {
    toast
  } = useToast();
  const form = useForm<EquipmentFormValues>({
    resolver: zodResolver(equipmentSchema),
    defaultValues: {
      name: '',
      type: '',
      brand: '',
      model: '',
      serialNumber: '',
      purchaseDate: '',
      purchaseCost: '',
      condition: 'Good',
      status: 'Available',
      notes: ''
    }
  });
  const onSubmit = async (values: EquipmentFormValues) => {
    try {
      await addEquipment({
        name: values.name,
        type: values.type,
        brand: values.brand,
        model: values.model,
        serial_number: values.serialNumber,
        purchase_date: values.purchaseDate,
        purchase_cost: values.purchaseCost ? parseFloat(values.purchaseCost) : undefined,
        condition: values.condition,
        status: values.status,
        notes: values.notes
      });
      toast({
        title: 'Equipment added',
        description: 'The equipment has been added successfully.'
      });
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error('Error adding equipment:', error);
      toast({
        title: 'Failed to add equipment',
        description: 'There was an error adding the equipment. Please try again.',
        variant: 'destructive'
      });
    }
  };
  return <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-blue-600">Add New Equipment</DialogTitle>
          <DialogDescription>
            Enter the details of the new equipment to add to inventory.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField control={form.control} name="name" render={({
              field
            }) => <FormItem>
                    <FormLabel>Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Equipment name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              
              <FormField control={form.control} name="type" render={({
              field
            }) => <FormItem>
                    <FormLabel>Type *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Spray Gun">Spray Gun</SelectItem>
                        <SelectItem value="Respirator">Respirator</SelectItem>
                        <SelectItem value="Air Compressor">Air Compressor</SelectItem>
                        <SelectItem value="Sander">Sander</SelectItem>
                        <SelectItem value="Buffer">Buffer</SelectItem>
                        <SelectItem value="Polisher">Polisher</SelectItem>
                        <SelectItem value="Mixer">Mixer</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>} />
              
              <FormField control={form.control} name="brand" render={({
              field
            }) => <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <FormControl>
                      <Input placeholder="Brand name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              
              <FormField control={form.control} name="model" render={({
              field
            }) => <FormItem>
                    <FormLabel>Model</FormLabel>
                    <FormControl>
                      <Input placeholder="Model number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              
              <FormField control={form.control} name="serialNumber" render={({
              field
            }) => <FormItem>
                    <FormLabel>Serial Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Serial number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              
              <FormField control={form.control} name="purchaseDate" render={({
              field
            }) => <FormItem>
                    <FormLabel>Purchase Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              
              <FormField control={form.control} name="purchaseCost" render={({
              field
            }) => <FormItem>
                    <FormLabel>Purchase Cost</FormLabel>
                    <FormControl>
                      <Input placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              
              <FormField control={form.control} name="condition" render={({
              field
            }) => <FormItem>
                    <FormLabel>Condition *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="New">New</SelectItem>
                        <SelectItem value="Excellent">Excellent</SelectItem>
                        <SelectItem value="Good">Good</SelectItem>
                        <SelectItem value="Fair">Fair</SelectItem>
                        <SelectItem value="Poor">Poor</SelectItem>
                        <SelectItem value="Damaged">Damaged</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>} />
              
              <FormField control={form.control} name="status" render={({
              field
            }) => <FormItem>
                    <FormLabel>Status *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Available">Available</SelectItem>
                        <SelectItem value="Assigned">Assigned</SelectItem>
                        <SelectItem value="Maintenance">Maintenance</SelectItem>
                        <SelectItem value="Damaged">Damaged</SelectItem>
                        <SelectItem value="Retired">Retired</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>} />
            </div>
            
            <FormField control={form.control} name="notes" render={({
            field
          }) => <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Additional notes or details" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="text-red-600">
                Cancel
              </Button>
              <Button type="submit" className="text-white bg-blue-600 hover:bg-blue-500">Add Equipment</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>;
};
export default AddEquipmentDialog;