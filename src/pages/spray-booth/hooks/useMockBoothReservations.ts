
import { useQuery } from "@tanstack/react-query";
import { format, startOfWeek, endOfWeek } from "date-fns";
import { mockData, useMockData } from "@/utils/mockData";
import { BoothReservation } from "../types";

export const useMockBoothReservations = (selectedDate: Date) => {
  const showMockData = useMockData();
  const weekStart = startOfWeek(selectedDate);
  const weekEnd = endOfWeek(selectedDate);

  return useQuery({
    queryKey: ["mock-booth-reservations", format(weekStart, "yyyy-MM-dd"), format(weekEnd, "yyyy-MM-dd")],
    queryFn: async (): Promise<BoothReservation[]> => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return mockData.boothReservations.map(reservation => ({
        ...reservation,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }));
    },
    enabled: showMockData
  });
};
