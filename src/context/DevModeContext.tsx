
import React, { createContext, useContext, useState, ReactNode } from "react";

interface DevModeContextType {
  isDevMode: boolean;
  toggleDevMode: () => void;
  seedDemoData: () => Promise<void>;
}

const DevModeContext = createContext<DevModeContextType | undefined>(undefined);

export function DevModeProvider({ children }: { children: ReactNode }) {
  // Always set isDevMode to false and make methods no-ops
  const [isDevMode] = useState<boolean>(false);

  const toggleDevMode = () => {
    // This function is now disabled
    console.log("Developer mode has been disabled in this version");
  };
  
  const seedDemoData = async () => {
    // This function is now disabled
    console.log("Demo data seeding has been disabled in this version");
    return Promise.resolve();
  };

  const value = {
    isDevMode,
    toggleDevMode,
    seedDemoData,
  };

  return <DevModeContext.Provider value={value}>{children}</DevModeContext.Provider>;
}

export const useDevMode = () => {
  const context = useContext(DevModeContext);
  if (context === undefined) {
    throw new Error("useDevMode must be used within a DevModeProvider");
  }
  return context;
};
