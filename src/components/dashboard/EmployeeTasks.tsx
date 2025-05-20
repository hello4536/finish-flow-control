
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare } from "lucide-react";
import { useDailyTasks } from "@/hooks/useDailyTasks";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

const EmployeeTasks: React.FC = () => {
  const { tasks, isLoading, completeTask } = useDailyTasks();
  const { user } = useAuth();

  return (
    <Card className="lg:col-span-4">
      <CardHeader>
        <CardTitle>Employee Tasks</CardTitle>
        <CardDescription>
          Today's assigned tasks and status
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-[300px]">
            <p className="text-muted-foreground">Loading tasks...</p>
          </div>
        ) : tasks.length > 0 ? (
          <div className="space-y-4">
            {tasks.map(task => (
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
                      onClick={() => completeTask(task.id)}
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
