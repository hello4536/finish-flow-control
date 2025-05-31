
import { useQuery } from "@tanstack/react-query";
import { mockData, useMockData } from "@/utils/mockData";
import { SprayBooth } from "../types";

export const useMockSprayBooths = () => {
  const showMockData = useMockData();

  return useQuery({
    queryKey: ["mock-spray-booths"],
    queryFn: async (): Promise<SprayBooth[]> => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return mockData.sprayBooths.map(booth => ({
        ...booth,
        status: booth.status as "active" | "maintenance" | "offline",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }));
    },
    enabled: showMockData
  });
};
