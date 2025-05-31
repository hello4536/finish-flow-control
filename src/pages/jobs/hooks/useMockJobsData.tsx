
import { useQuery } from "@tanstack/react-query";
import { mockData, useMockData } from "@/utils/mockData";

export const useMockJobsData = () => {
  const showMockData = useMockData();

  return useQuery({
    queryKey: ["mock-jobs"],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return mockData.jobs;
    },
    enabled: showMockData
  });
};
