
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, Plus, Trash2, HelpCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseMutationResult } from "@tanstack/react-query";
import { TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { StainComponent } from "@/hooks/useStains";

const stainComponentSchema = z.object({
  name: z.string().min(1, "Component name is required"),
  quantity: z.string().min(1, "Quantity is required"),
  unit: z.string().min(1, "Unit is required")
});

const stainSchema = z.object({
  name: z.string().min(1, "Name is required"),
  brand: z.string().min(1, "Brand is required"),
  color: z.string().min(1, "Color is required"),
  notes: z.string().optional(),
  baseComponents: z.array(stainComponentSchema).optional().default([]),
  mixingInstructions: z.string().optional(),
  substrateCompatibility: z.array(z.string()).min(1, "Select at least one compatible substrate").optional(),
  applicationMethod: z.string().min(1, "Application method is required"),
  dryingTime: z.string().optional(),
  coatsRecommended: z.string().optional(),
  createdBy: z.string().optional(),
  createdAt: z.date().optional()
});

type StainFormValues = z.infer<typeof stainSchema>;

interface StainFormProps {
  addStain: UseMutationResult<any, Error, {
    name: string;
    brand: string;
    color: string;
    notes?: string;
    baseComponents?: StainComponent[];
    mixingInstructions?: string;
    substrateCompatibility?: string[];
    applicationMethod?: string;
    dryingTime?: string;
    coatsRecommended?: string;
    createdBy?: string;
    createdAt?: Date;
  }, unknown>;
}

const applicationMethods = [
  "Brush", "Spray", "Wipe-on", "Dip", "Roll", "Padding", "Airless Spray", 
  "HVLP Spray", "Conventional Spray", "Rag Application"
];

const substrates = [
  "Oak", "Maple", "Pine", "Cherry", "Walnut", "Birch", "Mahogany", 
  "Poplar", "Ash", "MDF", "Plywood", "Aluminum", "Steel", "Fiberglass", "Plastic"
];

const unitOptions = ["oz", "ml", "cups", "tbsp", "tsp", "parts", "grams", "liters", "%"];

const StainForm: React.FC<StainFormProps> = ({ addStain }) => {
  const [selectedSubstrates, setSelectedSubstrates] = useState<string[]>([]);
  
  const form = useForm<StainFormValues>({
    resolver: zodResolver(stainSchema),
    defaultValues: {
      name: "",
      brand: "",
      color: "",
      notes: "",
      baseComponents: [{ name: "", quantity: "", unit: "" }],
      mixingInstructions: "",
      applicationMethod: "",
      dryingTime: "",
      coatsRecommended: "1"
    },
  });

  // Add a new base component
  const addComponent = () => {
    const currentComponents = form.getValues().baseComponents || [];
    form.setValue("baseComponents", [
      ...currentComponents,
      { name: "", quantity: "", unit: "" }
    ]);
  };

  // Remove a base component
  const removeComponent = (index: number) => {
    const currentComponents = form.getValues().baseComponents || [];
    if (currentComponents.length > 1) {
      form.setValue(
        "baseComponents",
        currentComponents.filter((_, i) => i !== index)
      );
    } else {
      toast({
        title: "Cannot remove",
        description: "At least one component is required",
      });
    }
  };

  // Update form when selectedSubstrates changes
  useEffect(() => {
    form.setValue("substrateCompatibility", selectedSubstrates);
  }, [selectedSubstrates, form]);

  // Toggle substrate selection
  const toggleSubstrate = (substrate: string) => {
    if (selectedSubstrates.includes(substrate)) {
      setSelectedSubstrates(selectedSubstrates.filter(s => s !== substrate));
    } else {
      setSelectedSubstrates([...selectedSubstrates, substrate]);
    }
  };

  // Add a new stain
  const onSubmit = (values: StainFormValues) => {
    // Validate baseComponents to ensure all required fields are filled
    const validComponents = (values.baseComponents || []).filter(
      component => component.name && component.quantity && component.unit
    );

    // Add timestamp and user info
    const enhancedValues = {
      ...values,
      createdBy: "Current User", // This would be replaced with actual user info in a real auth system
      createdAt: new Date(),
      // Ensure required fields are present
      name: values.name,
      brand: values.brand,
      color: values.color,
      // Use only valid components
      baseComponents: validComponents.length > 0 ? validComponents : undefined,
      substrateCompatibility: selectedSubstrates.length > 0 ? selectedSubstrates : undefined
    };
    
    addStain.mutate(enhancedValues);
    form.reset();
    setSelectedSubstrates([]);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <TabsContent value="basic" className="space-y-4">
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
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Additional notes about this stain" 
                    className="min-h-[100px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </TabsContent>
        
        <TabsContent value="components" className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Base Components</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-xs">
                      List all the components needed for this stain, including their quantities and units.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            {form.getValues().baseComponents?.map((_, index) => (
              <div key={index} className="flex items-end gap-2">
                <FormField
                  control={form.control}
                  name={`baseComponents.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className={index !== 0 ? 'sr-only' : undefined}>Component</FormLabel>
                      <FormControl>
                        <Input placeholder="Tint name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`baseComponents.${index}.quantity`}
                  render={({ field }) => (
                    <FormItem className="w-20">
                      <FormLabel className={index !== 0 ? 'sr-only' : undefined}>Qty</FormLabel>
                      <FormControl>
                        <Input placeholder="Qty" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`baseComponents.${index}.unit`}
                  render={({ field }) => (
                    <FormItem className="w-24">
                      <FormLabel className={index !== 0 ? 'sr-only' : undefined}>Unit</FormLabel>
                      <Select 
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Unit" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {unitOptions.map(unit => (
                            <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeComponent(index)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
            
            <Button 
              type="button" 
              variant="outline" 
              onClick={addComponent}
              className="w-full mt-2"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Component
            </Button>
            
            <FormField
              control={form.control}
              name="mixingInstructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mixing Instructions</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Step by step mixing instructions" 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="application" className="space-y-4">
          <FormField
            control={form.control}
            name="applicationMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Application Method</FormLabel>
                <Select 
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select application method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {applicationMethods.map(method => (
                      <SelectItem key={method} value={method}>{method}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div>
            <FormLabel>Substrate Compatibility</FormLabel>
            <div className="mt-1 grid grid-cols-2 md:grid-cols-3 gap-2">
              {substrates.map(substrate => (
                <div key={substrate} className="flex items-center">
                  <Button
                    type="button"
                    variant={selectedSubstrates.includes(substrate) ? "default" : "outline"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => toggleSubstrate(substrate)}
                  >
                    {substrate}
                  </Button>
                </div>
              ))}
            </div>
            {form.formState.errors.substrateCompatibility && (
              <p className="text-sm font-medium text-destructive mt-2">
                {form.formState.errors.substrateCompatibility.message}
              </p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="dryingTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Drying Time</FormLabel>
                  <FormControl>
                    <Input placeholder="2-4 hours" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="coatsRecommended"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recommended Coats</FormLabel>
                  <FormControl>
                    <Input placeholder="1-2 coats" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </TabsContent>
        
        <Separator className="my-4" />
        
        <Button 
          type="submit" 
          disabled={addStain.isPending}
          className="w-full sm:w-auto"
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
  );
};

export default StainForm;
