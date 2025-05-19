
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { TaskFormData } from "@/hooks/tasks/types";

interface TaskDueTimeFieldProps {
  form: UseFormReturn<TaskFormData>;
}

export const TaskDueTimeField: React.FC<TaskDueTimeFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="dueTime"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Due Time (Optional)</FormLabel>
          <FormControl>
            <Input type="time" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
