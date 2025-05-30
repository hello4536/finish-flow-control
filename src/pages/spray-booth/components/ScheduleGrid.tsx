
import React from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { SprayBooth, BoothReservation } from "../types";

interface ScheduleGridProps {
  booths: SprayBooth[];
  weekDays: Date[];
  reservations: BoothReservation[];
  onSlotClick: (boothId: string, date: Date, startTime: string) => void;
  isLoading: boolean;
}

export const ScheduleGrid: React.FC<ScheduleGridProps> = ({
  booths,
  weekDays,
  reservations,
  onSlotClick,
  isLoading
}) => {
  const timeSlots = [
    "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
    "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
    "18:00", "19:00", "20:00", "21:00", "22:00"
  ];

  const getReservationForSlot = (boothId: string, date: Date, time: string) => {
    return reservations.find(r => 
      r.booth_id === boothId &&
      format(new Date(r.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd") &&
      r.start_time <= time &&
      r.end_time > time
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading schedule...</div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[1200px]">
        {/* Header */}
        <div className="grid grid-cols-[200px_repeat(7,1fr)] gap-1 mb-2">
          <div className="p-2 font-semibold">Booth / Time</div>
          {weekDays.map(day => (
            <div key={day.toString()} className="p-2 text-center font-semibold">
              <div>{format(day, "EEE")}</div>
              <div className="text-sm text-muted-foreground">{format(day, "MMM d")}</div>
            </div>
          ))}
        </div>

        {/* Schedule Grid */}
        {booths.map(booth => (
          <div key={booth.id} className="mb-4 border rounded-lg overflow-hidden">
            <div className="bg-muted p-2 font-semibold flex items-center justify-between">
              <div>
                <span>{booth.name}</span>
                <Badge 
                  variant={booth.status === "active" ? "default" : "destructive"}
                  className="ml-2"
                >
                  {booth.status}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                Booth #{booth.booth_number}
              </div>
            </div>
            
            {timeSlots.map(time => (
              <div key={time} className="grid grid-cols-[200px_repeat(7,1fr)] gap-1 border-t">
                <div className="p-2 text-sm font-medium bg-muted/50">
                  {time}
                </div>
                {weekDays.map(day => {
                  const reservation = getReservationForSlot(booth.id, day, time);
                  const isDisabled = booth.status !== "active";
                  
                  return (
                    <div
                      key={`${day.toString()}-${time}`}
                      className={cn(
                        "h-12 border-l cursor-pointer transition-colors",
                        isDisabled ? "bg-gray-100 cursor-not-allowed" : "hover:bg-accent",
                        reservation ? "bg-blue-100" : ""
                      )}
                      onClick={() => !isDisabled && !reservation && onSlotClick(booth.id, day, time)}
                    >
                      {reservation && (
                        <div className="h-full p-1">
                          <div className={cn(
                            "h-full rounded text-xs text-white p-1 flex flex-col justify-center",
                            getPriorityColor(reservation.priority)
                          )}>
                            <div className="font-semibold truncate">
                              {reservation.reserved_by}
                            </div>
                            <div className="truncate">
                              {reservation.job_reference || "General"}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
