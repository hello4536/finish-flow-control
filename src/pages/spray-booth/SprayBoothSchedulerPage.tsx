
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Spray Booth Scheduler
            </h1>
            <p className="text-slate-600 mt-2 font-medium">
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
              className={activeTab === "scheduler" 
                ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" 
                : "bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-white transition-all duration-300"
              }
            >
              Scheduler
            </Button>
            <Button
              variant={activeTab === "management" ? "default" : "outline"}
              onClick={() => setActiveTab("management")}
              className={`flex items-center gap-2 ${activeTab === "management" 
                ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" 
                : "bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-white transition-all duration-300"
              }`}
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
          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="flex justify-center items-center h-64">
              <div className="text-lg text-slate-600">Loading spray booths...</div>
            </CardContent>
          </Card>
        ) : (
          <>
            {activeTab === "scheduler" && (
              <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg">
                <SprayBoothScheduler booths={booths} />
              </div>
            )}
            
            {activeTab === "management" && (
              <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg">
                <BoothManagement booths={booths} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SprayBoothSchedulerPage;
