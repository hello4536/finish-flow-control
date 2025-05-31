
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

  // Custom Creations - Paint Colors
  paintColors: [
    {
      id: "paint-1",
      name: "Ocean Breeze Blue",
      hex_code: "#4A90E2",
      rgb_values: "74, 144, 226",
      cmyk_values: "67, 36, 0, 11",
      lab_values: "60.3, 5.2, -45.8",
      substrate_type: "Metal",
      application_method: "Spray Gun",
      environmental_notes: "Temperature: 72°F, Humidity: 45%",
      delta_e: "1.2",
      created_by: "Sarah Chen",
      temperature: "72°F",
      humidity: "45%",
      booth_lighting: "D65 Standard",
      notes: "Perfect match for marine applications",
      created_at: "2024-01-15T10:00:00Z",
      updated_at: "2024-01-15T10:00:00Z"
    },
    {
      id: "paint-2",
      name: "Sunset Copper",
      hex_code: "#CD7F32",
      rgb_values: "205, 127, 50",
      cmyk_values: "0, 38, 76, 20",
      lab_values: "58.7, 18.4, 42.1",
      substrate_type: "Wood",
      application_method: "Brush",
      environmental_notes: "Temperature: 68°F, Humidity: 50%",
      delta_e: "0.8",
      created_by: "Mike Rodriguez",
      temperature: "68°F",
      humidity: "50%",
      booth_lighting: "Cool White LED",
      notes: "Excellent for antique furniture restoration",
      created_at: "2024-01-20T14:30:00Z",
      updated_at: "2024-01-20T14:30:00Z"
    },
    {
      id: "paint-3",
      name: "Forest Green Metallic",
      hex_code: "#355E3B",
      rgb_values: "53, 94, 59",
      cmyk_values: "44, 0, 37, 63",
      lab_values: "35.2, -18.7, 12.4",
      substrate_type: "Automotive",
      application_method: "HVLP Spray",
      environmental_notes: "Temperature: 70°F, Humidity: 40%",
      delta_e: "1.5",
      created_by: "Jennifer Liu",
      temperature: "70°F",
      humidity: "40%",
      booth_lighting: "Full Spectrum",
      notes: "Custom color for luxury vehicle restoration",
      created_at: "2024-01-25T09:15:00Z",
      updated_at: "2024-01-25T09:15:00Z"
    }
  ],

  // Custom Creations - Stains
  stains: [
    {
      id: "stain-1",
      name: "Vintage Mahogany",
      color: "#8B4513",
      brand: "Custom Mix",
      components: [
        { name: "Red Oak Stain", percentage: 60, notes: "Base color" },
        { name: "Walnut Stain", percentage: 30, notes: "Depth" },
        { name: "Cherry Stain", percentage: 10, notes: "Warmth" }
      ],
      application_method: "Cloth Application",
      drying_time: "4-6 hours",
      coverage: "150 sq ft per quart",
      surface_prep: "Sand to 220 grit, clean with tack cloth",
      notes: "Perfect for antique furniture restoration. Apply in thin, even coats.",
      created_at: "2024-01-18T11:00:00Z",
      updated_at: "2024-01-18T11:00:00Z"
    },
    {
      id: "stain-2",
      name: "Weathered Barn Wood",
      color: "#696969",
      brand: "Artisan Blend",
      components: [
        { name: "Gray Stain", percentage: 70, notes: "Primary base" },
        { name: "Black Stain", percentage: 20, notes: "Weathering effect" },
        { name: "Brown Stain", percentage: 10, notes: "Subtle warmth" }
      ],
      application_method: "Rag Technique",
      drying_time: "6-8 hours",
      coverage: "200 sq ft per quart",
      surface_prep: "Light sanding, remove all dust",
      notes: "Creates authentic weathered appearance. Work quickly to avoid lap marks.",
      created_at: "2024-01-22T15:20:00Z",
      updated_at: "2024-01-22T15:20:00Z"
    },
    {
      id: "stain-3",
      name: "Golden Honey Pine",
      color: "#DAA520",
      brand: "Master Craftsman",
      components: [
        { name: "Pine Stain", percentage: 50, notes: "Natural wood tone" },
        { name: "Honey Stain", percentage: 35, notes: "Golden hue" },
        { name: "Amber Stain", percentage: 15, notes: "Richness" }
      ],
      application_method: "Brush and Wipe",
      drying_time: "4 hours",
      coverage: "175 sq ft per quart",
      surface_prep: "Sand progressively to 320 grit",
      notes: "Excellent for pine furniture and trim work. Pre-conditioner recommended.",
      created_at: "2024-01-28T13:45:00Z",
      updated_at: "2024-01-28T13:45:00Z"
    }
  ],

  // Custom Creations - Recipes
  recipes: [
    {
      id: "recipe-1",
      name: "High-Gloss Clear Coat Formula",
      description: "Professional-grade clear coat for automotive applications",
      cooking_time: "2 hours mixing + 24 hours cure",
      materials: JSON.stringify([
        { name: "Acrylic Resin", amount: "500", unit: "ml" },
        { name: "Isocyanate Hardener", amount: "125", unit: "ml" },
        { name: "Thinner", amount: "100", unit: "ml" },
        { name: "Flow Additive", amount: "15", unit: "ml" }
      ]),
      instructions: "1. Mix acrylic resin and hardener in 4:1 ratio\n2. Add thinner gradually while stirring\n3. Add flow additive and mix thoroughly\n4. Strain through fine mesh\n5. Allow to rest for 10 minutes before application\n6. Apply in thin, even coats\n7. Allow 24 hours between coats",
      total_volume: "740 ml",
      created_at: "2024-01-16T09:30:00Z",
      updated_at: "2024-01-16T09:30:00Z"
    },
    {
      id: "recipe-2",
      name: "Wood Sealer Base",
      description: "Universal wood sealer for various wood types",
      cooking_time: "30 minutes mixing + 12 hours cure",
      materials: JSON.stringify([
        { name: "Shellac", amount: "300", unit: "ml" },
        { name: "Denatured Alcohol", amount: "200", unit: "ml" },
        { name: "Retarder", amount: "25", unit: "ml" }
      ]),
      instructions: "1. Dissolve shellac in alcohol slowly\n2. Stir continuously until fully dissolved\n3. Add retarder to slow drying time\n4. Filter through cheesecloth\n5. Apply with brush or spray\n6. Sand lightly between coats with 320 grit",
      total_volume: "525 ml",
      created_at: "2024-01-19T14:15:00Z",
      updated_at: "2024-01-19T14:15:00Z"
    },
    {
      id: "recipe-3",
      name: "Custom Texture Paste",
      description: "Heavy-body texture medium for decorative finishes",
      cooking_time: "45 minutes mixing",
      materials: JSON.stringify([
        { name: "Acrylic Medium", amount: "400", unit: "ml" },
        { name: "Fine Sand", amount: "150", unit: "g" },
        { name: "Mica Powder", amount: "10", unit: "g" },
        { name: "Titanium Dioxide", amount: "20", unit: "g" }
      ]),
      instructions: "1. Start with acrylic medium as base\n2. Slowly add fine sand while mixing\n3. Incorporate mica powder for subtle sparkle\n4. Add titanium dioxide for opacity\n5. Mix until uniform consistency\n6. Apply with palette knife or trowel\n7. Texture while wet for desired effect",
      total_volume: "580 ml",
      created_at: "2024-01-23T16:00:00Z",
      updated_at: "2024-01-23T16:00:00Z"
    }
  ],

  // Custom Creations - Bookmarks
  bookmarks: [
    {
      id: "bookmark-1",
      title: "Advanced Spray Gun Techniques",
      url: "https://spraygunacademy.com/advanced-techniques",
      category: "Training",
      description: "Comprehensive guide to professional spray gun operation and maintenance",
      notes: "Excellent resource for training new employees. Covers HVLP, conventional, and airbrush techniques.",
      created_at: "2024-01-17T10:45:00Z",
      updated_at: "2024-01-17T10:45:00Z"
    },
    {
      id: "bookmark-2",
      title: "Wood Species Identification Guide",
      url: "https://woodworking.org/species-guide",
      category: "Reference",
      description: "Visual guide to identifying common and exotic wood species",
      notes: "Helpful for selecting appropriate stains and finishes. Great photos and grain patterns.",
      created_at: "2024-01-21T13:20:00Z",
      updated_at: "2024-01-21T13:20:00Z"
    },
    {
      id: "bookmark-3",
      title: "Color Matching Software Demo",
      url: "https://colortech.com/software-demo",
      category: "Tools",
      description: "Professional color matching software for automotive refinishing",
      notes: "Free trial available. Very accurate color matching capabilities. Worth the investment.",
      created_at: "2024-01-26T11:30:00Z",
      updated_at: "2024-01-26T11:30:00Z"
    },
    {
      id: "bookmark-4",
      title: "Safety Data Sheet Database",
      url: "https://sds-database.safety.gov",
      category: "Safety",
      description: "Comprehensive database of safety data sheets for chemical products",
      notes: "Always check here for the latest SDS information. Updated regularly by manufacturers.",
      created_at: "2024-01-29T09:15:00Z",
      updated_at: "2024-01-29T09:15:00Z"
    }
  ],

  // Daily Tasks
  dailyTasks: [
    {
      id: "task-1",
      title: "Morning equipment inspection",
      description: "Check all spray booths, compressors, and ventilation systems",
      priority: "high",
      status: "completed",
      user_id: "user-1",
      assignee: { name: "Sarah Chen", id: "user-1" },
      due_date: "2024-01-31",
      due_time: "08:00",
      created_at: "2024-01-31T06:00:00Z",
      updated_at: "2024-01-31T08:15:00Z"
    },
    {
      id: "task-2",
      title: "Prepare Tesla Model S for base coat",
      description: "Complete surface preparation and masking for Tesla Model S refinishing project",
      priority: "high",
      status: "pending",
      user_id: "user-1",
      assignee: { name: "Sarah Chen", id: "user-1" },
      due_date: "2024-01-31",
      due_time: "10:00",
      created_at: "2024-01-31T06:30:00Z",
      updated_at: "2024-01-31T06:30:00Z"
    },
    {
      id: "task-3",
      title: "Mix custom stain for antique dresser",
      description: "Prepare vintage mahogany stain formula for antique furniture restoration",
      priority: "medium",
      status: "pending",
      user_id: "user-2",
      assignee: { name: "Mike Rodriguez", id: "user-2" },
      due_date: "2024-01-31",
      due_time: "11:30",
      created_at: "2024-01-31T07:00:00Z",
      updated_at: "2024-01-31T07:00:00Z"
    },
    {
      id: "task-4",
      title: "Quality inspection - yacht deck sections",
      description: "Perform detailed quality check on completed yacht deck refinishing work",
      priority: "urgent",
      status: "completed",
      user_id: "user-3",
      assignee: { name: "Jennifer Liu", id: "user-3" },
      due_date: "2024-01-31",
      due_time: "09:00",
      created_at: "2024-01-31T06:15:00Z",
      updated_at: "2024-01-31T09:30:00Z"
    },
    {
      id: "task-5",
      title: "Inventory restock - clear coat supplies",
      description: "Check inventory levels and reorder clear coat materials as needed",
      priority: "medium",
      status: "pending",
      user_id: "user-4",
      assignee: { name: "Tom Wilson", id: "user-4" },
      due_date: "2024-01-31",
      due_time: "14:00",
      created_at: "2024-01-31T07:30:00Z",
      updated_at: "2024-01-31T07:30:00Z"
    },
    {
      id: "task-6",
      title: "Clean and maintain spray booth #2",
      description: "Perform routine cleaning and filter replacement for spray booth #2",
      priority: "medium",
      status: "pending",
      user_id: "user-4",
      assignee: { name: "Tom Wilson", id: "user-4" },
      due_date: "2024-01-31",
      due_time: "16:00",
      created_at: "2024-01-31T08:00:00Z",
      updated_at: "2024-01-31T08:00:00Z"
    },
    {
      id: "task-7",
      title: "Client consultation - kitchen cabinet project",
      description: "Meet with client to discuss color options and timeline for kitchen cabinet refinishing",
      priority: "high",
      status: "pending",
      user_id: "user-2",
      assignee: { name: "Mike Rodriguez", id: "user-2" },
      due_date: "2024-01-31",
      due_time: "15:30",
      created_at: "2024-01-31T08:15:00Z",
      updated_at: "2024-01-31T08:15:00Z"
    }
  ],

  // Equipment
  equipment: [
    {
      id: "equip-1",
      name: "Professional HVLP Spray Gun Set",
      type: "Spray Equipment",
      brand: "DeVilbiss",
      model: "GTi Pro Lite",
      serial_number: "DV-2024-001",
      purchase_date: "2023-06-15",
      purchase_cost: 899.99,
      condition: "Excellent",
      status: "Available",
      notes: "Primary spray gun for automotive work. Recently serviced.",
      created_at: "2023-06-15T10:00:00Z",
      updated_at: "2024-01-30T14:20:00Z"
    },
    {
      id: "equip-2",
      name: "Industrial Air Compressor",
      type: "Compressor",
      brand: "Ingersoll Rand",
      model: "SS3L3",
      serial_number: "IR-2023-047",
      purchase_date: "2023-03-20",
      purchase_cost: 1899.99,
      condition: "Good",
      status: "Assigned",
      notes: "Main shop compressor. 60-gallon tank, 3.7 HP motor.",
      created_at: "2023-03-20T09:30:00Z",
      updated_at: "2024-01-29T16:45:00Z"
    },
    {
      id: "equip-3",
      name: "Orbital Sander - Heavy Duty",
      type: "Power Tool",
      brand: "Festool",
      model: "ETS 150/3",
      serial_number: "FT-2023-189",
      purchase_date: "2023-09-10",
      purchase_cost: 349.99,
      condition: "Excellent",
      status: "Available",
      notes: "Perfect for fine finishing work. Dust collection included.",
      created_at: "2023-09-10T11:15:00Z",
      updated_at: "2024-01-28T13:10:00Z"
    },
    {
      id: "equip-4",
      name: "Paint Mixing Station",
      type: "Mixing Equipment",
      brand: "Fluid Management",
      model: "FMS-2000",
      serial_number: "FM-2023-334",
      purchase_date: "2023-07-25",
      purchase_cost: 2499.99,
      condition: "Good",
      status: "Available",
      notes: "Automated paint mixing system with scale and database.",
      created_at: "2023-07-25T14:00:00Z",
      updated_at: "2024-01-26T10:30:00Z"
    },
    {
      id: "equip-5",
      name: "Spray Booth #1 - Large Format",
      type: "Spray Booth",
      brand: "Global Finishing",
      model: "Ultra-Flow 20x12",
      serial_number: "GF-2022-501",
      purchase_date: "2022-11-15",
      purchase_cost: 15999.99,
      condition: "Excellent",
      status: "Active",
      notes: "Main spray booth for large vehicles and furniture pieces.",
      created_at: "2022-11-15T08:00:00Z",
      updated_at: "2024-01-30T09:45:00Z"
    },
    {
      id: "equip-6",
      name: "Heat Gun - Variable Temperature",
      type: "Hand Tool",
      brand: "Wagner",
      model: "HT3500",
      serial_number: "WG-2024-012",
      purchase_date: "2024-01-10",
      purchase_cost: 89.99,
      condition: "Excellent",
      status: "Available",
      notes: "Digital temperature control, perfect for paint removal and curing.",
      created_at: "2024-01-10T12:30:00Z",
      updated_at: "2024-01-10T12:30:00Z"
    },
    {
      id: "equip-7",
      name: "Color Matching Light Box",
      type: "Testing Equipment",
      brand: "X-Rite",
      model: "SpectraLight QC",
      serial_number: "XR-2023-778",
      purchase_date: "2023-08-30",
      purchase_cost: 1299.99,
      condition: "Excellent",
      status: "Available",
      notes: "Professional color matching with multiple light sources.",
      created_at: "2023-08-30T15:45:00Z",
      updated_at: "2024-01-25T11:20:00Z"
    },
    {
      id: "equip-8",
      name: "Wood Planer - Professional",
      type: "Woodworking Tool",
      brand: "DeWalt",
      model: "DW735X",
      serial_number: "DW-2023-445",
      purchase_date: "2023-05-18",
      purchase_cost: 799.99,
      condition: "Good",
      status: "Maintenance",
      notes: "13-inch planer with stand. Scheduled for blade replacement.",
      created_at: "2023-05-18T13:20:00Z",
      updated_at: "2024-01-29T08:15:00Z"
    }
  ],

  // Equipment Assignments
  equipmentAssignments: [
    {
      id: "assign-1",
      equipment: {
        id: "equip-2",
        name: "Industrial Air Compressor",
        type: "Compressor"
      },
      assignee: {
        id: "user-1",
        name: "Sarah Chen"
      },
      assigner: {
        id: "admin-1",
        name: "Shop Manager"
      },
      assignedDate: "2024-01-29",
      status: "Active",
      notes: "Assigned for Tesla Model S project"
    },
    {
      id: "assign-2",
      equipment: {
        id: "equip-3",
        name: "Orbital Sander - Heavy Duty",
        type: "Power Tool"
      },
      assignee: {
        id: "user-2",
        name: "Mike Rodriguez"
      },
      assigner: {
        id: "admin-1",
        name: "Shop Manager"
      },
      assignedDate: "2024-01-30",
      status: "Active",
      notes: "For antique furniture restoration work"
    },
    {
      id: "assign-3",
      equipment: {
        id: "equip-7",
        name: "Color Matching Light Box",
        type: "Testing Equipment"
      },
      assignee: {
        id: "user-3",
        name: "Jennifer Liu"
      },
      assigner: {
        id: "admin-1",
        name: "Shop Manager"
      },
      assignedDate: "2024-01-28",
      returnDate: "2024-01-30",
      status: "Returned",
      notes: "Used for yacht deck color matching - project completed"
    }
  ],

  // Equipment Maintenance Records
  equipmentMaintenance: [
    {
      id: "maint-1",
      equipment: {
        id: "equip-1",
        name: "Professional HVLP Spray Gun Set",
        type: "Spray Equipment"
      },
      maintenanceType: "Routine Cleaning",
      performedBy: "Tom Wilson",
      maintenanceDate: "2024-01-25",
      nextMaintenanceDate: "2024-02-25",
      cost: 25.00,
      notes: "Complete disassembly, cleaning, and calibration. All seals replaced."
    },
    {
      id: "maint-2",
      equipment: {
        id: "equip-5",
        name: "Spray Booth #1 - Large Format",
        type: "Spray Booth"
      },
      maintenanceType: "Filter Replacement",
      performedBy: "Mike Rodriguez",
      maintenanceDate: "2024-01-20",
      nextMaintenanceDate: "2024-04-20",
      cost: 180.00,
      notes: "Replaced intake and exhaust filters. Checked airflow rates - all within spec."
    },
    {
      id: "maint-3",
      equipment: {
        id: "equip-8",
        name: "Wood Planer - Professional",
        type: "Woodworking Tool"
      },
      maintenanceType: "Blade Replacement",
      performedBy: "Jennifer Liu",
      maintenanceDate: "2024-01-30",
      nextMaintenanceDate: "2024-07-30",
      cost: 120.00,
      notes: "Installed new carbide blades. Calibrated cutting depth. Ready for operation."
    },
    {
      id: "maint-4",
      equipment: {
        id: "equip-2",
        name: "Industrial Air Compressor",
        type: "Compressor"
      },
      maintenanceType: "Oil Change",
      performedBy: "Tom Wilson",
      maintenanceDate: "2024-01-15",
      nextMaintenanceDate: "2024-04-15",
      cost: 45.00,
      notes: "Changed oil and air filter. Checked belt tension and pressure settings."
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
