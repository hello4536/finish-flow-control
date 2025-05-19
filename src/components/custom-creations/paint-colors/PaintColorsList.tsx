
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, PaintBucket, Trash2, Eye } from "lucide-react";
import { PaintColor } from "@/hooks/usePaintColors";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UseMutationResult } from "@tanstack/react-query";

interface PaintColorsListProps {
  paintColors: PaintColor[] | undefined;
  isLoading: boolean;
  deletePaintColor: UseMutationResult<string, Error, string, unknown>;
}

const PaintColorsList: React.FC<PaintColorsListProps> = ({ paintColors, isLoading, deletePaintColor }) => {
  const [selectedColor, setSelectedColor] = useState<PaintColor | null>(null);
  
  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Saved Colors ({paintColors?.length || 0})</h2>
      
      {paintColors && paintColors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {paintColors.map((color) => (
            <Card key={color.id} className="group overflow-hidden">
              <CardContent className="p-0">
                <div className="p-4">
                  <div className="w-full h-20 rounded-md mb-3" style={{ backgroundColor: color.hex_code }} />
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">{color.name}</h3>
                      <p className="text-sm text-muted-foreground">{color.hex_code}</p>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => setSelectedColor(color)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{selectedColor?.name}</DialogTitle>
                          </DialogHeader>
                          {selectedColor && (
                            <div className="mt-4">
                              <Tabs defaultValue="details">
                                <TabsList className="mb-4">
                                  <TabsTrigger value="details">Details</TabsTrigger>
                                  <TabsTrigger value="color-values">Color Values</TabsTrigger>
                                  <TabsTrigger value="application">Application</TabsTrigger>
                                  <TabsTrigger value="environment">Environment</TabsTrigger>
                                </TabsList>
                                
                                <TabsContent value="details" className="space-y-4">
                                  <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-md" style={{ backgroundColor: selectedColor.hex_code }}></div>
                                    <div>
                                      <h3 className="text-lg font-medium">{selectedColor.name}</h3>
                                      <p className="text-muted-foreground">{selectedColor.hex_code}</p>
                                    </div>
                                  </div>
                                  
                                  {selectedColor.notes && (
                                    <div>
                                      <h4 className="text-sm font-medium">Notes</h4>
                                      <p className="whitespace-pre-line">{selectedColor.notes}</p>
                                    </div>
                                  )}
                                  
                                  {selectedColor.created_by && (
                                    <div>
                                      <h4 className="text-sm font-medium">Created</h4>
                                      <p>By {selectedColor.created_by} on {new Date(selectedColor.created_at).toLocaleDateString()}</p>
                                    </div>
                                  )}
                                </TabsContent>
                                
                                <TabsContent value="color-values" className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="text-sm font-medium">HEX Code</h4>
                                      <p>{selectedColor.hex_code}</p>
                                    </div>
                                    {selectedColor.rgb_values && (
                                      <div>
                                        <h4 className="text-sm font-medium">RGB Values</h4>
                                        <p>{selectedColor.rgb_values}</p>
                                      </div>
                                    )}
                                    {selectedColor.cmyk_values && (
                                      <div>
                                        <h4 className="text-sm font-medium">CMYK Values</h4>
                                        <p>{selectedColor.cmyk_values}</p>
                                      </div>
                                    )}
                                    {selectedColor.lab_values && (
                                      <div>
                                        <h4 className="text-sm font-medium">L*a*b* Values</h4>
                                        <p>{selectedColor.lab_values}</p>
                                      </div>
                                    )}
                                    {selectedColor.delta_e && (
                                      <div>
                                        <h4 className="text-sm font-medium">Delta E</h4>
                                        <p>{selectedColor.delta_e}</p>
                                      </div>
                                    )}
                                  </div>
                                  
                                  {selectedColor.swatch_image && (
                                    <div>
                                      <h4 className="text-sm font-medium">Color Swatch</h4>
                                      <img 
                                        src={selectedColor.swatch_image} 
                                        alt={`${selectedColor.name} swatch`} 
                                        className="mt-1 max-h-40 rounded-md object-contain"
                                      />
                                    </div>
                                  )}
                                </TabsContent>
                                
                                <TabsContent value="application" className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    {selectedColor.substrate_type && (
                                      <div>
                                        <h4 className="text-sm font-medium">Substrate Type</h4>
                                        <p>{selectedColor.substrate_type}</p>
                                      </div>
                                    )}
                                    {selectedColor.application_method && (
                                      <div>
                                        <h4 className="text-sm font-medium">Application Method</h4>
                                        <p>{selectedColor.application_method}</p>
                                      </div>
                                    )}
                                  </div>
                                </TabsContent>
                                
                                <TabsContent value="environment" className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    {selectedColor.temperature && (
                                      <div>
                                        <h4 className="text-sm font-medium">Temperature</h4>
                                        <p>{selectedColor.temperature}</p>
                                      </div>
                                    )}
                                    {selectedColor.humidity && (
                                      <div>
                                        <h4 className="text-sm font-medium">Humidity</h4>
                                        <p>{selectedColor.humidity}</p>
                                      </div>
                                    )}
                                    {selectedColor.booth_lighting && (
                                      <div>
                                        <h4 className="text-sm font-medium">Booth Lighting</h4>
                                        <p>{selectedColor.booth_lighting}</p>
                                      </div>
                                    )}
                                  </div>
                                  
                                  {selectedColor.environmental_notes && (
                                    <div>
                                      <h4 className="text-sm font-medium">Environmental Notes</h4>
                                      <p className="whitespace-pre-line">{selectedColor.environmental_notes}</p>
                                    </div>
                                  )}
                                </TabsContent>
                              </Tabs>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => deletePaintColor.mutate(color.id)}
                        disabled={deletePaintColor.isPending}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  
                  {color.substrate_type && (
                    <Badge className="mt-2" variant="outline">{color.substrate_type}</Badge>
                  )}
                  
                  {color.swatch_image && (
                    <div className="mt-2">
                      <img 
                        src={color.swatch_image} 
                        alt={`${color.name} swatch`} 
                        className="w-full h-20 object-cover rounded-md" 
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-muted-foreground border rounded-lg">
          <PaintBucket className="h-10 w-10 mx-auto mb-4 opacity-50" />
          <p>No paint colors saved yet</p>
          <p className="text-sm">Create your first paint color using the form above</p>
        </div>
      )}
    </div>
  );
};

export default PaintColorsList;
