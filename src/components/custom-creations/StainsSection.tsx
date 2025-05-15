
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { SwatchBook, Trash2, Plus, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStains } from "@/hooks/useStains";

const stainSchema = z.object({
  name: z.string().min(1, "Name is required"),
  brand: z.string().min(1, "Brand is required"),
  color: z.string().min(1, "Color is required"),
  notes: z.string().optional(),
});

type StainFormValues = z.infer<typeof stainSchema>;

interface StainsSectionProps {
  onCountChange: (count: number) => void;
}

const StainsSection: React.FC<StainsSectionProps> = ({ onCountChange }) => {
  const { stains, isLoading, addStain, deleteStain } = useStains();
  
  const form = useForm<StainFormValues>({
    resolver: zodResolver(stainSchema),
    defaultValues: {
      name: "",
      brand: "",
      color: "",
      notes: "",
    },
  });

  // Update parent component with count
  React.useEffect(() => {
    onCountChange(stains.length);
  }, [stains.length, onCountChange]);

  // Add a new stain
  const onSubmit = (values: StainFormValues) => {
    addStain.mutate({
      name: values.name,
      brand: values.brand,
      color: values.color,
      notes: values.notes
    });
    form.reset();
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
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Input placeholder="Minwax" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <Input placeholder="Dark Walnut" {...field} />
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
          
          <Button 
            type="submit" 
            disabled={addStain.isPending}
          >
            {addStain.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Save Stain
              </>
            )}
          </Button>
        </form>
      </Form>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : stains.length > 0 ? (
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
