import React from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format, addDays, isSameDay } from "date-fns";
interface TasksHeaderProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}
const TasksHeader: React.FC<TasksHeaderProps> = ({
  selectedDate,
  onDateChange
}) => {
  const isToday = isSameDay(selectedDate, new Date());
  const navigateDate = (direction: "prev" | "next") => {
    const days = direction === "prev" ? -1 : 1;
    onDateChange(addDays(selectedDate, days));
  };
  const goToToday = () => {
    onDateChange(new Date());
  };
  return <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold tracking-tight text-purple-600">Daily Tasks</h1>
      
      <div className="flex items-center gap-2">
        <div className="bg-background border rounded-md flex items-center p-1">
          <Button variant="ghost" size="icon" onClick={() => navigateDate("prev")}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous day</span>
          </Button>
          
          <Button variant="ghost" className="flex items-center gap-1 px-3 font-medium" onClick={goToToday}>
            <Calendar className="mr-1 h-4 w-4" />
            {isToday ? "Today" : format(selectedDate, "MMMM d, yyyy")}
          </Button>
          
          <Button variant="ghost" size="icon" onClick={() => navigateDate("next")}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next day</span>
          </Button>
        </div>
      </div>
    </div>;
};
export default TasksHeader;