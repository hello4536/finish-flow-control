
import { useQuery } from "@tanstack/react-query";
import { mockData, useMockData } from "@/utils/mockData";

export const useMockStains = () => {
  const showMockData = useMockData();

  return useQuery({
    queryKey: ["mock-stains"],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockData.stains;
    },
    enabled: showMockData
  });
};
