
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  FileText, 
  Trash2, 
  Loader2, 
  Upload, 
  Calendar,
  ExternalLink
} from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResourceReceipts } from '@/hooks/useResourceReceipts';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];

const receiptSchema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().min(1, "Company is required"),
  amount: z.coerce.number().min(0.01, "Amount must be greater than zero"),
  date: z.string().min(1, "Date is required"),
  file: typeof window === "undefined" 
    ? z.any() 
    : z.instanceof(File)
      .refine(file => file.size <= MAX_FILE_SIZE, `File size must be less than 5MB`)
      .refine(file => ACCEPTED_FILE_TYPES.includes(file.type), "Only PDF, JPEG, JPG and PNG files are accepted"),
  category: z.string().optional(),
  notes: z.string().optional(),
});

type ReceiptFormValues = z.infer<typeof receiptSchema>;

interface ReceiptsSectionProps {
  onCountChange: (count: number) => void;
}

const ReceiptsSection: React.FC<ReceiptsSectionProps> = ({ onCountChange }) => {
  const { 
    receipts, 
    isLoading, 
    addReceipt, 
    deleteReceipt,
    selectedReceipt,
    setSelectedReceipt,
    getCategories
  } = useResourceReceipts();
  
  const [viewOpen, setViewOpen] = useState(false);
  
  const form = useForm<ReceiptFormValues>({
    resolver: zodResolver(receiptSchema),
    defaultValues: {
      name: "",
      company: "",
      amount: undefined,
      date: new Date().toISOString().slice(0, 10),
      category: "",
      notes: "",
    },
  });

  // Update parent component with count
  React.useEffect(() => {
    onCountChange(receipts.length);
  }, [receipts.length, onCountChange]);

  // Add a new receipt
  const onSubmit = async (values: ReceiptFormValues) => {
    try {
      await addReceipt.mutateAsync({
        name: values.name,
        file: values.file,
        company: values.company,
        amount: values.amount,
        date: values.date,
        category: values.category,
        notes: values.notes,
      });
      
      form.reset({
        name: "",
        company: "",
        amount: undefined,
        date: new Date().toISOString().slice(0, 10),
        category: "",
        notes: "",
      });
      
      toast({
        title: "Receipt saved",
        description: `"${values.name}" has been added to your receipts`,
      });
    } catch (error) {
      // Error handled in the mutation
    }
  };

  // Delete a receipt
  const handleDeleteReceipt = async (id: string) => {
    try {
      await deleteReceipt.mutateAsync(id);
      
      toast({
        title: "Receipt removed",
        description: "The receipt has been removed from your resources",
      });

      // Close the dialog if we're deleting the currently viewed receipt
      if (selectedReceipt?.id === id) {
        setViewOpen(false);
      }
    } catch (error) {
      // Error handled in the mutation
    }
  };

  // View receipt details
  const handleViewReceipt = (receipt: any) => {
    setSelectedReceipt(receipt);
    setViewOpen(true);
  };

  // Format file size for display
  const formatFileSize = (size: number): string => {
    if (size < 1024) return `${size} B`;
    else if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    else return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };
  
  // Get unique categories
  const categories = getCategories();

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receipt Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Office Supplies" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input placeholder="Staples" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-[10px]">$</span>
                      <Input type="number" step="0.01" className="pl-7" placeholder="0.00" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-[10px] h-4 w-4 text-muted-foreground" />
                      <Input type="date" className="pl-9" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category (Optional)</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select or enter a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                      <SelectItem value="Office Supplies">Office Supplies</SelectItem>
                      <SelectItem value="Materials">Materials</SelectItem>
                      <SelectItem value="Tools">Tools</SelectItem>
                      <SelectItem value="Services">Services</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="file"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Receipt File</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input
                        {...fieldProps}
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            onChange(file);
                          }
                        }}
                        className="file:mr-4 file:py-1 file:px-3 file:border-0 file:bg-primary/10 file:text-primary hover:file:bg-primary/20 file:rounded"
                      />
                    </div>
                  </FormControl>
                  <p className="text-xs text-muted-foreground">
                    PDF, JPEG or PNG. Max size 5MB.
                  </p>
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
                  <Textarea placeholder="Add any additional information about this receipt..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={addReceipt.isPending}
            >
              {addReceipt.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Upload className="mr-2 h-4 w-4" />
              )}
              Upload Receipt
            </Button>
          </div>
        </form>
      </Form>

      {receipts.length > 0 ? (
        <div className="space-y-3">
          {receipts.map((receipt) => (
            <Card key={receipt.id} className="relative overflow-hidden group">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-2 md:gap-4 md:items-center">
                  {/* Icon and basic info */}
                  <div className="flex flex-1 items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-medium truncate">{receipt.name}</h3>
                      <div className="flex gap-2 text-sm text-muted-foreground">
                        <span>{receipt.company}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>${parseFloat(receipt.amount).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Middle section: Date & Category */}
                  <div className="flex flex-row justify-between md:justify-start md:flex-col md:min-w-[120px] text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>{format(new Date(receipt.date), 'MMM d, yyyy')}</span>
                    </div>
                    {receipt.category && (
                      <div>
                        <span className="inline-block bg-secondary px-2 py-0.5 text-xs rounded-full">
                          {receipt.category}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-2 mt-2 md:mt-0">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewReceipt(receipt)}
                    >
                      View
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => handleDeleteReceipt(receipt.id)}
                      disabled={deleteReceipt.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-muted-foreground">
          <FileText className="h-10 w-10 mx-auto mb-4 opacity-50" />
          <p>No receipts uploaded yet</p>
          <p className="text-sm">Upload your first receipt using the form above</p>
        </div>
      )}
      
      {/* Receipt View Dialog */}
      {selectedReceipt && (
        <Dialog open={viewOpen} onOpenChange={setViewOpen}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedReceipt.name}</DialogTitle>
              <DialogDescription>
                Uploaded on {format(new Date(selectedReceipt.created_at), 'MMMM d, yyyy')}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                <div>
                  <h4 className="text-sm font-medium">Company</h4>
                  <p>{selectedReceipt.company}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Amount</h4>
                  <p>${parseFloat(selectedReceipt.amount).toFixed(2)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Date</h4>
                  <p>{format(new Date(selectedReceipt.date), 'MMMM d, yyyy')}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Category</h4>
                  <p>{selectedReceipt.category || "Uncategorized"}</p>
                </div>
                {selectedReceipt.notes && (
                  <div className="col-span-2">
                    <h4 className="text-sm font-medium">Notes</h4>
                    <p className="text-sm whitespace-pre-wrap">{selectedReceipt.notes}</p>
                  </div>
                )}
                <div className="col-span-2">
                  <h4 className="text-sm font-medium">File</h4>
                  <div className="flex items-center justify-between mt-1">
                    <div className="text-sm text-muted-foreground">
                      {formatFileSize(selectedReceipt.size)} • {selectedReceipt.type.split('/')[1].toUpperCase()}
                    </div>
                    <a 
                      href={selectedReceipt.file_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-primary hover:underline"
                    >
                      View Receipt <ExternalLink className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t flex justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:bg-destructive/10"
                  onClick={() => handleDeleteReceipt(selectedReceipt.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Receipt
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ReceiptsSection;
