
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const MaterialUsage: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Material Usage</CardTitle>
        <CardDescription>Top materials used this week</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center items-center py-8">
          <p className="text-muted-foreground">No usage data available</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaterialUsage;
