
import { supabase } from "@/integrations/supabase/client";

export async function seedUsers() {
  const { data: existingUsers } = await supabase
    .from("app_users")
    .select("id")
    .limit(1);

  // Only seed if no users exist
  if (existingUsers && existingUsers.length > 0) {
    console.log("Users already exist, skipping seed");
    return;
  }

  // Mock user data
  const mockUsers = [
    { 
      name: "Alex Johnson", 
      email: "alex@finishflow.com", 
      role: "Admin", 
      status: "active",
      last_login: new Date().toISOString()
    },
    { 
      name: "Sarah Miller", 
      email: "sarah@finishflow.com", 
      role: "Manager", 
      status: "active",
      last_login: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    },
    { 
      name: "David Chen", 
      email: "david@finishflow.com", 
      role: "Technician", 
      status: "active",
      last_login: new Date().toISOString()
    },
    { 
      name: "Emma Wilson", 
      email: "emma@finishflow.com", 
      role: "Operator", 
      status: "inactive",
      last_login: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    { 
      name: "Michael Brown", 
      email: "michael@finishflow.com", 
      role: "QC Specialist", 
      status: "active",
      last_login: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    },
  ];

  try {
    const { error } = await supabase
      .from("app_users")
      .insert(mockUsers);

    if (error) {
      throw error;
    }

    console.log("Users seeded successfully");
  } catch (error) {
    console.error("Error seeding users:", error);
  }
}
