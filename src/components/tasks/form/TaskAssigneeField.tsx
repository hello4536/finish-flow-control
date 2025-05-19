
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { TaskFormData } from "@/hooks/tasks/types";
import { User } from "@/hooks/useUserData";

interface TaskAssigneeFieldProps {
  form: UseFormReturn<TaskFormData>;
  users: User[];
}

export const TaskAssigneeField: React.FC<TaskAssigneeFieldProps> = ({ form, users }) => {
  return (
    <FormField
      control={form.control}
      name="userId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Assign To</FormLabel>
          <FormControl>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              {...field}
              defaultValue=""
            >
              <option value="" disabled>Select an employee</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
