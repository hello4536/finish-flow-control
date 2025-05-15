
import { seedUsers } from "./seedUsers";

export async function initializeApp() {
  try {
    console.log("Initializing app...");
    
    // Seed users
    await seedUsers();
    
    console.log("App initialization complete");
  } catch (error) {
    console.error("Error initializing app:", error);
  }
}
