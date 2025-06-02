
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import TaskAssignmentForm from "@/components/tasks/TaskAssignmentForm";
import DailyTasksList from "@/components/tasks/DailyTasksList";
import TasksHeader from "@/components/tasks/TasksHeader";
import { useDailyTasks } from "@/hooks/tasks/useDailyTasks";

const DailyTasks: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const {
    tasks,
    isLoading,
    addTask,
    completeTask,
    deleteTask
  } = useDailyTasks();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-8 space-y-8">
        <TasksHeader selectedDate={selectedDate} onDateChange={setSelectedDate} />
        
        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-5">
            <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white via-blue-50/30 to-indigo-100/40 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Assign New Task
                </CardTitle>
                <CardDescription className="text-slate-600 font-medium">
                  Create and assign daily tasks to employees
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TaskAssignmentForm selectedDate={selectedDate} onTaskAssigned={addTask} />
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
    </div>
  );
};

export default DailyTasks;
