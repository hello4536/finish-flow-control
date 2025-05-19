
import * as z from "zod";

// Form schema
export const taskFormSchema = z.object({
  title: z.string().min(2, { message: "Task title must be at least 2 characters." }),
  description: z.string().optional(),
  userId: z.string({ required_error: "Please select an employee." }),
  priority: z.enum(["low", "medium", "high"]),
  dueTime: z.string().optional()
});

export type TaskFormSchemaType = z.infer<typeof taskFormSchema>;
