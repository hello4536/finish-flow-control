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
  return <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-blue-600">Inventory Location Management</CardTitle>
          <CardDescription>
            Organize and track inventory across warehouses, departments, sections, and storage units
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={() => setAddDialogOpen(true)} className="ml-2 text-white bg-blue-600 hover:bg-blue-500">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Location
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? <div className="flex justify-center p-8">
            <p>Loading location data...</p>
          </div> : <LocationsTable locations={locations} />}
      </CardContent>

      <AddLocationDialog open={addDialogOpen} onOpenChange={setAddDialogOpen} onSuccess={() => {
      if (onLocationAdded) onLocationAdded();
    }} />
    </Card>;
};
export default LocationsSection;