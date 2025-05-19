
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { formSchema } from "../schema";

type FormValues = z.infer<typeof formSchema>;

interface SdsLinkFieldProps {
  form: UseFormReturn<FormValues>;
}

export const SdsLinkField: React.FC<SdsLinkFieldProps> = ({ form }) => {
  return (
    <FormField control={form.control} name="sds_link" render={({ field }) => (
      <FormItem>
        <FormLabel>SDS Link</FormLabel>
        <FormControl>
          <Input placeholder="https://..." {...field} value={field.value || ""} />
        </FormControl>
        <FormDescription>
          Link to Safety Data Sheet PDF or document
        </FormDescription>
        <FormMessage />
      </FormItem>
    )} />
  );
};
