
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PaintBucket, Trash2, Plus, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePaintColors } from "@/hooks/usePaintColors";

const colorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  hexCode: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Must be a valid hex color code"),
  notes: z.string().optional(),
});

type ColorFormValues = z.infer<typeof colorSchema>;

interface PaintColorsSectionProps {
  onCountChange: (count: number) => void;
}

const PaintColorsSection: React.FC<PaintColorsSectionProps> = ({ onCountChange }) => {
  const { toast } = useToast();
  const { paintColors, isLoading, addPaintColor, deletePaintColor } = usePaintColors();
  
  const form = useForm<ColorFormValues>({
    resolver: zodResolver(colorSchema),
    defaultValues: {
      name: "",
      hexCode: "#ffffff",
      notes: "",
    },
  });

  // Debug log to check if paintColors are being retrieved
  useEffect(() => {
    console.log("Paint colors in component:", paintColors);
  }, [paintColors]);

  // Update parent component with count
  useEffect(() => {
    console.log("Updating count:", paintColors?.length || 0);
    onCountChange(paintColors?.length || 0);
  }, [paintColors, onCountChange]);

  // Add a new paint color
  const onSubmit = (values: ColorFormValues) => {
    console.log("Form submitted with values:", values);
    
    addPaintColor.mutate({
      name: values.name,
      hexCode: values.hexCode,
      notes: values.notes
    }, {
      onSuccess: () => {
        form.reset();
        toast({
          title: "Success",
          description: "Paint color added successfully",
        });
      }
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
          
          <Button 
            type="submit" 
            disabled={addPaintColor.isPending}
          >
            {addPaintColor.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Save Paint Color
              </>
            )}
          </Button>
        </form>
      </Form>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : paintColors && paintColors.length > 0 ? (
        <>
          <div className="text-sm text-muted-foreground mb-2">
            {paintColors.length} color{paintColors.length !== 1 ? 's' : ''} saved
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {paintColors.map((color) => (
              <Card key={color.id} className="group">
                <CardContent className="p-4 flex flex-col gap-2">
                  <div 
                    className="w-full h-24 rounded-md" 
                    style={{ backgroundColor: color.hex_code }}
                  />
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{color.name}</h3>
                      <p className="text-xs text-muted-foreground">{color.hex_code}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="opacity-0 group-hover:opacity-100"
                      onClick={() => deletePaintColor.mutate(color.id)}
                      disabled={deletePaintColor.isPending}
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
        </>
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
