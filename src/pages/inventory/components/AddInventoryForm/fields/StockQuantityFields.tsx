
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { formSchema } from "../schema";

type FormValues = z.infer<typeof formSchema>;

interface StockQuantityFieldsProps {
  form: UseFormReturn<FormValues>;
}

export const StockQuantityFields: React.FC<StockQuantityFieldsProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField control={form.control} name="in_stock" render={({ field }) => (
        <FormItem>
          <FormLabel>In Stock</FormLabel>
          <FormControl>
            <Input type="number" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
      
      <FormField control={form.control} name="allocated" render={({ field }) => (
        <FormItem>
          <FormLabel>Allocated</FormLabel>
          <FormControl>
            <Input type="number" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
    </div>
  );
};
