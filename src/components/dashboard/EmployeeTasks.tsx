
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare, Clock } from "lucide-react";
import { useDailyTasks } from "@/hooks/useDailyTasks";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockData, useMockData } from "@/utils/mockData";

const EmployeeTasks: React.FC = () => {
  const { tasks, isLoading, completeTask } = useDailyTasks();
  const { user } = useAuth();
  const showMockData = useMockData();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const displayTasks = showMockData ? mockData.employeeTasks : tasks;

  return (
    <Card className="lg:col-span-4">
      <CardHeader>
        <CardTitle className="text-purple-700">Employee Tasks</CardTitle>
        <CardDescription>
          Today's assigned tasks and status
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && !showMockData ? (
          <div className="flex justify-center items-center h-[300px]">
            <p className="text-muted-foreground">Loading tasks...</p>
          </div>
        ) : displayTasks.length > 0 ? (
          <div className="space-y-4">
            {displayTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between border-b pb-4 last:border-b-0">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium leading-none">{task.title}</p>
                    {showMockData && task.estimatedTime && (
                      <span className="text-xs text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {task.estimatedTime}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <p className="text-xs text-muted-foreground">
                      {task.assignee?.name || 'Unassigned'}
                    </p>
                    <Badge variant="outline" className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center ml-4">
                  {task.status === "pending" ? (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => showMockData ? null : completeTask(task.id)}
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
