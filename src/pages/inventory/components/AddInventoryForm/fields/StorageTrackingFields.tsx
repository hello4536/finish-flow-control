
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { formSchema } from "../schema";

type FormValues = z.infer<typeof formSchema>;

interface StorageTrackingFieldsProps {
  form: UseFormReturn<FormValues>;
}

export const StorageTrackingFields: React.FC<StorageTrackingFieldsProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField control={form.control} name="storage_zone" render={({ field }) => (
        <FormItem>
          <FormLabel>Storage Zone</FormLabel>
          <FormControl>
            <Input placeholder="e.g. Flammable Cabinet A" {...field} value={field.value || ""} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
      
      <FormField control={form.control} name="barcode" render={({ field }) => (
        <FormItem>
          <FormLabel>Barcode / QR Code</FormLabel>
          <FormControl>
            <Input placeholder="Barcode or QR code value" {...field} value={field.value || ""} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
    </div>
  );
};
