import React from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Loader2, Upload } from "lucide-react";
import { toast } from "@/hooks/use-toast";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
const receiptSchema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().min(1, "Company is required"),
  amount: z.coerce.number().min(0.01, "Amount must be greater than zero"),
  date: z.string().min(1, "Date is required"),
  file: typeof window === "undefined" ? z.any() : z.instanceof(File).refine(file => file.size <= MAX_FILE_SIZE, `File size must be less than 5MB`).refine(file => ACCEPTED_FILE_TYPES.includes(file.type), "Only PDF, JPEG, JPG and PNG files are accepted"),
  category: z.string().optional(),
  notes: z.string().optional()
});
export type ReceiptFormValues = z.infer<typeof receiptSchema>;
interface ReceiptFormProps {
  addReceipt: {
    mutateAsync: (data: ReceiptFormValues) => Promise<any>;
    isPending: boolean;
  };
  categories: string[];
}
const ReceiptForm: React.FC<ReceiptFormProps> = ({
  addReceipt,
  categories
}) => {
  const form = useForm<ReceiptFormValues>({
    resolver: zodResolver(receiptSchema),
    defaultValues: {
      name: "",
      company: "",
      amount: undefined,
      date: new Date().toISOString().slice(0, 10),
      category: "",
      notes: ""
    }
  });
  const onSubmit = async (values: ReceiptFormValues) => {
    try {
      await addReceipt.mutateAsync(values);
      form.reset({
        name: "",
        company: "",
        amount: undefined,
        date: new Date().toISOString().slice(0, 10),
        category: "",
        notes: ""
      });
      toast({
        title: "Receipt saved",
        description: `"${values.name}" has been added to your receipts`
      });
    } catch (error) {
      // Error handled in the mutation
    }
  };
  return <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.control} name="name" render={({
          field
        }) => <FormItem>
                <FormLabel>Receipt Name</FormLabel>
                <FormControl>
                  <Input placeholder="Office Supplies" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />
          <FormField control={form.control} name="company" render={({
          field
        }) => <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="Staples" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.control} name="amount" render={({
          field
        }) => <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-[10px]">$</span>
                    <Input type="number" step="0.01" className="pl-7" placeholder="0.00" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>} />
          <FormField control={form.control} name="date" render={({
          field
        }) => <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-[10px] h-4 w-4 text-muted-foreground" />
                    <Input type="date" className="pl-9" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.control} name="category" render={({
          field
        }) => <FormItem>
                <FormLabel>Category (Optional)</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select or enter a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map(category => <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>)}
                    <SelectItem value="Office Supplies">Office Supplies</SelectItem>
                    <SelectItem value="Materials">Materials</SelectItem>
                    <SelectItem value="Tools">Tools</SelectItem>
                    <SelectItem value="Services">Services</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>} />
          <FormField control={form.control} name="file" render={({
          field: {
            value,
            onChange,
            ...fieldProps
          }
        }) => <FormItem>
                <FormLabel>Receipt File</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input {...fieldProps} type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => {
                const file = e.target.files?.[0];
                if (file) {
                  onChange(file);
                }
              }} className="file:mr-4 file:py-1 file:px-3 file:border-0 file:bg-primary/10 file:text-primary hover:file:bg-primary/20 file:rounded" />
                  </div>
                </FormControl>
                <p className="text-xs text-muted-foreground">
                  PDF, JPEG or PNG. Max size 5MB.
                </p>
                <FormMessage />
              </FormItem>} />
        </div>
          
        <FormField control={form.control} name="notes" render={({
        field
      }) => <FormItem>
              <FormLabel>Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Add any additional information about this receipt..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>} />
        
        <div className="flex justify-end">
          <Button type="submit" disabled={addReceipt.isPending} className="bg-blue-600 hover:bg-blue-500">
            {addReceipt.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
            Upload Receipt
          </Button>
        </div>
      </form>
    </Form>;
};
export default ReceiptForm;