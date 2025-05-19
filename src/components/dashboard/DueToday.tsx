
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDevMode } from "@/context/DevModeContext";

const DueToday: React.FC = () => {
  const { isDevMode } = useDevMode();
  
  // Mock data for dev mode
  const mockDueItems = [
    {
      id: "1",
      title: "Final Clear Coat: Audi A4 Quarter Panel",
      status: "In Progress",
      assignee: "David Chen",
      priority: "High"
    },
    {
      id: "2",
      title: "Client Review: Lexus ES350 Repaint",
      status: "Pending",
      assignee: "Sarah Miller",
      priority: "Medium"
    },
    {
      id: "3",
      title: "Quality Check: Mercedes C-Class Bumper",
      status: "Ready",
      assignee: "Michael Brown",
      priority: "High"
    },
    {
      id: "4",
      title: "Material Order: PPG Base Coats",
      status: "Pending",
      assignee: "Alex Johnson",
      priority: "Medium"
    }
  ];
  
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high": return "bg-red-500";
      case "medium": return "bg-amber-500";
      case "low": return "bg-green-500";
      default: return "bg-blue-500";
    }
  };
  
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Due Today</span>
          {isDevMode && <Badge variant="outline">{mockDueItems.length}</Badge>}
        </CardTitle>
        <CardDescription>Items requiring attention today</CardDescription>
      </CardHeader>
      <CardContent>
        {isDevMode ? (
          <div className="space-y-4">
            {mockDueItems.map((item) => (
              <div key={item.id} className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-sm">{item.title}</h3>
                  <Badge className={getPriorityColor(item.priority)}>{item.priority}</Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div>Assignee: {item.assignee}</div>
                  <div>Status: {item.status}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center py-8">
            <p className="text-muted-foreground">No items due today</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DueToday;
