
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

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Daily Tasks
        </h1>
        <p className="text-slate-600 mt-2 font-medium">
          Assign and manage daily tasks for your team
        </p>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl flex items-center p-1 shadow-lg">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigateDate("prev")}
            className="hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:text-white transition-all duration-300"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous day</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="flex items-center gap-1 px-3 font-medium hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:text-white transition-all duration-300" 
            onClick={goToToday}
          >
            <Calendar className="mr-1 h-4 w-4" />
            {isToday ? "Today" : format(selectedDate, "MMMM d, yyyy")}
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigateDate("next")}
            className="hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:text-white transition-all duration-300"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next day</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TasksHeader;
