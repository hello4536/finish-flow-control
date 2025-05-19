
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { RecipeFormValues } from "../schema";

interface InstructionsTabProps {
  form: UseFormReturn<RecipeFormValues>;
}

const InstructionsTab: React.FC<InstructionsTabProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="instructions"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Instructions</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Step-by-step instructions for preparing the recipe" 
                className="min-h-[200px]" 
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

export default InstructionsTab;
