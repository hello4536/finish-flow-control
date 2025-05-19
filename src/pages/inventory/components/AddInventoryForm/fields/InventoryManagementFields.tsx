
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { formSchema } from "../schema";

type FormValues = z.infer<typeof formSchema>;

interface InventoryManagementFieldsProps {
  form: UseFormReturn<FormValues>;
}

export const InventoryManagementFields: React.FC<InventoryManagementFieldsProps> = ({ form }) => {
  return (
    <>
      <FormField control={form.control} name="min_quantity" render={({ field }) => (
        <FormItem>
          <FormLabel>Minimum Quantity Threshold</FormLabel>
          <FormControl>
            <Input type="number" {...field} />
          </FormControl>
          <FormDescription>
            System will alert when stock falls below this threshold
          </FormDescription>
          <FormMessage />
        </FormItem>
      )} />
      
      <FormField control={form.control} name="is_consumable" render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>
              Consumable Item
            </FormLabel>
            <FormDescription>
              Checkbox for consumables like paint or sandpaper. Unchecked for durable items like tools.
            </FormDescription>
          </div>
        </FormItem>
      )} />
    </>
  );
};
