
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Stain } from '@/hooks/useStains';

interface StainDetailDialogProps {
  stain: Stain | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const StainDetailDialog: React.FC<StainDetailDialogProps> = ({ 
  stain, 
  open, 
  onOpenChange 
}) => {
  if (!stain) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{stain.name}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Tabs defaultValue="details">
            <TabsList className="mb-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="components">Components</TabsTrigger>
              <TabsTrigger value="application">Application</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium">Brand</h4>
                  <p>{stain.brand}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Color</h4>
                  <p>{stain.color}</p>
                </div>
              </div>
              
              {stain.notes && (
                <div>
                  <h4 className="text-sm font-medium">Notes</h4>
                  <p className="whitespace-pre-line">{stain.notes}</p>
                </div>
              )}
              
              <div>
                <h4 className="text-sm font-medium">Created</h4>
                <p>
                  {stain.createdBy ? `By ${stain.createdBy} on ` : ""}
                  {new Date(stain.createdAt).toLocaleDateString()}
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="components" className="space-y-4">
              {stain.baseComponents && stain.baseComponents.length > 0 ? (
                <div>
                  <h4 className="text-sm font-medium mb-2">Base Components</h4>
                  <div className="space-y-2">
                    {stain.baseComponents.map((component, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="flex-1">{component.name}</div>
                        <div className="text-right">{component.quantity} {component.unit}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">No component information available</p>
              )}
              
              {stain.mixingInstructions && (
                <div>
                  <h4 className="text-sm font-medium">Mixing Instructions</h4>
                  <p className="whitespace-pre-line">{stain.mixingInstructions}</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="application" className="space-y-4">
              {stain.applicationMethod && (
                <div>
                  <h4 className="text-sm font-medium">Preferred Application Method</h4>
                  <p>{stain.applicationMethod}</p>
                </div>
              )}
              
              {stain.substrateCompatibility && stain.substrateCompatibility.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium">Compatible Substrates</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {stain.substrateCompatibility.map((substrate) => (
                      <Badge key={substrate} variant="outline">{substrate}</Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                {stain.dryingTime && (
                  <div>
                    <h4 className="text-sm font-medium">Drying Time</h4>
                    <p>{stain.dryingTime}</p>
                  </div>
                )}
                
                {stain.coatsRecommended && (
                  <div>
                    <h4 className="text-sm font-medium">Recommended Coats</h4>
                    <p>{stain.coatsRecommended}</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StainDetailDialog;
