
import React from "react";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckSquare } from "lucide-react";
import { useDailyTasks } from "@/hooks/useDailyTasks";
import { useDevMode } from "@/context/DevModeContext";

const EmployeeTasks: React.FC = () => {
  const { tasks, isLoading, completeTask } = useDailyTasks();
  const { isDevMode } = useDevMode();
  
  // Get today's tasks only
  const today = new Date();
  const todaysDateString = format(today, 'yyyy-MM-dd');
  const todaysTasks = tasks.filter(task => task.due_date === todaysDateString);
  
  // Add mock tasks for dev mode
  const mockTasks = [
    {
      id: "mock-task-1",
      title: "Sand and Prep BMW Fender for Paint",
      priority: "high",
      status: "pending",
      due_date: todaysDateString,
      assignee: { name: "Sarah Miller" }
    },
    {
      id: "mock-task-2",
      title: "Apply Base Coat on Tesla Model 3",
      priority: "medium",
      status: "pending",
      due_date: todaysDateString,
      assignee: { name: "David Chen" }
    },
    {
      id: "mock-task-3",
      title: "Clear Coat Honda Civic Bumper",
      priority: "medium",
      status: "completed",
      due_date: todaysDateString,
      assignee: { name: "Michael Brown" }
    },
    {
      id: "mock-task-4",
      title: "Color Match Ford F-150 Door Panel",
      priority: "high",
      status: "pending",
      due_date: todaysDateString,
      assignee: { name: "Alex Johnson" }
    }
  ];
  
  // Display mock tasks when in dev mode
  const displayTasks = isDevMode ? mockTasks : todaysTasks;
  const displayLoading = isDevMode ? false : isLoading;

  return (
    <Card className="lg:col-span-4">
      <CardHeader>
        <CardTitle>Employee Tasks</CardTitle>
        <CardDescription>
          Today's assigned tasks and status
        </CardDescription>
      </CardHeader>
      <CardContent>
        {displayLoading ? (
          <div className="flex justify-center items-center h-[300px]">
            <p className="text-muted-foreground">Loading tasks...</p>
          </div>
        ) : displayTasks.length > 0 ? (
          <div className="space-y-4">
            {displayTasks.map(task => (
              <div key={task.id} className="flex items-center justify-between border-b pb-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{task.title}</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-xs text-muted-foreground">
                      {task.assignee?.name || 'Unassigned'}
                    </p>
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80">
                      {task.priority}
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  {task.status === "pending" ? (
                    <Button 
                      size="sm"
                      variant="outline"
                      onClick={() => !isDevMode && completeTask(task.id)}
                    >
                      Complete
                    </Button>
                  ) : (
                    <span className="text-xs text-green-600 font-medium flex items-center">
                      <CheckSquare className="h-3.5 w-3.5 mr-1" /> Completed
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-[300px] flex-col">
            <CheckSquare className="h-12 w-12 text-muted-foreground/50 mb-2" />
            <p className="text-muted-foreground">No tasks assigned for today</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmployeeTasks;
