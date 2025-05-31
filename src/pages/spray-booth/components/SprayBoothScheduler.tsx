
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Plus } from "lucide-react";
import { format, addDays, startOfWeek } from "date-fns";
import { ScheduleGrid } from "./ScheduleGrid";
import { ReservationDialog } from "./ReservationDialog";
import { useBoothReservations } from "../hooks/useBoothReservations";
import { useMockBoothReservations } from "../hooks/useMockBoothReservations";
import { useMockData } from "@/utils/mockData";
import { SprayBooth } from "../types";

interface SprayBoothSchedulerProps {
  booths: SprayBooth[];
}

export const SprayBoothScheduler: React.FC<SprayBoothSchedulerProps> = ({ booths }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showReservationDialog, setShowReservationDialog] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{
    boothId: string;
    date: Date;
    startTime: string;
  } | null>(null);

  const showMockData = useMockData();
  const { data: realReservations = [], isLoading: realLoading } = useBoothReservations(selectedDate);
  const { data: mockReservations = [], isLoading: mockLoading } = useMockBoothReservations(selectedDate);
  
  const reservations = showMockData ? mockReservations : realReservations;
  const isLoading = showMockData ? mockLoading : realLoading;

  const weekStart = startOfWeek(selectedDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const handleSlotClick = (boothId: string, date: Date, startTime: string) => {
    if (!showMockData) {
      setSelectedSlot({ boothId, date, startTime });
      setShowReservationDialog(true);
    }
  };

  if (booths.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Spray Booths Available</h3>
          <p className="text-muted-foreground text-center mb-4">
            {showMockData 
              ? "Demo booths are loading..." 
              : "Add spray booths to start scheduling reservations"
            }
          </p>
          {!showMockData && (
            <Button onClick={() => {}} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add First Booth
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Weekly Schedule - {format(weekStart, "MMM d")} - {format(addDays(weekStart, 6), "MMM d, yyyy")}</span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setSelectedDate(addDays(selectedDate, -7))}
              >
                Previous Week
              </Button>
              <Button
                variant="outline"
                onClick={() => setSelectedDate(new Date())}
              >
                Today
              </Button>
              <Button
                variant="outline"
                onClick={() => setSelectedDate(addDays(selectedDate, 7))}
              >
                Next Week
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScheduleGrid
            booths={booths}
            weekDays={weekDays}
            reservations={reservations}
            onSlotClick={handleSlotClick}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>

      {!showMockData && (
        <ReservationDialog
          open={showReservationDialog}
          onOpenChange={setShowReservationDialog}
          selectedSlot={selectedSlot}
          booths={booths}
        />
      )}
    </div>
  );
};
