
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { formSchema } from "../schema";

type FormValues = z.infer<typeof formSchema>;

interface TechnicalSpecFieldsProps {
  form: UseFormReturn<FormValues>;
}

export const TechnicalSpecFields: React.FC<TechnicalSpecFieldsProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField control={form.control} name="grit" render={({ field }) => (
        <FormItem>
          <FormLabel>Grit (for abrasives)</FormLabel>
          <FormControl>
            <Input type="number" placeholder="e.g. 220, 400, 1000" {...field} value={field.value === null ? "" : field.value} onChange={e => field.onChange(e.target.value === "" ? null : parseInt(e.target.value))} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
      
      <FormField control={form.control} name="voc_content" render={({ field }) => (
        <FormItem>
          <FormLabel>VOC Content (g/L)</FormLabel>
          <FormControl>
            <Input type="number" placeholder="e.g. 250" {...field} value={field.value === null ? "" : field.value} onChange={e => field.onChange(e.target.value === "" ? null : parseFloat(e.target.value))} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
    </div>
  );
};
