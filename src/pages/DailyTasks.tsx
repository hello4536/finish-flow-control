
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import TaskAssignmentForm from "@/components/tasks/TaskAssignmentForm";
import DailyTasksList from "@/components/tasks/DailyTasksList";
import TasksHeader from "@/components/tasks/TasksHeader";
import { useDailyTasks } from "@/hooks/useDailyTasks";

const DailyTasks: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { tasks, isLoading, assignTask, completeTask, deleteTask } = useDailyTasks();

  return (
    <div className="space-y-6">
      <TasksHeader 
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />
      
      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-5">
          <Card>
            <CardHeader>
              <CardTitle>Assign New Task</CardTitle>
              <CardDescription>
                Create and assign daily tasks to employees
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TaskAssignmentForm 
                selectedDate={selectedDate}
                onTaskAssigned={assignTask}
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-7">
          <DailyTasksList 
            tasks={tasks}
            selectedDate={selectedDate}
            isLoading={isLoading}
            onTaskComplete={completeTask}
            onTaskDelete={deleteTask}
          />
        </div>
      </div>
    </div>
  );
};

export default DailyTasks;
