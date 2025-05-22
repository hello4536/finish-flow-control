import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, List } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ScheduleList from "@/components/schedule/ScheduleList";
import ScheduleHeader from "@/components/schedule/ScheduleHeader";
import EventForm from "@/components/schedule/EventForm";
import { format } from "date-fns";
import { useScheduleData } from "@/hooks/useScheduleData";
import { ScheduleEvent } from "@/types/schedule";
const Schedule: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<"calendar" | "list">("calendar");
  const {
    events,
    isLoading,
    getEventsForDate
  } = useScheduleData();
  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
  };

  // Count events by type
  const countEventsByType = (type: 'job' | 'meeting' | 'delivery') => {
    return events.filter(event => event.type === type).length;
  };

  // Count events for the current month
  const countEventsThisMonth = () => {
    if (!date) return 0;
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
    }).length;
  };
  return <div className="space-y-6">
      <ScheduleHeader jobCount={countEventsByType('job')} meetingCount={countEventsByType('meeting')} weeklyEventCount={countEventsThisMonth()} />
      
      <Tabs defaultValue="calendar" className="w-full" onValueChange={value => setView(value as "calendar" | "list")}>
        <div className="flex mb-4">
          <TabsList className="bg-background border">
            <TabsTrigger value="calendar" className="flex items-center gap-2 px-6 py-2 text-blue-600">
              <CalendarDays className="h-5 w-5" />
              Calendar View
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-2 px-6 py-2">
              <List className="h-5 w-5" />
              List View
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="calendar" className="mt-0">
          <div className="grid gap-6 md:grid-cols-5">
            <div className="md:col-span-3">
              <Card className="border shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-blue-600">{date ? format(date, 'MMMM yyyy') : 'Calendar'}</h2>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-600">{countEventsByType('job')} Jobs</Badge>
                      <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100">
                        {countEventsByType('meeting')} Meetings
                      </Badge>
                    </div>
                  </CardTitle>
                  <p className="text-muted-foreground">
                    View and manage your schedule in calendar format.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border shadow-sm p-1 flex justify-center">
                    <Calendar mode="single" selected={date} onSelect={handleDateChange} className="w-full max-w-sm mx-auto" />
                  </div>
                  
                  {date && <div className="mt-6">
                      <h3 className="text-xl font-medium mb-4">Events on {format(date, 'MMMM d, yyyy')}</h3>
                      <div className="space-y-3">
                        {getEventsForDate(date).length > 0 ? getEventsForDate(date).map(event => <ScheduleEventCard key={event.id} event={event} />) : <p className="text-muted-foreground py-8 text-center border rounded-md bg-slate-50">
                            No events scheduled for this day.
                          </p>}
                      </div>
                    </div>}
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <EventForm selectedDate={date} />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="list" className="mt-0">
          <ScheduleList />
        </TabsContent>
      </Tabs>
    </div>;
};
interface ScheduleEventCardProps {
  event: ScheduleEvent;
}
const ScheduleEventCard: React.FC<ScheduleEventCardProps> = ({
  event
}) => {
  return <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-medium text-lg">{event.title}</h4>
            <p className="text-sm text-muted-foreground">{event.time}</p>
            {event.location && <p className="text-sm mt-1">{event.location}</p>}
            {event.description && <p className="text-sm mt-2">{event.description}</p>}
          </div>
          <Badge className={event.type === 'job' ? 'bg-orange-400 text-white hover:bg-orange-500' : event.type === 'meeting' ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'}>
            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
          </Badge>
        </div>
      </CardContent>
    </Card>;
};
export default Schedule;