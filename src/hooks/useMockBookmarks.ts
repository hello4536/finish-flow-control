
import { useQuery } from "@tanstack/react-query";
import { mockData, useMockData } from "@/utils/mockData";

export const useMockBookmarks = () => {
  const showMockData = useMockData();

  return useQuery({
    queryKey: ["mock-bookmarks"],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 200));
      return mockData.bookmarks;
    },
    enabled: showMockData
  });
};
