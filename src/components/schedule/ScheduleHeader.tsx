
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, CalendarDays, Calendar as CalendarIcon } from "lucide-react";

interface ScheduleHeaderProps {
  jobCount: number;
  meetingCount: number;
  weeklyEventCount: number;
}

const ScheduleHeader: React.FC<ScheduleHeaderProps> = ({ 
  jobCount, 
  meetingCount, 
  weeklyEventCount 
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Schedule</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Scheduled Jobs</p>
                <h3 className="text-3xl font-bold">{jobCount}</h3>
              </div>
              <CalendarDays className="h-8 w-8 opacity-75" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Upcoming Meetings</p>
                <h3 className="text-3xl font-bold">{meetingCount}</h3>
              </div>
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">This Week</p>
                <h3 className="text-3xl font-bold">{weeklyEventCount}</h3>
              </div>
              <CalendarIcon className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScheduleHeader;
