
import React, { createContext, useContext, useState, ReactNode } from "react";

interface DevModeContextType {
  isDevMode: boolean;
  toggleDevMode: () => void;
  seedDemoData: () => Promise<void>;
}

const DevModeContext = createContext<DevModeContextType | undefined>(undefined);

export function DevModeProvider({ children }: { children: ReactNode }) {
  // Enable dev mode by default to show mock data
  const [isDevMode, setIsDevMode] = useState<boolean>(true);

  const toggleDevMode = () => {
    setIsDevMode(prev => !prev);
    console.log("Developer mode toggled:", !isDevMode);
  };
  
  const seedDemoData = async () => {
    console.log("Demo data seeding simulation");
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
