
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { z } from "zod";
import { formSchema, productTypes } from "../schema";

type FormValues = z.infer<typeof formSchema>;

interface ProductTypeFieldsProps {
  form: UseFormReturn<FormValues>;
}

export const ProductTypeFields: React.FC<ProductTypeFieldsProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField control={form.control} name="product_type" render={({ field }) => (
        <FormItem>
          <FormLabel>Product Type</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select product type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {productTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )} />
      
      <FormField control={form.control} name="brand" render={({ field }) => (
        <FormItem>
          <FormLabel>Brand</FormLabel>
          <FormControl>
            <Input placeholder="e.g. 3M, PPG, SATA" {...field} value={field.value || ""} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
    </div>
  );
};
