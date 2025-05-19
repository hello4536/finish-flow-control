
import { seedUsers } from "./seedUsers";
import { silentReset } from "./resetData";

export async function initializeApp() {
  try {
    console.log("Initializing app...");
    
    // First reset all data to ensure a clean state
    await silentReset();
    
    // Then seed users
    await seedUsers();
    
    console.log("App initialization complete");
  } catch (error) {
    console.error("Error initializing app:", error);
  }
}
