
import { TaskWithAssignee, TaskFormData } from "./tasks/types";
import { useDailyTasks } from "./tasks/useDailyTasks";

// Re-export types using 'export type' to fix isolatedModules error
export type { TaskWithAssignee, TaskFormData };
export { useDailyTasks };

// Re-export the hook as default export to maintain backward compatibility
export default useDailyTasks;
