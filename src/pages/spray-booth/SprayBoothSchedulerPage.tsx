
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Settings } from "lucide-react";
import { SprayBoothScheduler } from "./components/SprayBoothScheduler";
import { BoothManagement } from "./components/BoothManagement";
import SprayBoothStats from "./components/SprayBoothStats";
import { useSprayBooths } from "./hooks/useSprayBooths";
import { useMockSprayBooths } from "./hooks/useMockSprayBooths";
import { useBoothReservations } from "./hooks/useBoothReservations";
import { useMockBoothReservations } from "./hooks/useMockBoothReservations";
import { useMockData } from "@/utils/mockData";
import { toast } from "sonner";

const SprayBoothSchedulerPage = () => {
  const [activeTab, setActiveTab] = useState<"scheduler" | "management">("scheduler");
  const showMockData = useMockData();
  
  const { data: realBooths = [], isLoading: realBoothsLoading, error: realError } = useSprayBooths();
  const { data: mockBooths = [], isLoading: mockBoothsLoading } = useMockSprayBooths();
  
  const { data: realReservations = [], isLoading: realReservationsLoading } = useBoothReservations(new Date());
  const { data: mockReservations = [], isLoading: mockReservationsLoading } = useMockBoothReservations(new Date());
  
  const booths = showMockData ? mockBooths : realBooths;
  const reservations = showMockData ? mockReservations : realReservations;
  const isLoading = showMockData 
    ? (mockBoothsLoading || mockReservationsLoading) 
    : (realBoothsLoading || realReservationsLoading);
  const error = showMockData ? null : realError;

  if (error && !showMockData) {
    toast.error("Failed to load spray booths");
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Spray Booth Scheduler</h1>
          <p className="text-muted-foreground">
            Manage spray booth reservations and optimize workflow scheduling
            {showMockData && (
              <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Demo Mode
              </span>
            )}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={activeTab === "scheduler" ? "default" : "outline"}
            onClick={() => setActiveTab("scheduler")}
          >
            Scheduler
          </Button>
          <Button
            variant={activeTab === "management" ? "default" : "outline"}
            onClick={() => setActiveTab("management")}
            className="flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            Manage Booths
          </Button>
        </div>
      </div>

      <SprayBoothStats 
        booths={booths} 
        reservations={reservations} 
        isLoading={isLoading} 
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading spray booths...</div>
        </div>
      ) : (
        <>
          {activeTab === "scheduler" && (
            <SprayBoothScheduler booths={booths} />
          )}
          
          {activeTab === "management" && (
            <BoothManagement booths={booths} />
          )}
        </>
      )}
    </div>
  );
};

export default SprayBoothSchedulerPage;
