
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle, Plus, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { StainFormValues, unitOptions } from "../validation/stainSchema";

interface ComponentsTabProps {
  form: UseFormReturn<StainFormValues>;
}

const ComponentsTab: React.FC<ComponentsTabProps> = ({ form }) => {
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

  return (
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
  );
};

export default ComponentsTab;
