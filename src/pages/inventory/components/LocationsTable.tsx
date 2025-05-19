
import React, { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Edit, Trash2, Plus } from "lucide-react";
import { Location } from "@/types/inventory";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface LocationsTableProps {
  locations: Location[];
}

interface LocationNodeProps {
  location: Location;
  children: Location[];
  level: number;
  allLocations: Location[]; // Add allLocations prop to access the entire locations array
  onAddSubLocation?: (parentId: string) => void;
  onEdit?: (location: Location) => void;
  onDelete?: (location: Location) => void;
}

const LocationNode: React.FC<LocationNodeProps> = ({ 
  location, 
  children, 
  level,
  allLocations, // Receive the full locations array
  onAddSubLocation,
  onEdit,
  onDelete
}) => {
  const [isExpanded, setIsExpanded] = useState(level === 0);
  const utilization = Math.round((location.utilized / (location.capacity || 1)) * 100);
  const hasChildren = children.length > 0;

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <TableRow key={location.id} className={level > 0 ? "border-t border-gray-100" : ""}>
        <TableCell className="font-medium">
          <div className="flex items-center">
            <div style={{ width: level * 20 }} className="flex-shrink-0"></div>
            {hasChildren ? (
              <Button 
                variant="ghost" 
                size="icon" 
                className="w-6 h-6 p-0 mr-1" 
                onClick={handleToggle}
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            ) : (
              <div className="w-6 mr-1"></div>
            )}
            {location.name}
          </div>
        </TableCell>
        <TableCell>{location.type}</TableCell>
        <TableCell className="text-right">{location.capacity.toLocaleString()}</TableCell>
        <TableCell className="text-right">{location.utilized.toLocaleString()}</TableCell>
        <TableCell className="text-right">
          <div className="flex items-center justify-end gap-2">
            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${
                  utilization > 90 ? "bg-red-500" : 
                  utilization > 75 ? "bg-amber-500" : 
                  "bg-green-500"
                }`}
                style={{ width: `${utilization}%` }}
              />
            </div>
            <span className="text-xs font-medium">{utilization}%</span>
          </div>
        </TableCell>
        <TableCell className="text-right">
          <div className="flex justify-end gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => onAddSubLocation && onAddSubLocation(location.id)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Add sub-location</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => onEdit && onEdit(location)}>
                  <Edit className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit location</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => onDelete && onDelete(location)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete location</TooltipContent>
            </Tooltip>
          </div>
        </TableCell>
      </TableRow>
      {isExpanded && children.map(child => {
        // Find all locations that have this child as parent
        const grandChildren = allLocations.filter(loc => loc.parent_id === child.id);
        return (
          <LocationNode 
            key={child.id} 
            location={child} 
            children={grandChildren}
            allLocations={allLocations} // Pass the full locations array
            level={level + 1}
            onAddSubLocation={onAddSubLocation}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
      })}
    </>
  );
};

const LocationsTable: React.FC<LocationsTableProps> = ({ locations }) => {
  // Handle adding sublocation (to be implemented)
  const handleAddSubLocation = (parentId: string) => {
    console.log("Add sublocation to:", parentId);
    // Implement dialog opening logic here
  };

  // Handle editing (to be implemented)
  const handleEdit = (location: Location) => {
    console.log("Edit location:", location);
    // Implement dialog opening logic here
  };

  // Handle delete (to be implemented)
  const handleDelete = (location: Location) => {
    console.log("Delete location:", location);
    // Implement dialog opening logic here
  };

  // Create a hierarchical structure from flat locations array
  const rootLocations = locations.filter(location => location.parent_id === null);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-right">Capacity</TableHead>
          <TableHead className="text-right">Utilized</TableHead>
          <TableHead className="text-right">Utilization</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rootLocations.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-8">
              No locations found. Add a location to get started.
            </TableCell>
          </TableRow>
        ) : (
          rootLocations.map(location => {
            const children = locations.filter(loc => loc.parent_id === location.id);
            return (
              <LocationNode 
                key={location.id} 
                location={location} 
                children={children}
                allLocations={locations} // Pass the full locations array
                level={0}
                onAddSubLocation={handleAddSubLocation}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            );
          })
        )}
      </TableBody>
    </Table>
  );
};

export default LocationsTable;
