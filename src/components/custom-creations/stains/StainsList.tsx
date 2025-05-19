
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, SwatchBook, Trash2, Edit2, Eye } from "lucide-react";
import { Stain, StainComponent } from '@/hooks/useStains';
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UseMutationResult } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

interface StainsListProps {
  stains: Stain[];
  isLoading: boolean;
  deleteStain: UseMutationResult<string, Error, string, unknown>;
  updateStain: UseMutationResult<any, Error, Partial<Stain> & { id: string }, unknown>;
}

const StainsList: React.FC<StainsListProps> = ({ stains, isLoading, deleteStain, updateStain }) => {
  const [selectedStain, setSelectedStain] = useState<Stain | null>(null);
  
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

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Saved Stains ({stains.length})</h2>
      
      {stains.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {stains.map((stain) => (
            <Card key={stain.id} className="group overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-muted p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">{stain.name}</h3>
                      <p className="text-sm text-muted-foreground">{stain.brand}</p>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => setSelectedStain(stain)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{selectedStain?.name}</DialogTitle>
                          </DialogHeader>
                          {selectedStain && (
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
                                      <p>{selectedStain.brand}</p>
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-medium">Color</h4>
                                      <p>{selectedStain.color}</p>
                                    </div>
                                  </div>
                                  
                                  {selectedStain.notes && (
                                    <div>
                                      <h4 className="text-sm font-medium">Notes</h4>
                                      <p className="whitespace-pre-line">{selectedStain.notes}</p>
                                    </div>
                                  )}
                                  
                                  <div>
                                    <h4 className="text-sm font-medium">Created</h4>
                                    <p>
                                      {selectedStain.createdBy ? `By ${selectedStain.createdBy} on ` : ""}
                                      {new Date(selectedStain.createdAt).toLocaleDateString()}
                                    </p>
                                  </div>
                                </TabsContent>
                                
                                <TabsContent value="components" className="space-y-4">
                                  {selectedStain.baseComponents && selectedStain.baseComponents.length > 0 ? (
                                    <div>
                                      <h4 className="text-sm font-medium mb-2">Base Components</h4>
                                      <div className="space-y-2">
                                        {selectedStain.baseComponents.map((component: StainComponent, index: number) => (
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
                                  
                                  {selectedStain.mixingInstructions && (
                                    <div>
                                      <h4 className="text-sm font-medium">Mixing Instructions</h4>
                                      <p className="whitespace-pre-line">{selectedStain.mixingInstructions}</p>
                                    </div>
                                  )}
                                </TabsContent>
                                
                                <TabsContent value="application" className="space-y-4">
                                  {selectedStain.applicationMethod && (
                                    <div>
                                      <h4 className="text-sm font-medium">Preferred Application Method</h4>
                                      <p>{selectedStain.applicationMethod}</p>
                                    </div>
                                  )}
                                  
                                  {selectedStain.substrateCompatibility && selectedStain.substrateCompatibility.length > 0 && (
                                    <div>
                                      <h4 className="text-sm font-medium">Compatible Substrates</h4>
                                      <div className="flex flex-wrap gap-1 mt-1">
                                        {selectedStain.substrateCompatibility.map((substrate) => (
                                          <Badge key={substrate} variant="outline">{substrate}</Badge>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                  
                                  <div className="grid grid-cols-2 gap-4">
                                    {selectedStain.dryingTime && (
                                      <div>
                                        <h4 className="text-sm font-medium">Drying Time</h4>
                                        <p>{selectedStain.dryingTime}</p>
                                      </div>
                                    )}
                                    
                                    {selectedStain.coatsRecommended && (
                                      <div>
                                        <h4 className="text-sm font-medium">Recommended Coats</h4>
                                        <p>{selectedStain.coatsRecommended}</p>
                                      </div>
                                    )}
                                  </div>
                                </TabsContent>
                              </Tabs>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEditStain(stain)}
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
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-muted-foreground border rounded-lg">
          <SwatchBook className="h-10 w-10 mx-auto mb-4 opacity-50" />
          <p>No stains saved yet</p>
          <p className="text-sm">Create your first stain using the form above</p>
        </div>
      )}
    </div>
  );
};

export default StainsList;
