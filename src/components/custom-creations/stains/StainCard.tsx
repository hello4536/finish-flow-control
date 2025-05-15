
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { Stain } from "@/hooks/useStains";
import { UseMutationResult } from "@tanstack/react-query";

interface StainCardProps {
  stain: Stain;
  deleteStain: UseMutationResult<string, Error, string, unknown>;
}

const StainCard: React.FC<StainCardProps> = ({ stain, deleteStain }) => {
  return (
    <Card key={stain.id} className="group">
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">{stain.name}</h3>
          <Button 
            variant="ghost" 
            size="icon" 
            className="opacity-0 group-hover:opacity-100"
            onClick={() => deleteStain.mutate(stain.id)}
            disabled={deleteStain.isPending}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
        <div className="mt-2 space-y-1">
          <p className="text-sm">
            <span className="font-semibold">Brand:</span> {stain.brand}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Color:</span> {stain.color}
          </p>
          {stain.notes && (
            <p className="text-sm mt-2">
              <span className="font-semibold">Notes:</span> {stain.notes}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StainCard;
