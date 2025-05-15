
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
import { Plus, CalendarDays, Calendar as CalendarIcon, List, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ScheduleList from "@/components/schedule/ScheduleList";
import ScheduleHeader from "@/components/schedule/ScheduleHeader";
import { format } from "date-fns";

const Schedule: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<"calendar" | "list">("calendar");

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
  };

  return (
    <div className="space-y-6">
      <ScheduleHeader />
      
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
            <Button size="sm" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Event
            </Button>
          </div>
        </div>
        
        <TabsContent value="calendar" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{date ? format(date, 'MMMM yyyy') : 'Calendar'}</span>
                <div className="flex items-center gap-2">
                  <Badge className="bg-accent">5 Jobs</Badge>
                  <Badge variant="outline">3 Meetings</Badge>
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
                    {getEventsForDate(date).map((event, index) => (
                      <ScheduleEvent key={index} event={event} />
                    ))}
                    {getEventsForDate(date).length === 0 && (
                      <p className="text-muted-foreground">No events scheduled for this day.</p>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="list" className="mt-0">
          <ScheduleList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface Event {
  id: string;
  title: string;
  time: string;
  type: 'job' | 'meeting' | 'delivery';
  location?: string;
  description?: string;
}

const ScheduleEvent: React.FC<{ event: Event }> = ({ event }) => {
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
          <Badge className={event.type === 'job' ? 'bg-accent' : event.type === 'meeting' ? 'bg-primary' : 'bg-green-500'}>
            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

// Mock function to return events for a specific date
const getEventsForDate = (date: Date): Event[] => {
  const day = date.getDate();
  const month = date.getMonth();
  
  // Return mock events for specific days
  if (day === 15 && month === 4) { // May 15
    return [
      { 
        id: '1', 
        title: 'Cabinet Finishing Job #J-1008', 
        time: '9:00 AM - 12:00 PM', 
        type: 'job',
        location: 'Workshop Bay 3',
        description: 'Final coat application for kitchen cabinets'
      },
      { 
        id: '2', 
        title: 'Team Status Meeting', 
        time: '1:00 PM - 2:00 PM', 
        type: 'meeting',
        location: 'Conference Room'
      }
    ];
  } else if (day === 16 && month === 4) { // May 16
    return [
      { 
        id: '3', 
        title: 'Material Delivery', 
        time: '10:30 AM', 
        type: 'delivery',
        description: 'Stain and sealer delivery from SupplyMax'
      }
    ];
  } else if (day === 17 && month === 4) { // May 17
    return [
      { 
        id: '4', 
        title: 'Desk Refinishing Job #J-1010', 
        time: '8:00 AM - 4:00 PM', 
        type: 'job',
        location: 'Workshop Bay 1'
      }
    ];
  }
  
  return [];
};

export default Schedule;
