
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter, CalendarDays, Calendar as CalendarIcon, List } from "lucide-react";
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
  const { events, isLoading, getEventsForDate } = useScheduleData();

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
  };

  // Count events by type
  const countEventsByType = (type: 'job' | 'meeting' | 'delivery') => {
    return events.filter(event => event.type === type).length;
  };

  // Count events for the current week
  const countEventsThisWeek = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(today);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= startOfWeek && eventDate <= endOfWeek;
    }).length;
  };

  return (
    <div className="space-y-6">
      <ScheduleHeader 
        jobCount={countEventsByType('job')}
        meetingCount={countEventsByType('meeting')}
        weeklyEventCount={countEventsThisWeek()}
      />
      
      <Tabs defaultValue="calendar" className="w-full" onValueChange={(value) => setView(value as "calendar" | "list")}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              Calendar View
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-2">
              <List className="h-4 w-4" />
              List View
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>
        
        <TabsContent value="calendar" className="mt-0">
          <div className="grid gap-4 md:grid-cols-5">
            <div className="md:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{date ? format(date, 'MMMM yyyy') : 'Calendar'}</span>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-accent">{countEventsByType('job')} Jobs</Badge>
                      <Badge variant="outline">{countEventsByType('meeting')} Meetings</Badge>
                    </div>
                  </CardTitle>
                  <CardDescription>
                    View and manage your schedule in calendar format.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar 
                    mode="single"
                    selected={date}
                    onSelect={handleDateChange}
                    className="rounded-md border shadow"
                  />
                  
                  {date && (
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-4">Events on {format(date, 'MMMM d, yyyy')}</h3>
                      <div className="space-y-3">
                        {getEventsForDate(date).map((event) => (
                          <ScheduleEventCard key={event.id} event={event} />
                        ))}
                        {getEventsForDate(date).length === 0 && (
                          <p className="text-muted-foreground">No events scheduled for this day.</p>
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
  );
};

interface ScheduleEventCardProps {
  event: ScheduleEvent;
}

const ScheduleEventCard: React.FC<ScheduleEventCardProps> = ({ event }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-medium text-lg">{event.title}</h4>
            <p className="text-sm text-muted-foreground">{event.time}</p>
            {event.location && <p className="text-sm mt-1">{event.location}</p>}
            {event.description && <p className="text-sm mt-2">{event.description}</p>}
          </div>
          <Badge className={
            event.type === 'job' ? 'bg-accent' : 
            event.type === 'meeting' ? 'bg-primary' : 
            'bg-green-500'
          }>
            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default Schedule;
