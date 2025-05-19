
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { TaskFormData } from "@/hooks/tasks/types";

interface TaskDescriptionFieldProps {
  form: UseFormReturn<TaskFormData>;
}

export const TaskDescriptionField: React.FC<TaskDescriptionFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description (Optional)</FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Enter task details" 
              className="min-h-[80px]"
              {...field} 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
