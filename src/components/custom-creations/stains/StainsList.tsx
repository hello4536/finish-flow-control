
import React from "react";
import { Loader2, SwatchBook } from "lucide-react";
import { Stain } from "@/hooks/useStains";
import { UseMutationResult } from "@tanstack/react-query";
import StainCard from "./StainCard";

interface StainsListProps {
  stains: Stain[];
  isLoading: boolean;
  deleteStain: UseMutationResult<string, Error, string, unknown>;
}

const StainsList: React.FC<StainsListProps> = ({ stains, isLoading, deleteStain }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (stains.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        <SwatchBook className="h-10 w-10 mx-auto mb-4 opacity-50" />
        <p>No stains saved yet</p>
        <p className="text-sm">Add your first stain using the form above</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stains.map((stain) => (
        <StainCard key={stain.id} stain={stain} deleteStain={deleteStain} />
      ))}
    </div>
  );
};

export default StainsList;
