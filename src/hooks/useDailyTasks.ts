
import { TaskWithAssignee, TaskFormData } from "./tasks/types";
import { useDailyTasks } from "./tasks/useDailyTasks";

export { TaskWithAssignee, TaskFormData };
export { useDailyTasks };

// Re-export the hook as default export to maintain backward compatibility
export default useDailyTasks;
