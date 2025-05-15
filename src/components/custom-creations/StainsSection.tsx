
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { SwatchBook, Trash2, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const stainSchema = z.object({
  name: z.string().min(1, "Name is required"),
  baseColor: z.string().min(1, "Base color is required"),
  mixRatio: z.string().min(1, "Mix ratio is required"),
  notes: z.string().optional(),
});

type StainFormValues = z.infer<typeof stainSchema>;

export interface Stain {
  id: string;
  name: string;
  baseColor: string;
  mixRatio: string;
  notes?: string;
  createdAt: Date;
}

interface StainsSectionProps {
  onCountChange: (count: number) => void;
}

const StainsSection: React.FC<StainsSectionProps> = ({ onCountChange }) => {
  const [stains, setStains] = useState<Stain[]>([]);
  
  const form = useForm<StainFormValues>({
    resolver: zodResolver(stainSchema),
    defaultValues: {
      name: "",
      baseColor: "",
      mixRatio: "",
      notes: "",
    },
  });

  // Add a new stain
  const onSubmit = (values: StainFormValues) => {
    const newStain: Stain = {
      id: crypto.randomUUID(),
      name: values.name,
      baseColor: values.baseColor,
      mixRatio: values.mixRatio,
      notes: values.notes,
      createdAt: new Date(),
    };
    
    const updatedStains = [...stains, newStain];
    setStains(updatedStains);
    onCountChange(updatedStains.length);
    form.reset();
    
    toast({
      title: "Stain saved",
      description: `"${values.name}" has been added to your collection`,
    });
  };

  // Delete a stain
  const deleteStain = (id: string) => {
    const updatedStains = stains.filter(stain => stain.id !== id);
    setStains(updatedStains);
    onCountChange(updatedStains.length);
    
    toast({
      title: "Stain removed",
      description: "The stain has been removed from your collection",
    });
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stain Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Walnut Dark" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="baseColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Base Color</FormLabel>
                  <FormControl>
                    <Input placeholder="Dark Oak" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="mixRatio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mix Ratio</FormLabel>
                <FormControl>
                  <Input placeholder="1:2 ratio of tint to base" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Additional staining instructions or notes" 
                    className="min-h-[100px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit">
            <Plus className="mr-2 h-4 w-4" />
            Save Stain
          </Button>
        </form>
      </Form>

      {stains.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stains.map((stain) => (
            <Card key={stain.id} className="group">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{stain.name}</h3>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="opacity-0 group-hover:opacity-100"
                    onClick={() => deleteStain(stain.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
                <div className="mt-2 space-y-1">
                  <p className="text-sm">
                    <span className="font-semibold">Base Color:</span> {stain.baseColor}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Mix Ratio:</span> {stain.mixRatio}
                  </p>
                  {stain.notes && (
                    <p className="text-sm mt-2">
                      <span className="font-semibold">Notes:</span> {stain.notes}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-muted-foreground">
          <SwatchBook className="h-10 w-10 mx-auto mb-4 opacity-50" />
          <p>No stains saved yet</p>
          <p className="text-sm">Add your first stain using the form above</p>
        </div>
      )}
    </div>
  );
};

export default StainsSection;
