
import React, { useState } from 'react';
import { Loader2 } from "lucide-react";
import { Stain } from '@/hooks/useStains';
import { UseMutationResult } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import StainListItem from './StainListItem';
import StainDetailDialog from './StainDetailDialog';
import StainsEmptyState from './StainsEmptyState';

interface StainsListProps {
  stains: Stain[];
  isLoading: boolean;
  deleteStain: UseMutationResult<string, Error, string, unknown>;
  updateStain: UseMutationResult<any, Error, Partial<Stain> & { id: string }, unknown>;
}

const StainsList: React.FC<StainsListProps> = ({ stains, isLoading, deleteStain, updateStain }) => {
  const [selectedStain, setSelectedStain] = useState<Stain | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  
  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }
  
  const handleEditStain = (stain: Stain) => {
    // This would open a form dialog to edit the stain
    toast({
      title: 'Edit feature',
      description: 'Editing functionality will be implemented in the next phase.',
    });
  };

  const handleViewDetails = (stain: Stain) => {
    setSelectedStain(stain);
    setDetailsDialogOpen(true);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Saved Stains ({stains.length})</h2>
      
      {stains.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {stains.map((stain) => (
            <StainListItem
              key={stain.id}
              stain={stain}
              deleteStain={deleteStain}
              onEdit={handleEditStain}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      ) : (
        <StainsEmptyState />
      )}
      
      <StainDetailDialog 
        stain={selectedStain} 
        open={detailsDialogOpen} 
        onOpenChange={setDetailsDialogOpen} 
      />
    </div>
  );
};

export default StainsList;
