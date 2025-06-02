
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
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-purple-50 to-violet-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <CardHeader className="pb-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white">
        <CardTitle className="text-lg font-semibold">Employee Tasks</CardTitle>
        <CardDescription className="text-xs text-purple-100">
          Today's assigned tasks
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 p-6">
        {isLoading && !showMockData ? (
          <div className="flex justify-center items-center h-32">
            <p className="text-xs text-purple-600">Loading tasks...</p>
          </div>
        ) : displayTasks.length > 0 ? (
          <>
            {displayTasks.slice(0, 4).map((task) => (
              <div key={task.id} className="flex items-center justify-between pb-2 last:pb-0 border-b last:border-b-0 border-purple-100 hover:bg-purple-50/50 rounded-lg p-2 transition-colors duration-200">
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium leading-none truncate text-purple-900">{task.title}</p>
                    {showMockData && task.estimatedTime && (
                      <span className="text-xs text-purple-600 flex items-center ml-2">
                        <Clock className="h-2 w-2 mr-1" />
                        {task.estimatedTime}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <p className="text-xs text-purple-700 truncate">
                      {task.assignee?.name || 'Unassigned'}
                    </p>
                    <Badge variant="outline" className={`text-xs ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center ml-2">
                  {task.status === "pending" ? (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs px-2 py-1 h-6 border-purple-200 text-purple-700 hover:bg-purple-100 hover:text-purple-800"
                      onClick={() => showMockData ? null : completeTask(task.id)}
                    >
                      Complete
                    </Button>
                  ) : (
                    <span className="text-xs text-green-600 font-medium flex items-center">
                      <CheckSquare className="h-3 w-3 mr-1" /> Done
                    </span>
                  )}
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="flex justify-center items-center h-32 flex-col">
            <CheckSquare className="h-8 w-8 text-purple-400 mb-1" />
            <p className="text-xs text-purple-600">No tasks assigned</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmployeeTasks;
