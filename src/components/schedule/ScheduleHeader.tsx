
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
        <h2 className="text-3xl font-bold tracking-tight text-purple-600">Schedule</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-purple-50 to-violet-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-semibold text-purple-700 uppercase tracking-wide">Scheduled Jobs</div>
              <div className="rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 p-3 shadow-lg">
                <CalendarDays className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="mb-2">
              <div className="text-4xl font-bold text-purple-800 mb-1">{jobCount}</div>
              <div className="text-sm text-purple-600 font-medium">Active job schedules</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-50 to-indigo-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Upcoming Meetings</div>
              <div className="rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-3 shadow-lg">
                <Clock className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="mb-2">
              <div className="text-4xl font-bold text-blue-800 mb-1">{meetingCount}</div>
              <div className="text-sm text-blue-600 font-medium">Scheduled meetings</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-cyan-50 to-teal-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-semibold text-cyan-700 uppercase tracking-wide">This Week</div>
              <div className="rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 p-3 shadow-lg">
                <CalendarIcon className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="mb-2">
              <div className="text-4xl font-bold text-cyan-800 mb-1">{weeklyEventCount}</div>
              <div className="text-sm text-cyan-600 font-medium">Total events</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScheduleHeader;
