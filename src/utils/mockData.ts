
// Centralized mock data for all pages
export const mockData = {
  // Dashboard activity feed
  activityFeed: [
    {
      id: "1",
      action: "Job completed",
      user: "Sarah Chen",
      details: "Auto Body Repair - Honda Civic bumper refinishing",
      timestamp: "2 hours ago",
      type: "completion"
    },
    {
      id: "2",
      action: "Material order received",
      user: "Mike Rodriguez",
      details: "Base coat primer - 5 gallons delivered",
      timestamp: "4 hours ago",
      type: "inventory"
    },
    {
      id: "3",
      action: "Quality inspection passed",
      user: "Jennifer Liu",
      details: "Custom cabinet staining project cleared",
      timestamp: "6 hours ago",
      type: "quality"
    },
    {
      id: "4",
      action: "Equipment maintenance",
      user: "Tom Wilson",
      details: "Spray booth #3 filter replacement completed",
      timestamp: "1 day ago",
      type: "maintenance"
    },
    {
      id: "5",
      action: "New job assigned",
      user: "Alex Thompson",
      details: "Yacht deck refinishing - 3-week project",
      timestamp: "1 day ago",
      type: "assignment"
    }
  ],

  // Enhanced due today items
  dueToday: [
    {
      id: "1",
      title: "Quality inspection - BMW door panel",
      assignee: "Jennifer Liu",
      priority: "high",
      time: "10:00 AM",
      type: "inspection"
    },
    {
      id: "2",
      title: "Client delivery - Antique dresser restoration",
      assignee: "Sarah Chen",
      priority: "urgent",
      time: "2:00 PM",
      type: "delivery"
    },
    {
      id: "3",
      title: "Material reorder - Clear coat supplies",
      assignee: "Mike Rodriguez",
      priority: "medium",
      time: "End of day",
      type: "procurement"
    },
    {
      id: "4",
      title: "Safety training - New employee orientation",
      assignee: "Tom Wilson",
      priority: "medium",
      time: "3:30 PM",
      type: "training"
    }
  ],

  // Material usage data
  materialUsage: [
    { material: "Base Coat Primer", usage: 45, color: "#1e40af", trend: "+12%" },
    { material: "Clear Coat Finish", usage: 38, color: "#059669", trend: "+8%" },
    { material: "Wood Stain", usage: 22, color: "#7c2d12", trend: "-5%" },
    { material: "Metal Polish", usage: 18, color: "#374151", trend: "+15%" },
    { material: "Sandpaper (Various)", usage: 15, color: "#f59e0b", trend: "+3%" }
  ],

  // Enhanced employee tasks
  employeeTasks: [
    {
      id: "1",
      title: "Apply base coat to Tesla Model S panels",
      assignee: { name: "Sarah Chen", id: "user-1" },
      priority: "high",
      status: "pending",
      estimatedTime: "2 hours"
    },
    {
      id: "2",
      title: "Sand and prep mahogany dining table",
      assignee: { name: "Mike Rodriguez", id: "user-2" },
      priority: "medium",
      status: "pending",
      estimatedTime: "4 hours"
    },
    {
      id: "3",
      title: "Quality check - Yacht deck sections",
      assignee: { name: "Jennifer Liu", id: "user-3" },
      priority: "urgent",
      status: "completed",
      estimatedTime: "1 hour"
    },
    {
      id: "4",
      title: "Mix custom stain for antique restoration",
      assignee: { name: "Tom Wilson", id: "user-4" },
      priority: "medium",
      status: "pending",
      estimatedTime: "1.5 hours"
    }
  ],

  // Jobs data
  jobs: [
    {
      id: "job-1",
      job_number: "JOB-2024-001",
      name: "Tesla Model S Complete Refinish",
      status: "in_progress",
      trade: "Auto Body",
      assigned_to: "Sarah Chen",
      current_step: "Base Coat Application",
      due_date: "2024-02-15",
      created_at: "2024-01-28T09:00:00Z",
      updated_at: "2024-01-30T14:30:00Z"
    },
    {
      id: "job-2",
      job_number: "JOB-2024-002",
      name: "Antique Mahogany Dining Set Restoration",
      status: "pending",
      trade: "Woodworking",
      assigned_to: "Mike Rodriguez",
      current_step: "Surface Preparation",
      due_date: "2024-02-20",
      created_at: "2024-01-29T11:00:00Z",
      updated_at: "2024-01-30T16:00:00Z"
    },
    {
      id: "job-3",
      job_number: "JOB-2024-003",
      name: "Luxury Yacht Deck Refinishing",
      status: "in_progress",
      trade: "Marine",
      assigned_to: "Alex Thompson",
      current_step: "Staining Process",
      due_date: "2024-03-10",
      created_at: "2024-01-25T08:30:00Z",
      updated_at: "2024-01-30T10:15:00Z"
    },
    {
      id: "job-4",
      job_number: "JOB-2024-004",
      name: "BMW 5 Series Door Panel Repair",
      status: "completed",
      trade: "Auto Body",
      assigned_to: "Jennifer Liu",
      current_step: "Final Quality Check",
      due_date: "2024-01-30",
      created_at: "2024-01-20T13:00:00Z",
      updated_at: "2024-01-30T17:00:00Z"
    },
    {
      id: "job-5",
      job_number: "JOB-2024-005",
      name: "Custom Kitchen Cabinet Staining",
      status: "on_hold",
      trade: "Woodworking",
      assigned_to: "Tom Wilson",
      current_step: "Awaiting Client Approval",
      due_date: "2024-02-25",
      created_at: "2024-01-26T10:00:00Z",
      updated_at: "2024-01-29T14:00:00Z"
    }
  ],

  // Spray booth mock data
  sprayBooths: [
    {
      id: "booth-1",
      name: "Precision Booth Alpha",
      booth_number: "001",
      location: "Building A - East Wing",
      capacity: 2,
      status: "active",
      specifications: {
        dimensions: "20x12x10 ft",
        airflow: "15,000 CFM",
        filterType: "Paint Arrestor + Carbon",
        lighting: "LED Full Spectrum"
      },
      notes: "Recently upgraded with new filtration system"
    },
    {
      id: "booth-2", 
      name: "Industrial Booth Beta",
      booth_number: "002",
      location: "Building A - West Wing",
      capacity: 3,
      status: "active",
      specifications: {
        dimensions: "24x16x12 ft",
        airflow: "20,000 CFM",
        filterType: "HEPA + Carbon",
        lighting: "LED Full Spectrum + UV"
      },
      notes: "Suitable for large vehicle projects"
    },
    {
      id: "booth-3",
      name: "Detail Booth Gamma",
      booth_number: "003", 
      location: "Building B - North Side",
      capacity: 1,
      status: "maintenance",
      specifications: {
        dimensions: "16x10x10 ft",
        airflow: "12,000 CFM",
        filterType: "Standard Paint Arrestor",
        lighting: "LED Standard"
      },
      notes: "Scheduled maintenance - filter replacement"
    },
    {
      id: "booth-4",
      name: "Specialty Booth Delta",
      booth_number: "004",
      location: "Building B - South Side", 
      capacity: 2,
      status: "offline",
      specifications: {
        dimensions: "18x14x10 ft",
        airflow: "16,000 CFM",
        filterType: "Multi-Stage Filtration",
        lighting: "LED Color-Corrected"
      },
      notes: "Equipment upgrade in progress"
    }
  ],

  // Spray booth reservations
  boothReservations: [
    {
      id: "res-1",
      booth_id: "booth-1",
      reserved_by: "Sarah Chen",
      start_time: "08:00",
      end_time: "12:00",
      date: "2024-01-31",
      job_reference: "Tesla Model S",
      status: "scheduled",
      priority: "high",
      notes: "Base coat application"
    },
    {
      id: "res-2", 
      booth_id: "booth-2",
      reserved_by: "Alex Thompson",
      start_time: "09:00",
      end_time: "15:00", 
      date: "2024-01-31",
      job_reference: "Yacht Deck",
      status: "in_progress",
      priority: "medium",
      notes: "Marine grade finish application"
    },
    {
      id: "res-3",
      booth_id: "booth-1", 
      reserved_by: "Jennifer Liu",
      start_time: "13:00",
      end_time: "17:00",
      date: "2024-01-31",
      job_reference: "BMW Door Panel",
      status: "scheduled",
      priority: "urgent",
      notes: "Final clear coat"
    }
  ]
};

// Helper function to enable/disable mock data
export const useMockData = () => {
  // This can be controlled via environment variable or settings
  return true; // Set to false to disable mock data
};
