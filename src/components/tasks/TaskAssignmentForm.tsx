import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useUserData } from "@/hooks/useUserData";
import { TaskFormData } from "@/hooks/tasks/types";
import { taskFormSchema } from "./form/TaskFormSchema";
import { TaskTitleField } from "./form/TaskTitle";
import { TaskDescriptionField } from "./form/TaskDescription";
import { TaskAssigneeField } from "./form/TaskAssigneeField";
import { TaskPriorityField } from "./form/TaskPriorityField";
import { TaskDueTimeField } from "./form/TaskDueTimeField";
interface TaskAssignmentFormProps {
  selectedDate: Date;
  onTaskAssigned: (task: TaskFormData & {
    dueDate: Date;
  }) => void;
}
const TaskAssignmentForm: React.FC<TaskAssignmentFormProps> = ({
  selectedDate,
  onTaskAssigned
}) => {
  const {
    users
  } = useUserData();
  const activeUsers = users.filter(user => user.status === "active");
  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      dueTime: ""
    }
  });
  const onSubmit = (data: TaskFormData) => {
    onTaskAssigned({
      ...data,
      dueDate: selectedDate
    });
    form.reset({
      title: "",
      description: "",
      priority: "medium",
      dueTime: ""
    });
  };
  return <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <TaskTitleField form={form} />
        <TaskDescriptionField form={form} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TaskAssigneeField form={form} users={activeUsers} />
          <TaskPriorityField form={form} />
        </div>
        
        <TaskDueTimeField form={form} />
        
        <div className="pt-2">
          <Button type="submit" className="w-full text-slate-50 bg-purple-600 hover:bg-purple-500">
            Assign Task
          </Button>
        </div>
      </form>
    </Form>;
};
export default TaskAssignmentForm;