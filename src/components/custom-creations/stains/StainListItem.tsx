
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit2, Eye } from "lucide-react";
import { Stain } from '@/hooks/useStains';
import { UseMutationResult } from "@tanstack/react-query";

interface StainListItemProps {
  stain: Stain;
  deleteStain: UseMutationResult<string, Error, string, unknown>;
  onEdit: (stain: Stain) => void;
  onViewDetails: (stain: Stain) => void;
}

const StainListItem: React.FC<StainListItemProps> = ({ 
  stain, 
  deleteStain, 
  onEdit,
  onViewDetails 
}) => {
  return (
    <Card key={stain.id} className="group overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-muted p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-lg">{stain.name}</h3>
              <p className="text-sm text-muted-foreground">{stain.brand}</p>
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => onViewDetails(stain)}
              >
                <Eye className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => onEdit(stain)}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => deleteStain.mutate(stain.id)}
                disabled={deleteStain.isPending}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
          
          <Badge className="mt-2" variant="outline">{stain.color}</Badge>
        </div>
        
        <div className="p-4 space-y-2">
          {stain.applicationMethod && (
            <div className="text-xs text-muted-foreground">
              <strong>Application:</strong> {stain.applicationMethod}
            </div>
          )}
          
          {stain.substrateCompatibility && stain.substrateCompatibility.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {stain.substrateCompatibility.slice(0, 3).map((substrate) => (
                <Badge key={substrate} variant="secondary" className="text-xs">{substrate}</Badge>
              ))}
              {stain.substrateCompatibility.length > 3 && (
                <Badge variant="secondary" className="text-xs">+{stain.substrateCompatibility.length - 3}</Badge>
              )}
            </div>
          )}
          
          {stain.baseComponents && stain.baseComponents.length > 0 && (
            <div className="text-xs text-muted-foreground">
              <strong>Components:</strong> {stain.baseComponents.length}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StainListItem;
