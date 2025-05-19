
import React, { useState } from "react";
import { format, isToday } from "date-fns";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { 
  Check, 
  CalendarClock, 
  Loader2,
  Trash2
} from "lucide-react";
import { TaskWithAssignee } from "@/hooks/tasks/types";

interface DailyTasksListProps {
  tasks: TaskWithAssignee[];
  selectedDate: Date;
  isLoading: boolean;
  onTaskComplete: (taskId: string) => void;
  onTaskDelete: (taskId: string) => void;
}

const DailyTasksList: React.FC<DailyTasksListProps> = ({ 
  tasks, 
  selectedDate, 
  isLoading,
  onTaskComplete,
  onTaskDelete
}) => {
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  
  const filteredTasks = tasks.filter(task => 
    new Date(task.due_date).toDateString() === selectedDate.toDateString()
  );
  
  const handleDeleteTask = () => {
    if (taskToDelete) {
      onTaskDelete(taskToDelete);
      setTaskToDelete(null);
    }
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500";
      case "medium": return "bg-amber-500";
      case "low": return "bg-green-500";
      default: return "bg-blue-500";
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>
              {isToday(selectedDate) 
                ? "Today's Tasks" 
                : `Tasks for ${format(selectedDate, "MMMM d, yyyy")}`}
            </span>
            <Badge variant="outline" className="ml-2">
              {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
            </Badge>
          </CardTitle>
          <CardDescription>
            View and manage tasks assigned for this day
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              <span className="text-muted-foreground">Loading tasks...</span>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="text-center py-8">
              <CalendarClock className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <h3 className="text-lg font-medium">No tasks scheduled</h3>
              <p className="text-muted-foreground mt-1">
                {isToday(selectedDate) 
                  ? "There are no tasks assigned for today." 
                  : `There are no tasks assigned for ${format(selectedDate, "MMMM d, yyyy")}.`}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <div 
                  key={task.id}
                  className={`border rounded-lg p-4 ${task.status === "completed" ? "bg-muted/50" : "bg-card"}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </Badge>
                      <h3 className={`font-medium ${task.status === "completed" ? "line-through text-muted-foreground" : ""}`}>
                        {task.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      {task.status !== "completed" && (
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => onTaskComplete(task.id)}
                        >
                          <Check className="h-4 w-4" />
                          <span className="sr-only">Mark as complete</span>
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => setTaskToDelete(task.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete task</span>
                      </Button>
                    </div>
                  </div>
                  
                  {task.description && (
                    <p className="mt-2 text-muted-foreground text-sm">
                      {task.description}
                    </p>
                  )}
                  
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <div>
                      <span className="text-muted-foreground">Assigned to: </span>
                      <span className="font-medium">{task.assignee?.name || "Unknown"}</span>
                    </div>
                    {task.due_time && (
                      <div>
                        <span className="text-muted-foreground">Due: </span>
                        <span className="font-medium">{task.due_time}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      <AlertDialog open={!!taskToDelete} onOpenChange={() => setTaskToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Task</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this task? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteTask}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DailyTasksList;
