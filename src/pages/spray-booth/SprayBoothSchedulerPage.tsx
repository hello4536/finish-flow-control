
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Settings } from "lucide-react";
import { SprayBoothScheduler } from "./components/SprayBoothScheduler";
import { BoothManagement } from "./components/BoothManagement";
import { useSprayBooths } from "./hooks/useSprayBooths";
import { toast } from "sonner";

const SprayBoothSchedulerPage = () => {
  const [activeTab, setActiveTab] = useState<"scheduler" | "management">("scheduler");
  const { data: booths = [], isLoading, error } = useSprayBooths();

  if (error) {
    toast.error("Failed to load spray booths");
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Spray Booth Scheduler</h1>
          <p className="text-muted-foreground">
            Manage spray booth reservations and optimize workflow scheduling
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
