import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Materials from "./Materials";
import EquipmentPage from "./equipment/EquipmentPage";
import { Package, Package2, Wrench, Building } from "lucide-react";

const AssetManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Package className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Asset Management</h1>
          <p className="text-muted-foreground">Manage all your physical resources and inventory in one place</p>
        </div>
      </div>

      <Tabs defaultValue="materials" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="materials" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Materials
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex items-center gap-2">
            <Package2 className="h-4 w-4" />
            Inventory
          </TabsTrigger>
          <TabsTrigger value="equipment" className="flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            Equipment
          </TabsTrigger>
          <TabsTrigger value="booths" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Spray Booths
          </TabsTrigger>
        </TabsList>

        <TabsContent value="materials" className="space-y-6">
          <Materials />
        </TabsContent>

        <TabsContent value="inventory" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Management</CardTitle>
              <CardDescription>Track stock levels, locations, and material availability</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Inventory management system coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="equipment" className="space-y-6">
          <EquipmentPage />
        </TabsContent>

        <TabsContent value="booths" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Spray Booth Scheduler</CardTitle>
              <CardDescription>Schedule and manage spray booth reservations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Spray booth scheduling system coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AssetManagement;