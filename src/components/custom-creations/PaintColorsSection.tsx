
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PaintBucket, Trash2, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const colorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  hexCode: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Must be a valid hex color code"),
  notes: z.string().optional(),
});

type ColorFormValues = z.infer<typeof colorSchema>;

export interface PaintColor {
  id: string;
  name: string;
  hexCode: string;
  notes?: string;
  createdAt: Date;
}

interface PaintColorsSectionProps {
  onCountChange: (count: number) => void;
}

const PaintColorsSection: React.FC<PaintColorsSectionProps> = ({ onCountChange }) => {
  const [colors, setColors] = useState<PaintColor[]>([]);
  
  const form = useForm<ColorFormValues>({
    resolver: zodResolver(colorSchema),
    defaultValues: {
      name: "",
      hexCode: "#ffffff",
      notes: "",
    },
  });

  // Add a new paint color
  const onSubmit = (values: ColorFormValues) => {
    const newColor: PaintColor = {
      id: crypto.randomUUID(),
      name: values.name,
      hexCode: values.hexCode,
      notes: values.notes,
      createdAt: new Date(),
    };
    
    const updatedColors = [...colors, newColor];
    setColors(updatedColors);
    onCountChange(updatedColors.length);
    form.reset();
    
    toast({
      title: "Color saved",
      description: `"${values.name}" has been added to your collection`,
    });
  };

  // Delete a paint color
  const deleteColor = (id: string) => {
    const updatedColors = colors.filter(color => color.id !== id);
    setColors(updatedColors);
    onCountChange(updatedColors.length);
    
    toast({
      title: "Color removed",
      description: "The color has been removed from your collection",
    });
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Ocean Blue" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="hexCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color Code</FormLabel>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Input placeholder="#0066CC" {...field} />
                    </FormControl>
                    <div 
                      className="h-10 w-10 rounded-md border border-input" 
                      style={{ backgroundColor: field.value }}
                    />
                  </div>
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
                    <Input placeholder="For living room walls" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <Button type="submit">
            <Plus className="mr-2 h-4 w-4" />
            Save Paint Color
          </Button>
        </form>
      </Form>

      {colors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {colors.map((color) => (
            <Card key={color.id} className="group">
              <CardContent className="p-4 flex flex-col gap-2">
                <div 
                  className="w-full h-24 rounded-md" 
                  style={{ backgroundColor: color.hexCode }}
                />
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{color.name}</h3>
                    <p className="text-xs text-muted-foreground">{color.hexCode}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="opacity-0 group-hover:opacity-100"
                    onClick={() => deleteColor(color.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
                {color.notes && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {color.notes}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-muted-foreground">
          <PaintBucket className="h-10 w-10 mx-auto mb-4 opacity-50" />
          <p>No paint colors saved yet</p>
          <p className="text-sm">Add your first color using the form above</p>
        </div>
      )}
    </div>
  );
};

export default PaintColorsSection;
