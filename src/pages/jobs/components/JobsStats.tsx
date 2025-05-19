
import React from "react";
import { Card } from "@/components/ui/card";
import { Clock, AlertTriangle, CheckCircle, CalendarClock } from "lucide-react";
import { useDevMode } from "@/context/DevModeContext";

const JobsStats: React.FC = () => {
  const { isDevMode } = useDevMode();
  
  // Mock data for dev mode display
  const mockStats = {
    inProgress: 4,
    overdue: 1,
    completed: 1,
    upcoming: 2
  };
  
  const stats = isDevMode ? mockStats : {
    inProgress: 0,
    overdue: 0,
    completed: 0,
    upcoming: 0
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">In Progress</p>
            <p className="text-2xl font-bold">{stats.inProgress}</p>
          </div>
          <div className="rounded-full bg-blue-100 p-2">
            <Clock className="h-5 w-5 text-blue-600" />
          </div>
        </div>
      </Card>
      
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Overdue</p>
            <p className="text-2xl font-bold">{stats.overdue}</p>
          </div>
          <div className="rounded-full bg-red-100 p-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </div>
        </div>
      </Card>
      
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Completed</p>
            <p className="text-2xl font-bold">{stats.completed}</p>
          </div>
          <div className="rounded-full bg-green-100 p-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
        </div>
      </Card>
      
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Upcoming</p>
            <p className="text-2xl font-bold">{stats.upcoming}</p>
          </div>
          <div className="rounded-full bg-amber-100 p-2">
            <CalendarClock className="h-5 w-5 text-amber-600" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default JobsStats;
