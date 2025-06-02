
// Centralized mock data for all pages - now disabled by default
export const mockData = {
  // All mock data arrays are now empty by default
  activityFeed: [],
  dueToday: [],
  materialUsage: [],
  employeeTasks: [],
  jobs: [],
  paintColors: [],
  stains: [],
  recipes: [],
  bookmarks: [],
  dailyTasks: [],
  equipment: [],
  equipmentAssignments: [],
  equipmentMaintenance: [],
  sprayBooths: [],
  boothReservations: []
};

// Helper function to enable/disable mock data
export const useMockData = () => {
  // Return false to disable mock data by default
  return false;
};
