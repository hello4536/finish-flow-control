
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-8 space-y-8">
        <ScheduleHeader 
          jobCount={countEventsByType('job')} 
          meetingCount={countEventsByType('meeting')} 
          weeklyEventCount={countEventsThisMonth()} 
        />
        
        <Tabs defaultValue="calendar" className="w-full" onValueChange={value => setView(value as "calendar" | "list")}>
          <div className="flex mb-4">
            <TabsList className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg rounded-2xl p-1">
              <TabsTrigger 
                value="calendar" 
                className="flex items-center gap-2 px-6 py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
              >
                <CalendarDays className="h-5 w-5" />
                Calendar View
              </TabsTrigger>
              <TabsTrigger 
                value="list" 
                className="flex items-center gap-2 px-6 py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
              >
                <List className="h-5 w-5" />
                List View
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="calendar" className="mt-0">
            <div className="grid gap-6 md:grid-cols-5">
              <div className="md:col-span-3">
                <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        {date ? format(date, 'MMMM yyyy') : 'Calendar'}
                      </h2>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl">
                          {countEventsByType('job')} Jobs
                        </Badge>
                        <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-xl">
                          {countEventsByType('meeting')} Meetings
                        </Badge>
                      </div>
                    </CardTitle>
                    <p className="text-slate-600 font-medium">
                      View and manage your schedule in calendar format.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border border-slate-200 shadow-sm p-1 flex justify-center bg-white/50 backdrop-blur-sm">
                      <Calendar mode="single" selected={date} onSelect={handleDateChange} className="w-full max-w-sm mx-auto" />
                    </div>
                    
                    {date && (
                      <div className="mt-6">
                        <h3 className="text-xl font-medium mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                          Events on {format(date, 'MMMM d, yyyy')}
                        </h3>
                        <div className="space-y-3">
                          {getEventsForDate(date).length > 0 ? (
                            getEventsForDate(date).map(event => (
                              <ScheduleEventCard key={event.id} event={event} />
                            ))
                          ) : (
                            <p className="text-slate-600 py-8 text-center border rounded-md bg-slate-50/80 backdrop-blur-sm shadow-sm">
                              No events scheduled for this day.
                            </p>
                          )}
                        </div>
                      </div>
                    )}
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
      </div>
    </div>
  );
};

interface ScheduleEventCardProps {
  event: ScheduleEvent;
}

const ScheduleEventCard: React.FC<ScheduleEventCardProps> = ({ event }) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm shadow-md">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-medium text-lg text-slate-800">{event.title}</h4>
            <p className="text-sm text-slate-600 font-medium">{event.time}</p>
            {event.location && <p className="text-sm mt-1 text-slate-600">{event.location}</p>}
            {event.description && <p className="text-sm mt-2 text-slate-700">{event.description}</p>}
          </div>
          <Badge className={
            event.type === 'job' 
              ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg hover:shadow-xl' 
              : event.type === 'meeting' 
              ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-xl' 
              : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:shadow-xl'
          }>
            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default Schedule;
