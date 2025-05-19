
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useDevMode } from "@/context/DevModeContext";

const MaterialUsage: React.FC = () => {
  const { isDevMode } = useDevMode();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Material Usage</CardTitle>
        <CardDescription>Top materials used this week</CardDescription>
      </CardHeader>
      <CardContent>
        {isDevMode ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Satin Polyurethane</span>
                <span>75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Dark Walnut Stain</span>
                <span>62%</span>
              </div>
              <Progress value={62} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">120 Grit Sandpaper</span>
                <span>45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Mahogany Stain</span>
                <span>38%</span>
              </div>
              <Progress value={38} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Wood Filler</span>
                <span>25%</span>
              </div>
              <Progress value={25} className="h-2" />
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center py-8">
            <p className="text-muted-foreground">No usage data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MaterialUsage;
