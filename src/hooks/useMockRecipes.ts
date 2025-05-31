
import { useQuery } from "@tanstack/react-query";
import { mockData, useMockData } from "@/utils/mockData";

export const useMockRecipes = () => {
  const showMockData = useMockData();

  return useQuery({
    queryKey: ["mock-recipes"],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 400));
      return mockData.recipes;
    },
    enabled: showMockData
  });
};
