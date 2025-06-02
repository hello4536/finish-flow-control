
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import LocationsTable from "./LocationsTable";
import AddLocationDialog from "./AddLocationDialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Location } from "@/types/inventory";

interface LocationsSectionProps {
  locations: Location[];
  isLoading: boolean;
  onLocationAdded?: () => void;
}

const LocationsSection: React.FC<LocationsSectionProps> = ({
  locations,
  isLoading,
  onLocationAdded
}) => {
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white via-blue-50/30 to-indigo-100/40 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Inventory Location Management
          </CardTitle>
          <CardDescription className="text-slate-600 font-medium">
            Organize and track inventory across warehouses, departments, sections, and storage units
          </CardDescription>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setAddDialogOpen(true)} 
          className="ml-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Location
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center p-8">
            <p>Loading location data...</p>
          </div>
        ) : (
          <LocationsTable locations={locations} />
        )}
      </CardContent>

      <AddLocationDialog 
        open={addDialogOpen} 
        onOpenChange={setAddDialogOpen} 
        onSuccess={() => {
          if (onLocationAdded) onLocationAdded();
        }} 
      />
    </Card>
  );
};

export default LocationsSection;
