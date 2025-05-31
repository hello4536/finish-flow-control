
import { useQuery } from "@tanstack/react-query";
import { mockData, useMockData } from "@/utils/mockData";

export const useMockPaintColors = () => {
  const showMockData = useMockData();

  return useQuery({
    queryKey: ["mock-paint-colors"],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockData.paintColors;
    },
    enabled: showMockData
  });
};
