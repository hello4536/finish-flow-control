
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { formSchema } from "../schema";

type FormValues = z.infer<typeof formSchema>;

interface ProductIdentificationFieldsProps {
  form: UseFormReturn<FormValues>;
}

export const ProductIdentificationFields: React.FC<ProductIdentificationFieldsProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField control={form.control} name="name" render={({ field }) => (
        <FormItem>
          <FormLabel>Product Name</FormLabel>
          <FormControl>
            <Input placeholder="Product name" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
      
      <FormField control={form.control} name="sku" render={({ field }) => (
        <FormItem>
          <FormLabel>SKU</FormLabel>
          <FormControl>
            <Input placeholder="SKU" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
    </div>
  );
};
