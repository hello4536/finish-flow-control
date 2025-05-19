
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { TaskFormData } from "@/hooks/tasks/types";

interface TaskPriorityFieldProps {
  form: UseFormReturn<TaskFormData>;
}

export const TaskPriorityField: React.FC<TaskPriorityFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="priority"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Priority</FormLabel>
          <FormControl>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              {...field}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
