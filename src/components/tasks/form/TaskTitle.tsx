
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { TaskFormData } from "@/hooks/tasks/types";

interface TaskTitleFieldProps {
  form: UseFormReturn<TaskFormData>;
}

export const TaskTitleField: React.FC<TaskTitleFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Task Title</FormLabel>
          <FormControl>
            <Input placeholder="Enter task title" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
