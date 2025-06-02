
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useScheduleData } from "@/hooks/useScheduleData";
import { v4 as uuidv4 } from "@/lib/utils";

interface EventFormProps {
  selectedDate?: Date;
}

const EventForm: React.FC<EventFormProps> = ({ selectedDate }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Date | undefined>(selectedDate || new Date());
  const [time, setTime] = useState("");
  const [type, setType] = useState<"job" | "meeting" | "delivery">("job");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();
  const { addEvent } = useScheduleData();

  // Update local date when selectedDate prop changes
  useEffect(() => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  }, [selectedDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !time) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Add event to database
    addEvent.mutate({
      event_id: `E-${uuidv4().substring(0, 6)}`,
      title,
      date: format(date, 'yyyy-MM-dd'),
      time,
      type,
      status: 'scheduled',
      location: location || null,
      description: description || null,
      assigned_to: null
    });

    // Reset form
    setTitle("");
    setTime("");
    setLocation("");
    setDescription("");
  };

  return (
    <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Add New Event
        </CardTitle>
        <CardDescription className="text-slate-600 font-medium">
          Create a new event in your schedule
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-slate-700 font-medium">Event Title *</Label>
            <Input 
              id="title" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              placeholder="Enter event title" 
              className="bg-white/80 backdrop-blur-sm border-slate-200 focus:bg-white transition-all duration-300"
              required 
            />
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-slate-700 font-medium">Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant={"outline"} 
                    className="w-full justify-start text-left font-normal bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-white transition-all duration-300" 
                    id="date"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white/95 backdrop-blur-sm border-slate-200 shadow-xl">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="time" className="text-slate-700 font-medium">Time *</Label>
              <div className="flex w-full items-center space-x-2">
                <Clock className="h-4 w-4 text-slate-500" />
                <Input 
                  id="time" 
                  value={time} 
                  onChange={e => setTime(e.target.value)} 
                  placeholder="e.g. 9:00 AM - 10:00 AM" 
                  className="bg-white/80 backdrop-blur-sm border-slate-200 focus:bg-white transition-all duration-300"
                  required 
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type" className="text-slate-700 font-medium">Event Type *</Label>
            <Select value={type} onValueChange={(value: "job" | "meeting" | "delivery") => setType(value)}>
              <SelectTrigger id="type" className="bg-white/80 backdrop-blur-sm border-slate-200 focus:bg-white transition-all duration-300">
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-sm border-slate-200 shadow-xl">
                <SelectItem value="job">Job</SelectItem>
                <SelectItem value="meeting">Meeting</SelectItem>
                <SelectItem value="delivery">Delivery</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-slate-700 font-medium">Location</Label>
            <Input 
              id="location" 
              value={location} 
              onChange={e => setLocation(e.target.value)} 
              placeholder="Enter location (optional)" 
              className="bg-white/80 backdrop-blur-sm border-slate-200 focus:bg-white transition-all duration-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-700 font-medium">Description</Label>
            <Textarea 
              id="description" 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              placeholder="Add details about this event (optional)" 
              className="bg-white/80 backdrop-blur-sm border-slate-200 focus:bg-white transition-all duration-300"
              rows={3} 
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={addEvent.isPending} 
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            {addEvent.isPending ? "Adding..." : "Add Event"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EventForm;
